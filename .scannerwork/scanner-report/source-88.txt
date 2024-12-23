import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DeckService } from '../deck.service';

@Component({
    selector: 'app-practice',
    imports: [CommonModule],
    template: `
    <div class="practice-page">
      <!-- Header -->
      <div class="header">
        <div class="header-content">
          <button class="back-button" (click)="goBack()">
            <i class="fas fa-arrow-left"></i>
          </button>
          <h2>Quiz - {{ deck?.name }}</h2>
          <div class="progress-info">{{currentCardIndex + 1}}/{{cards.length}}</div>
        </div>
      </div>

      <!-- Card Section -->
      <div class="question-card" (click)="flipCard()" *ngIf="!showDifficultyRating">
        <div class="card-inner" [class.is-flipped]="isCardFlipped">
          <div class="card-face card-front">
            <div class="card-content">
              <div class="question-text">
                {{ cards[currentCardIndex]?.question }}
              </div>
              <div class="card-image" *ngIf="cards[currentCardIndex]?.imageUrl">
                <img [src]="cards[currentCardIndex]?.imageUrl" alt="Card image">
              </div>
            </div>
          </div>
          <div class="card-face card-back">
            <div class="card-content">
              <div class="answer-text">
                {{ cards[currentCardIndex]?.answer }}
              </div>
              <div class="card-image" *ngIf="cards[currentCardIndex]?.imageUrl">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Difficulty Rating Section -->
      <div *ngIf="isCardFlipped && !showDifficultyRating" class="difficulty-section">
        <div class="difficulty-question">
          Quelle est votre niveau de compréhension ?
        </div>
        <div class="difficulty-buttons">
          <button class="difficulty-btn easy" (click)="markDifficultyAndNext('easy')">
            Facile
          </button>
          <button class="difficulty-btn medium" (click)="markDifficultyAndNext('medium')">
            Moyen
          </button>
          <button class="difficulty-btn hard" (click)="markDifficultyAndNext('hard')">
            Difficile
          </button>
        </div>
      </div>

      <!-- Congratulations Modal -->
      <div class="modal" *ngIf="showCongratulationsModal">
        <div class="modal-content">
          <div class="congratulations-container">
            <div class="icon-container">
              <svg viewBox="0 0 24 24" class="congratulation-icon">
                <circle cx="12" cy="12" r="10" class="success-circle"/>
                <path d="M8 12l3 3 6-6" class="success-check" fill="none" stroke="white" stroke-width="2"/>
              </svg>
            </div>
            <h2 class="congratulations-title">
              Génial vous avez révisé toutes les cartes d'Aujourd'hui
            </h2>
            <p class="congratulations-subtitle">
              Vous avez révisé {{ cards.length }} cartes aujourd'hui.
            </p>
            <div class="stats-container">
              <div class="stat-item">
                <span class="stat-number">{{ cards.length }}</span>
                <span class="stat-label">Cartes révisées</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ getAccuracy() }}%</span>
                <span class="stat-label">Précision</span>
              </div>
            </div>
            <button class="continue-button" (click)="closeCongratulationsModal()">
              Continuer
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .practice-page {
      min-height: 100vh;
      background-color: #1E2329;
      padding-bottom: 40px;
    }

    .header {
      background-color: #2A3441;
      padding: 20px;
      margin-bottom: 30px;
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 400px;
      margin: 0 auto;
      color: white;
    }

    .back-button {
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }

    h2 {
      color: white;
      margin: 0;
      font-size: 18px;
    }

    .progress-info {
      color: white;
      font-size: 14px;
    }

    .question-card {
      position: relative;
      width: 100%;
      max-width: 400px;
      height: 350px;
      perspective: 1000px;
      margin: 0 auto 20px;
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      text-align: center;
      transition: transform 0.6s;
      transform-style: preserve-3d;
      cursor: pointer;
    }

    .card-inner.is-flipped {
      transform: rotateX(180deg);
    }

    .card-face {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      padding: 20px;
      border-radius: 15px;
      background-color: #2A3441;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }

    .card-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      gap: 15px;
    }

    .card-front {
      transform: rotateX(0deg);
    }

    .card-back {
      transform: rotateX(180deg);
    }

    .question-text,
    .answer-text {
      font-size: 20px;
      color: white;
      text-align: center;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .card-image {
      width: 100%;
      max-height: 150px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }

    .card-image img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 8px;
    }

    .difficulty-section {
      max-width: 400px;
      margin: 20px auto;
      padding: 0 20px;
      opacity: 0;
      animation: fadeInUp 0.5s forwards;
      animation-delay: 0.3s;
    }

    .difficulty-question {
      color: #7D8896;
      text-align: center;
      font-size: 14px;
      margin-bottom: 20px;
    }

    .difficulty-buttons {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .difficulty-btn {
      padding: 12px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      color: white;
    }

    .difficulty-btn.easy {
      background: linear-gradient(to right, #4CAF50, #45a049);
    }

    .difficulty-btn.medium {
      background: linear-gradient(to right, #FFA726, #FB8C00);
    }

    .difficulty-btn.hard {
      background: linear-gradient(to right, #EF5350, #E53935);
    }

    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .modal-content {
      background-color: #2A3441;
      padding: 30px;
      border-radius: 15px;
      max-width: 400px;
      width: 90%;
    }

    .congratulations-container {
      text-align: center;
    }

    .congratulation-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
    }

    .success-circle {
      fill: #4CAF50;
    }

    .congratulations-title {
      color: white;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .congratulations-subtitle {
      color: #8896AA;
      margin-bottom: 30px;
    }

    .stats-container {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-bottom: 30px;
    }

    .stat-item {
      text-align: center;
    }

    .stat-number {
      font-size: 24px;
      font-weight: bold;
      color: white;
      display: block;
      margin-bottom: 5px;
    }

    .stat-label {
      color: #8896AA;
      font-size: 14px;
    }

    .continue-button {
      background-color: #4CAF50;
      color: white;
      border: none;
      padding: 15px 40px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      transition: transform 0.2s, background-color 0.2s;
    }

    .continue-button:hover {
      background-color: #45a049;
      transform: translateY(-2px);
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 480px) {
      .question-card {
        height: 300px;
      }

      .question-text,
      .answer-text {
        font-size: 16px;
      }

      .card-image {
        max-height: 120px;
      }

      .continue-button {
        padding: 12px 30px;
        font-size: 14px;
      }
    }
  `]
})
export class PracticeComponent implements OnInit {
  deck: any;
  cards: any[] = [];
  currentCardIndex = 0;
  showAnswer = false;
  showDifficultyRating = false;
  showCongratulationsModal = false;
  isCardFlipped = false;
  showStudyView = false;
  cardsToStudy = 0;
  progressOffset = 0;
  protected readonly Math = Math;
  private correctAnswers = 0;

  constructor(
    private router: Router,
    private deckService: DeckService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.deck = navigation.extras.state['deck'];
      this.cards = this.deck?.cards || [];
    }
  }

  ngOnInit(): void {
    console.log('Cards:', this.cards); // Pour déboguer
    if (!this.cards.length) {
      this.goBack();
      return;
    }
    this.cardsToStudy = this.cards.length;
    this.calculateProgress();
  }

  flipCard(): void {
    if (!this.isCardFlipped) {
      this.isCardFlipped = true;
      setTimeout(() => {
        this.showAnswer = true;
      }, 300);
    }
  }

  markDifficultyAndNext(difficulty: string): void {
    if (difficulty === 'easy' || difficulty === 'medium') {
      this.correctAnswers++;
    }

    if (this.currentCardIndex < this.cards.length - 1) {
      this.currentCardIndex++;
      this.resetCard();
    } else {
      this.showCongratulationsModal = true;
    }
  }

  resetCard(): void {
    this.isCardFlipped = false;
    this.showAnswer = false;
    this.showDifficultyRating = false;
  }

  calculateProgress(): number {
    return Math.round((this.currentCardIndex / this.cards.length) * 100);
  }

  getAccuracy(): number {
    return Math.round((this.correctAnswers / (this.currentCardIndex + 1)) * 100);
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
  closeCongratulationsModal(): void {
    this.showCongratulationsModal = false;
    this.showStudyView = true;
    const circumference = 2 * Math.PI * 45;
    const progress = this.cardsToStudy / this.cards.length;
    this.progressOffset = circumference - (progress * circumference);
  }

  startStudy(): void {
    this.showStudyView = false;
    this.resetCard();
    this.currentCardIndex = 0;
  }
}
