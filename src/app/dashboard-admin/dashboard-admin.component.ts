import { Component, OnInit } from '@angular/core';
import { DeckService } from '../deck.service';
import { FlashcardService } from '../flashcard.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class DashboardAdminComponent implements OnInit {
  decks: any[] = [];

  constructor(
    private deckService: DeckService,
    private flashcardservice: FlashcardService
  ) {}

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    this.deckService.getDecks(0, 10).subscribe({
      next: (response: any) => {
        this.decks = response.content;
      },
      error: (err: any) => {
        console.error('Erreur lors du chargement des decks', err);
      }
    });
  }

  createDeck(): void {
    const newDeck = {
      name: 'Nouveau Deck',
      description: 'Description du nouveau deck',
      tags: ['tag1', 'tag2']
    };

    this.deckService.createDeck(newDeck).subscribe({
      next: (deck: any) => {
        console.log('Deck créé:', deck);
        this.loadDecks();
      },
      error: (err: any) => {
        console.error('Erreur lors de la création du deck', err);
      }
    });
  }

  deleteDeck(deckId: number): void {
    this.deckService.deleteDeck(deckId).subscribe({
      next: () => {
        console.log('Deck supprimé');
        this.loadDecks();
      },
      error: (err: any) => {
        console.error('Erreur lors de la suppression du deck', err);
      }
    });
  }
}
