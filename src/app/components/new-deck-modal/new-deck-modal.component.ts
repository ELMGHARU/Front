import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-deck-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="modal-overlay" (click)="closeModal()">
      <div class="modal-content" (click)="$event.stopPropagation()">
        <div class="modal-header">
          <h2>Nouveau paquet</h2>
          <button class="close-button" (click)="closeModal()">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <input
            type="text"
            class="deck-name-input"
            placeholder="Nom du paquet"
            [(ngModel)]="deckName"
          >
          <div class="button-group">
            <button class="button button-secondary" (click)="closeModal()">
              Annuler
            </button>
            <button class="button button-primary" (click)="onCreateDeck()">
              Créer
            </button>
          </div>

          <div class="import-section">
            <span class="divider">ou</span>
            <button class="button button-import" (click)="onImport()">
              Importer
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #1a1f2e;
      border-radius: 12px;
      padding: 20px;
      width: 90%;
      max-width: 400px;
      animation: slideUp 0.3s ease-out;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .modal-header h2 {
      color: white;
      margin: 0;
      font-size: 1.5rem;
    }

    .close-button {
      background: none;
      border: none;
      color: #8c8fa3;
      cursor: pointer;
      font-size: 1.2rem;
    }

    .deck-name-input {
      width: 100%;
      padding: 12px;
      border-radius: 8px;
      border: 1px solid #2a2f3e;
      background-color: #2a2f3e;
      color: white;
      margin-bottom: 20px;
      font-size: 1rem;
    }

    .deck-name-input::placeholder {
      color: #8c8fa3;
    }

    .button-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }

    .button {
      flex: 1;
      padding: 12px;
      border-radius: 8px;
      border: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .button-primary {
      background-color: #4a80f0;
      color: white;
    }

    .button-primary:hover {
      background-color: #3a70e0;
    }

    .button-secondary {
      background-color: #2a2f3e;
      color: white;
    }

    .button-secondary:hover {
      background-color: #353a4a;
    }

    .import-section {
      text-align: center;
      position: relative;
      margin-top: 20px;
    }

    .divider {
      display: inline-block;
      color: #8c8fa3;
      margin: 10px 0;
      position: relative;
    }

    .divider::before,
    .divider::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 45%;
      height: 1px;
      background-color: #2a2f3e;
    }

    .divider::before {
      right: 100%;
      margin-right: 15px;
    }

    .divider::after {
      left: 100%;
      margin-left: 15px;
    }

    .button-import {
      width: 100%;
      background-color: #2a2f3e;
      color: white;
      margin-top: 10px;
    }

    @keyframes slideUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `]
})
export class NewDeckModalComponent {
  deckName: string = '';

  closeModal() {
    // Implémenter la fermeture
  }

  onCreateDeck() {
    if (this.deckName.trim()) {
      console.log('Création du paquet:', this.deckName);
      // Implémentez la création ici
      this.closeModal();
    }
  }

  onImport() {
    console.log('Redirection vers import');
    // Implémentez l'import ici
  }
}
