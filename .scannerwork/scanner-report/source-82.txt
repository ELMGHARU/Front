import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
   <div class="layout-container">
     <!-- Barre de navigation à gauche -->
      <nav class="sidebar">
           <img src="https://i.postimg.cc/Pf25nnXz/Custom-dimensions-192x69-px.png" alt="Memoria Logo" class="logo" />
           <h2 class="nav-title">Menu Principal</h2>
           <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
             <i class="fas fa-home"></i>
             <span>Tableau de bord</span>
           </a>
           <a routerLink="/decks" routerLinkActive="active" class="nav-item">
             <i class="fas fa-layer-group"></i>
             <span>Mes paquets</span>
           </a>
           <a routerLink="/statistics" routerLinkActive="active" class="nav-item">
             <i class="fas fa-chart-bar"></i>
             <span>Statistiques</span>
           </a>
           <a routerLink="/library" routerLinkActive="active" class="nav-item">
             <i class="fas fa-book"></i>
             <span>Bibliothèque</span>
           </a>
           <a routerLink="/setting" routerLinkActive="active" class="nav-item">
             <i class="fas fa-cog"></i>
             <span>Paramètres</span>
           </a>

           <button class="logout-btn">
             <i class="fas fa-door-open"></i>
             <span>Déconnexion</span>
           </button>
         </nav>
    <!-- Main Content -->
    <div class="library-container">
      <div class="content-section">
        <!-- En-tête avec fond sombre -->
        <div class="explore-header">
          Explorez les paquets partagés par la communauté
        </div>

        <!-- Zone de recherche -->
        <div class="search-section">
          <div class="search-container">
            <i class="fas fa-search search-icon"></i>
            <input type="text"
                   [(ngModel)]="searchQuery"
                   (input)="searchDecks()"
                   placeholder="Rechercher des paquets"
                   class="search-input">
          </div>
        </div>

        <!-- Filter Tags -->
        <div class="filter-section">
          <div class="filter-tags">
            <button class="tag tag-red">Langues</button>
            <button class="tag tag-blue">Compilation</button>
            <button class="tag tag-purple">Tests</button>
          </div>
        </div>

        <!-- Decks List -->
        <div class="decks-section">
          <h2>Populaire({{filteredDecks.length}})</h2>
          <div class="decks-list">
            <div *ngFor="let deck of filteredDecks"
                 class="deck-card"
                 (click)="showDeckDetails(deck)">
              <div class="deck-dot" [ngClass]="deck.color"></div>
              <div class="deck-info">
                <div class="deck-title">{{deck.name}}</div>
                <div class="deck-count">{{deck.cards.length}} cartes</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Cards Modal -->
    <div class="cards-modal" *ngIf="selectedDeck">
      <div class="modal-header">
        <button class="back-button" (click)="closeCards()">
          <i class="fas fa-arrow-left"></i>
        </button>
        <h2>{{selectedDeck.name}}</h2>
        <div class="cards-count">{{currentCardIndex + 1}}/{{selectedDeck.cards.length}}</div>
      </div>

      <div class="cards-container">
        <div class="card" [class.flipped]="cardFlipped" (click)="flipCard()">
          <div class="card-inner">
            <div class="card-front">
              <div class="card-content">
                {{selectedDeck.cards[currentCardIndex].recto}}
              </div>
            </div>
            <div class="card-back">
              <div class="card-content">
                {{selectedDeck.cards[currentCardIndex].verso}}
              </div>
            </div>
          </div>
        </div>

        <div class="card-controls">
          <button class="flip-button" (click)="flipCard()">
            <i class="fas fa-sync-alt"></i> Retourner
          </button>
          <div class="navigation-buttons">
            <button (click)="previousCard()" [disabled]="currentCardIndex === 0">
              <i class="fas fa-chevron-left"></i>
            </button>
            <button (click)="nextCard()"
                    [disabled]="currentCardIndex === selectedDeck.cards.length - 1">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
    /* Layout de base */
    .sidebar {
        width: 260px;
        background-color: #2D2A4A;
        padding: 2rem;
        height: 100vh;
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .logo {
        max-width: 100%;
        margin-bottom: 2rem;
      }

      .nav-title {
        color: #A9A7C1;
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 1rem;
        font-weight: 500;
      }

      .nav-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        color: #A9A7C1;
        text-decoration: none;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
      }

      .nav-item i {
        width: 20px;
        margin-right: 12px;
      }

      .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #FFFFFF;
      }

      .nav-item.active {
        background-color: #6C63FF;
        color: white;
      }

      .logout-btn {
        background: linear-gradient(145deg, #FF416C, #FF4B2B);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(255, 65, 108, 0.2);
        margin-top: auto;
        width: 100%;
      }

      .logout-btn i {
        font-size: 1.1rem;
        transition: transform 0.2s ease;
      }

      .logout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 65, 108, 0.4);
      }

      .logout-btn:hover i {
        transform: scale(1.2);
        animation: doorOpen 0.5s ease;
      }

      .logout-btn:active {
        transform: scale(0.95);
        box-shadow: 0 2px 4px rgba(255, 65, 108, 0.2);
      }

      @keyframes doorOpen {
        0% {
          transform: scale(1) translateX(0);
        }
        50% {
          transform: scale(1.2) translateX(5px);
        }
        100% {
          transform: scale(1.2) translateX(0);
        }
      }

      /* Ajustement du contenu principal */
      .library-container {
        margin-left: 260px; /* Ajusté pour correspondre à la largeur de la sidebar */
      }

      /* Media queries */
      @media (max-width: 1024px) {
        .library-container {
          margin-left: 200px;
        }

        .sidebar {
          width: 200px;
        }
      }

      @media (max-width: 768px) {
        .library-container {
          margin-left: 60px;
        }

        .sidebar {
          width: 60px;
        }

        .nav-item span,
        .nav-title,
        .logout-btn span {
          display: none;
        }

        .nav-item i {
          margin-right: 0;
          font-size: 20px;
        }

        .logout-btn {
          padding: 0.75rem;
        }
      }
      /* Contenu principal */
      .library-container {
        flex: 1;
        margin-left: 250px;
        padding: 40px;
        background-color: #ffffff;
        min-height: 100vh;
      }

      .content-section {
        background-color: #ffffff;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
      }

      .explore-header {
        background-color: #f8f9fa;
        color: #2D3748;
        padding: 20px;
        margin-bottom: 20px;
        border-radius: 8px;
        font-size: 1.1rem;
      }

      /* Search */
      .search-section {
        margin-bottom: 24px;
      }

      .search-container {
        position: relative;
      }

      .search-icon {
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        color: #718096;
      }

      .search-input {
        width: 100%;
        padding: 12px 16px 12px 44px;
        background-color: #ffffff;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        color: #2D3748;
        font-size: 16px;
        transition: all 0.3s ease;
      }

      .search-input:focus {
        outline: none;
        border-color: #6366F1;
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
      }

      /* Filters */
      .filter-section {
        margin-bottom: 30px;
      }

      .filter-tags {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .tag {
        padding: 8px 16px;
        border-radius: 20px;
        background-color: #ffffff;
        color: #2D3748;
        border: 1px solid #E2E8F0;
        cursor: pointer;
        transition: all 0.3s ease;
        font-size: 14px;
        font-weight: 500;
      }

      .tag:hover {
        background-color: #f8f9fa;
      }

      .tag-red { border-left: 3px solid #f85149; }
      .tag-blue { border-left: 3px solid #58a6ff; }
      .tag-purple { border-left: 3px solid #8957e5; }

      /* Decks Grid */
      .decks-section {
        margin-top: 40px;
      }

      h2 {
        color: #2D3748;
        margin-bottom: 20px;
        font-size: 1.5rem;
      }

      .decks-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 24px;
      }

      .deck-card {
        background-color: #ffffff;
        padding: 20px;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.3s ease;
        border: 1px solid #E2E8F0;
      }

      .deck-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }

      .deck-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-bottom: 12px;
      }

      .deck-dot.red { background-color: #f85149; }
      .deck-dot.blue { background-color: #58a6ff; }
      .deck-dot.purple { background-color: #8957e5; }

      .deck-info {
        color: #2D3748;
      }

      .deck-title {
        font-size: 18px;
        font-weight: 600;
        margin-bottom: 8px;
        color: #2D3748;
      }

      .deck-count {
        color: #718096;
        font-size: 14px;
      }

      /* Modal */
      .cards-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, 0.98);
        display: flex;
        flex-direction: column;
        padding: 40px;
        z-index: 1001;
      }

      .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;
        color: #2D3748;
      }

      .modal-header h2 {
        margin: 0;
      }

      .cards-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
      }

      /* Card Flip Animation */
      .card {
        width: 100%;
        max-width: 600px;
        perspective: 1500px;
        margin-bottom: 30px;
      }

      .card-inner {
        position: relative;
        width: 100%;
        height: 400px;
        transform-style: preserve-3d;
        transition: transform 0.6s;
      }

      .card.flipped .card-inner {
        transform: rotateY(180deg);
      }

      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 30px;
        border-radius: 12px;
        background-color: #ffffff;
        border: 1px solid #E2E8F0;
        color: #2D3748;
      }

      .card-back {
        background-color: #f8f9fa;
        transform: rotateY(180deg);
      }

      .card-content {
        font-size: 24px;
        text-align: center;
      }

      /* Card Controls */
      .card-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        max-width: 600px;
      }

      /* Buttons */
      button {
        padding: 12px 24px;
        border-radius: 6px;
        background-color: #ffffff;
        color: #2D3748;
        border: 1px solid #E2E8F0;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      button:hover:not(:disabled) {
        background-color: #f8f9fa;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .back-button {
        padding: 8px;
      }

      .navigation-buttons {
        display: flex;
        gap: 12px;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .library-container {
          margin-left: 200px;
        }

        .side-nav {
          width: 200px;
        }
      }

      @media (max-width: 768px) {
        .library-container {
          margin-left: 60px;
          padding: 20px;
        }

        .side-nav {
          width: 60px;
        }

        .nav-item span {
          display: none;
        }

        .decks-list {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
      }
    @media (max-width: 480px) {
          .decks-list {
            grid-template-columns: 1fr;
          }

          .cards-modal {
            padding: 20px;
          }

          .card-inner {
            height: 300px;
          }

          .menu-title,
          .logout-btn span {
            display: none;
          }
        }
  `]
})export class LibraryComponent {
    searchQuery: string = '';
    selectedDeck: any = null;
    currentCardIndex: number = 0;
    cardFlipped: boolean = false;

    decks = [
      {
        name: 'English Regular Expressions',
        color: 'red',
        cards: [
          { recto: 'What is regex?', verso: 'Regular Expression' },
          { recto: 'What does ^ mean?', verso: 'Start of line' },
          { recto: 'What does $ mean?', verso: 'End of line' },
          { recto: 'What does * mean?', verso: 'Zero or more occurrences' },
          { recto: 'What does + mean?', verso: 'One or more occurrences' },
          { recto: 'What does ? mean?', verso: 'Zero or one occurrence' },
          { recto: 'What does . mean?', verso: 'Any single character' },
          { recto: 'What does [abc] mean?', verso: 'Any character from the set' },
          { recto: 'What does [^abc] mean?', verso: 'Any character not in the set' },
          { recto: 'What is a capture group?', verso: 'Pattern inside parentheses ()' }
        ]
      },
      {
        name: 'Compilation Automates',
        color: 'blue',
        cards: [
          { recto: 'What is regex?', verso: 'Regular Expression' },
          { recto: 'What does ^ mean?', verso: 'Start of line' },
          { recto: 'What does $ mean?', verso: 'End of line' },
          { recto: 'What does * mean?', verso: 'Zero or more occurrences' },
          { recto: 'What does + mean?', verso: 'One or more occurrences' },
          { recto: 'What does ? mean?', verso: 'Zero or one occurrence' },
          { recto: 'What does . mean?', verso: 'Any single character' },
          { recto: 'What does [abc] mean?', verso: 'Any character from the set' },
          { recto: 'What does [^abc] mean?', verso: 'Any character not in the set' },
          { recto: 'What is a capture group?', verso: 'Pattern inside parentheses ()' }
        ]
      },
    ];

    filteredDecks = this.decks;

    searchDecks() {
      this.filteredDecks = this.decks.filter(deck =>
        deck.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    showDeckDetails(deck: any) {
      this.selectedDeck = deck;
      this.currentCardIndex = 0;
      this.cardFlipped = false;
    }

    closeCards() {
      this.selectedDeck = null;
      this.currentCardIndex = 0;
      this.cardFlipped = false;
    }

    flipCard() {
      this.cardFlipped = !this.cardFlipped;
    }

    nextCard() {
      if (this.currentCardIndex < this.selectedDeck.cards.length - 1) {
        this.currentCardIndex++;
        this.cardFlipped = false;
      }
    }

    previousCard() {
      if (this.currentCardIndex > 0) {
        this.currentCardIndex--;
        this.cardFlipped = false;
      }
    }
  }
