import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DeckService, Deck, CreateDeckRequest } from '../deck.service';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-deck-creation',
  templateUrl: './deck-creation.component.html',
  styleUrls: ['./deck-creation.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
        HttpClientModule

  ]
})
export class DeckCreationComponent {
  showNewDeckModal = false;
  isImportMode = false;
  newDeckName = '';
  selectedFile: File | null = null;
  decks: Deck[] = [];

  constructor(private deckService: DeckService, private router: Router) {}

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    this.deckService.getDecks(0, 10, 'name').subscribe(
      (response) => {
        this.decks = response.content;
      },
      (error) => {
        console.error('Erreur lors du chargement des decks:', error);
      }
    );
  }
 startStudySession(deck: Deck) {
    if (deck.cardCount > 0) {
      this.router.navigate(['/study-session', deck.id]);
    } else {
      // Vous pouvez afficher un message d'erreur ici si le deck est vide
      console.log('Ce deck ne contient pas de cartes à étudier.');
    }
  }
  createNewDeck() {
    this.showNewDeckModal = true;
    this.isImportMode = false;
  }

  importFromLibrary() {
    this.showNewDeckModal = true;
    this.isImportMode = true;
  }

  closeModal() {
    this.showNewDeckModal = false;
    this.newDeckName = '';
    this.selectedFile = null;
  }

  setMode(isImport: boolean) {
    this.isImportMode = isImport;
  }

  confirmDeckCreation() {
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
          this.closeModal();
        },
        (error: any) => {
          console.error('Erreur lors de la création du paquet :', error);
        }
      );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.selectedFile = event.dataTransfer?.files[0] || null;
  }

  removeSelectedFile(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
  }

  importFile() {
    console.log('Importation du paquet :', this.selectedFile);
    this.closeModal();
  }

  addCard(deck: Deck) {
    this.router.navigate(['/add-card'], { queryParams: { deckId: deck.id } });
  }
}
