import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DeckService, Deck, Flashcard, FlashcardsResponse, CreateDeckRequest } from '../../deck.service';

@Component({
  selector: 'app-deck-creation-dashboard',
  templateUrl: './deck-creation-dashboard.component.html',
  styleUrls: ['./deck-creation-dashboard.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class DeckCreationDashboardComponent implements OnInit {
  decks: Deck[] = [];
  searchQuery: string = '';
  searchTimeout: any;

  selectedDeckId: number | null = null;
  selectedDeckFlashcards: Flashcard[] = [];
  newDeckName: string = '';
  maxDeckNameLength = 20;

  constructor(
    private deckService: DeckService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDecks();
  }

  private loadDecks(): void {
    this.deckService.getDecks(0, 10).subscribe({
      next: (response) => {
        this.decks = response.content;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des decks:', error);
      }
    });
  }

  loadFlashcardsForDeck(deckId: number): void {
    this.selectedDeckId = deckId;
    this.deckService.getFlashcardsByDeckId(deckId).subscribe({
      next: (response: FlashcardsResponse) => {
        this.selectedDeckFlashcards = response.content;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des flashcards:', error);
        this.selectedDeckFlashcards = [];
      }
    });
  }

  onSearch(): void {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    this.searchTimeout = setTimeout(() => {
      if (this.searchQuery.trim()) {
        this.decks = this.decks.filter(deck =>
          deck.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.loadDecks();
      }
    }, 300);
  }

  createNewDeck(): void {
    if (this.newDeckName.trim().length <= this.maxDeckNameLength) {
      const newDeckRequest: CreateDeckRequest = {
        name: this.newDeckName,
        description: '',
        tags: []
      };

      this.deckService.createDeck(newDeckRequest)
        .subscribe(
          (newDeck: Deck) => {
            console.log('Nouveau paquet créé :', newDeck);
            this.decks.push(newDeck);
            this.newDeckName = '';
          },
          (error: any) => {
            console.error('Erreur lors de la création du paquet :', error);
          }
        );
    } else {
      console.error(`Le nom du paquet ne doit pas dépasser ${this.maxDeckNameLength} caractères.`);
    }
  }

  deleteDeck(deckId: number): void {
    console.log(`Deck à supprimer : ${deckId}`);
    this.deckService.deleteDeck(deckId).subscribe(() => {
      this.decks = this.decks.filter(deck => deck.id !== deckId);
      console.log('Deck supprimé avec succès.');
    }, error => {
      console.error('Erreur lors de la suppression du deck :', error);
    });
  }
}
