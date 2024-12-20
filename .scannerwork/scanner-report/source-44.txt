import { Component, OnInit } from '@angular/core';
import { DeckService, Deck } from '../deck.service'; // Importer le service
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css'],
  standalone: true,
    imports: [
      FormsModule,
      CommonModule
    ]
})
export class DeckListComponent implements OnInit {
  decks: Deck[] = [];         // Liste des decks
  isLoading = true;           // Indicateur de chargement
  errorMessage: string | null = null; // Message d'erreur
  currentPage = 0;            // Page actuelle pour la pagination
  totalPages = 0;             // Nombre total de pages

  constructor(private deckService: DeckService) {}

  ngOnInit(): void {
    this.loadDecks();  // Charger les decks lors de l'initialisation du composant
  }

  loadDecks(page: number = 0): void {
    this.isLoading = true; // Démarrer le chargement
    this.deckService.getDecks(page, 10, 'name').subscribe(
      (response) => {
        this.decks = response.content;    // Mettre à jour la liste des decks
        this.totalPages = response.totalPages; // Mettre à jour le nombre total de pages
        this.currentPage = page;         // Mettre à jour la page actuelle
        this.isLoading = false;          // Fin du chargement
      },
      (error) => {
        this.isLoading = false;          // Fin du chargement en cas d'erreur
        this.errorMessage = 'Erreur lors du chargement des decks'; // Afficher l'erreur
        console.error('Erreur:', error);  // Afficher l'erreur dans la console
      }
    );
  }
}
