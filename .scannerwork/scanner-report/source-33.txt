import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, firstValueFrom } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import {
  DeckService,
  Deck,
  CreateDeckRequest,
  Flashcard,
  StudySession,
  FlashcardsResponse,
  CreateFlashcardRequest
} from '../deck.service';
import { AuthService } from '../auth.service';
import * as Papa from 'papaparse';

interface ImportedCard {
  question: string;
  answer: string;
  difficultyLevel?: number;
}

interface ImportedDeck {
  name: string;
  description?: string;
  tags?: string[];
  cards?: ImportedCard[];
}

interface CsvRow {
  [key: number]: string;
}

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  readonly Math = Math;
  searchQuery: string = '';
  showNewDeckModal = false;
  isImportMode = false;
  newDeckName = '';
  maxDeckNameLength = 20;
  selectedFile: File | null = null;
  searchTimeout: any;
  currentPage: number = 0;
  pageSize: number = 5;
  totalFlashcards: number = 0;
  decks: Deck[] = [];
  currentSession: StudySession | null = null;
  flashcards: Flashcard[] = [];

  stats = {
    cardsToReview: 0,
    masteredCards: 0,
    studyTime: '0h',
    weeklyProgress: 0,
    monthlyProgress: 0,
    dailyChange: 0
  };

  constructor(
    private deckService: DeckService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication();
    this.loadDashboardData();
  }

  private checkAuthentication(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }

  private async loadDashboardData(): Promise<void> {
    this.deckService.getDecks(this.currentPage, this.pageSize, 'name').subscribe({
      next: (response) => {
        this.decks = response.content;
        this.totalFlashcards = response.totalElements;

        if (this.decks.length > 0) {
          const flashcardObservables = this.decks.map(deck =>
            this.deckService.getFlashcardsByDeckId(deck.id)
          );

          forkJoin(flashcardObservables).subscribe({
            next: (responses) => {
              this.flashcards = responses.flatMap(response => response.content);
              this.calculateStats();
            },
            error: (error) => {
              console.error('Erreur lors du chargement des flashcards:', error);
            }
          });
        }
      },
      error: (error) => {
        console.error('Erreur lors du chargement des decks:', error);
      }
    });
  }

  private calculateStats(): void {
    const now = new Date();
    let cardsToReview = 0;
    let masteredCards = 0;
    let weeklyProgress = 0;
    let monthlyProgress = 0;
    let dailyChange = 0;

    if (this.flashcards.length > 0) {
      this.flashcards.forEach(flashcard => {
        if (flashcard.successRate && flashcard.successRate >= 0.8) {
          masteredCards++;
        }

        if (flashcard.nextReviewDate && now >= new Date(flashcard.nextReviewDate)) {
          cardsToReview++;
        }

        if (flashcard.nextReviewDate) {
          const nextReview = new Date(flashcard.nextReviewDate);
          const daysSinceReview = Math.floor((nextReview.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

          if (daysSinceReview <= 7) {
            weeklyProgress++;
          }
          if (daysSinceReview <= 30) {
            monthlyProgress++;
          }
          if (daysSinceReview <= 1) {
            dailyChange++;
          }
        }
      });

      this.stats = {
        cardsToReview,
        masteredCards,
        studyTime: this.calculateEstimatedStudyTime(),
        weeklyProgress: this.calculatePercentage(weeklyProgress, this.flashcards.length),
        monthlyProgress: this.calculatePercentage(monthlyProgress, this.flashcards.length),
        dailyChange: this.calculatePercentage(dailyChange, this.flashcards.length)
      };
    } else {
      this.resetStats();
    }
  }

  private resetStats(): void {
    this.stats = {
      cardsToReview: 0,
      masteredCards: 0,
      studyTime: '0h',
      weeklyProgress: 0,
      monthlyProgress: 0,
      dailyChange: 0
    };
  }

 private calculateEstimatedStudyTime(): string {
     // Vérifier si les flashcards sont disponibles
     if (!this.flashcards || this.flashcards.length === 0) {
         console.warn('Aucune flashcard disponible pour calculer le temps d’étude.');
         return '0h0m';
     }

     // Calculer le nombre total de révisions
     const totalReviews = this.flashcards.reduce((total, card) =>
         total + (card.reviewCount || 0), 0);

     console.log(`Total des révisions : ${totalReviews}`);

     // Estimer le temps en minutes (2 minutes par révision)
     const estimatedMinutes = totalReviews * 2;

     // Convertir les minutes en heures et minutes
     const hours = Math.floor(estimatedMinutes / 60);
     const minutes = estimatedMinutes % 60;

     // Retourner le temps formaté
     return `${hours}h${minutes}m`;
 }


  private calculatePercentage(value: number, total: number): number {
    return total > 0 ? Math.round((value / total) * 100) : 0;
  }

  onSearch(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      this.currentPage = 0;
      if (this.searchQuery.trim()) {
        this.decks = this.decks.filter(deck =>
          deck.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.loadDashboardData();
      }
    }, 300);
  }

  createNewDeck(): void {
    this.showNewDeckModal = true;
    this.isImportMode = false;
  }

  confirmDeckCreation(): void {
    if (this.newDeckName.trim().length <= this.maxDeckNameLength) {
      const newDeckRequest: CreateDeckRequest = {
        name: this.newDeckName.trim(),
        description: '',
        tags: []
      };

      this.createNewDeckFromAPI(newDeckRequest).then(
        (newDeck: Deck) => {
          this.decks.push(newDeck);
          this.closeModal();
          this.loadDashboardData();
        },
        (error: any) => {
          console.error('Erreur lors de la création du paquet:', error);
        }
      );
    }
  }

  private async createNewDeckFromAPI(deckRequest: CreateDeckRequest): Promise<Deck> {
    return await firstValueFrom(this.deckService.createDeck(deckRequest));
  }

  startStudySession(deck: Deck): void {
    this.deckService.getFlashcardsByDeckId(deck.id).subscribe({
      next: (response: FlashcardsResponse) => {
        if (response.content && response.content.length > 0) {
          this.router.navigate(['/practice'], {
            state: { deck: { ...deck, cards: response.content } }
          });
        } else {
          console.log('Ce deck ne contient pas de cartes à étudier.');
        }
      },
      error: (error) => {
        console.error('Error loading flashcards:', error);
      }
    });
  }

  closeModal(): void {
    this.showNewDeckModal = false;
    this.newDeckName = '';
    this.selectedFile = null;
    this.isImportMode = false;
  }

  setMode(isImport: boolean): void {
    this.isImportMode = isImport;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    }
  }

  removeSelectedFile(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.selectedFile = null;
  }

  importFromLibrary(): void {
    this.showNewDeckModal = true;
    this.isImportMode = true;
  }

  async importFile(): Promise<void> {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const fileContent = event.target?.result as string;
      if (!fileContent) return;

      try {
        if (this.selectedFile?.name.endsWith('.json')) {
          await this.handleJsonImport(fileContent);
        } else if (this.selectedFile?.name.endsWith('.csv')) {
          await this.handleCsvImport(fileContent);
        }
      } catch (error) {
        console.error('Erreur lors de l\'analyse du fichier:', error);
      }
    };

    reader.onerror = (error) => {
      console.error('Erreur lors de la lecture du fichier:', error);
    };

    reader.readAsText(this.selectedFile);
  }

  private async handleJsonImport(fileContent: string): Promise<void> {
    const parsedData = JSON.parse(fileContent) as ImportedDeck;
    try {
      const createdDeck = await this.createNewDeckFromImport(parsedData);
      if (parsedData.cards && Array.isArray(parsedData.cards)) {
        await this.importCards(parsedData.cards, createdDeck.id);
      }
      await this.loadDashboardData();
      this.closeModal();
    } catch (error) {
      console.error('Erreur lors de la création du deck:', error);
    }
  }

  private async handleCsvImport(fileContent: string): Promise<void> {
    try {
      const rows = fileContent.trim().split('\n');
      if (rows.length <= 1) return;

      const newDeckRequest: CreateDeckRequest = {
        name: 'Deck importé depuis CSV',
        description: `Importé le ${new Date().toLocaleDateString()}`,
        tags: []
      };
      const createdDeck = await this.createNewDeckFromImport(newDeckRequest);

      const cards = rows.slice(1).map((row) => {
        const columns = row.split(',');
        return {
          question: columns[0],
          answer: columns[1],
          difficultyLevel: 1
        };
      });

      await this.importCards(cards, createdDeck.id);
      await this.loadDashboardData();
      this.closeModal();
    } catch (error) {
      console.error('Erreur lors de la création du deck:', error);
    }
  }

  private async createNewDeckFromImport(deckData: CreateDeckRequest | ImportedDeck): Promise<Deck> {
    if (this.isImported(deckData)) {
      return await this.createNewDeckFromAPI({
        name: deckData.name,
        description: deckData.description || '',
        tags: deckData.tags || []
      });
    } else {
      return await this.createNewDeckFromAPI(deckData);
    }
  }

  private isImported(deckData: CreateDeckRequest | ImportedDeck): deckData is ImportedDeck {
    return (deckData as ImportedDeck).cards !== undefined;
  }

  private async importCards(cards: ImportedCard[], deckId: number): Promise<void> {
    for (const card of cards) {
      const flashcardRequest: CreateFlashcardRequest = {
        question: card.question,
        answer: card.answer,
        deckId: deckId,
        difficultyLevel: card.difficultyLevel || 1,
        imageUrl: undefined
      };

      try {
        await firstValueFrom(this.deckService.createFlashcard(flashcardRequest));
      } catch (error) {
        console.error('Erreur lors de la création de la flashcard:', error);
      }
    }
  }
  addCardToDeck(deck: Deck): void {
    this.router.navigate(['/add-card/:deckId'], {
      queryParams: { deckId: deck.id }
    });
  }

  getFormattedDate(date: string): string {
    return new Date(date).toLocaleDateString();
  }

  getDeckName(deckId: number): string {
    const deck = this.decks.find(d => d.id === deckId);
    return deck?.name || 'Paquet inconnu';
  }

  reviewCard(flashcard: Flashcard): void {
    this.router.navigate(['/review', flashcard.id]);
  }

  deleteDeck(deckId: number): void {
    if (!deckId) {
      console.error('ID de deck invalide');
      return;
    }

    if (confirm('Êtes-vous sûr de vouloir supprimer ce paquet ?')) {
      this.deckService.deleteDeck(deckId).subscribe({
        next: () => {
          this.decks = this.decks.filter(deck => deck.id !== deckId);
          this.loadDashboardData();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression du deck:', error);
        }
      });
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadDashboardData();
    }
  }

  nextPage(): void {
    const maxPage = Math.ceil(this.totalFlashcards / this.pageSize) - 1;
    if (this.currentPage < maxPage) {
      this.currentPage++;
      this.loadDashboardData();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
