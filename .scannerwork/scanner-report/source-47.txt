import { Component, OnInit } from '@angular/core';
import { DeckService, Deck, Flashcard } from '../deck.service';
import { StudySessionService } from '../services/study-session.service'; // Importez le service StudySessionService
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type CustomFlashcard = Flashcard & {
  lastReviewed?: Date;
  mastered?: boolean;
};

@Component({
    selector: 'app-deck-statistics',
    templateUrl: './deck-statistics.component.html',
    styleUrls: ['./deck-statistics.component.css'],
    imports: [CommonModule, FormsModule],
    providers: [DatePipe]
})
export class DeckStatisticsComponent implements OnInit {
  decks: Deck[] = [];
  selectedDeck: Deck | null = null;
  flashcards: CustomFlashcard[] = [];

  statistics = {
    masteredCards: 0,
    cardsToReview: 0,
    weeklyProgress: 0,
    monthlyProgress: 0
  };

  readonly MINUTES_IN_WEEK = 60 * 24 * 7;
  readonly MINUTES_IN_MONTH = 60 * 24 * 30;

  constructor(
    private deckService: DeckService,
    private studySessionService: StudySessionService // Injectez le service StudySessionService
  ) {}

  ngOnInit(): void {
    this.loadDecks();
  }

  loadDecks(): void {
    this.deckService.getDecks(0, 100).subscribe({
      next: (response) => {
        this.decks = response.content;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des decks:', error);
      }
    });
  }

  selectDeck(deck: Deck): void {
    this.selectedDeck = deck;
    this.loadFlashcards(deck.id);
  }

  loadFlashcards(deckId: number): void {
    this.deckService.getFlashcardsByDeckId(deckId).subscribe({
      next: (response) => {
        this.flashcards = response.content.map(flashcard => ({
          ...flashcard,
          lastReviewed: (flashcard as any).lastReviewed ? new Date((flashcard as any).lastReviewed) : undefined,
          mastered: (flashcard as any).mastered || false
        }));
        this.calculateStatistics();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des flashcards:', error);
      }
    });
  }

  private calculateStatistics(): void {
    if (!this.selectedDeck) return;

    const deckFlashcards = this.getFlashcardsForDeck(this.selectedDeck.id);
    const totalCards = deckFlashcards.length;

    if (totalCards === 0) return;

    const now = new Date();
    let weeklyCount = 0;
    let monthlyCount = 0;

    deckFlashcards.forEach(flashcard => {
      const minutesSinceReview = this.getMinutesSinceReview(flashcard.lastReviewed, now);
      if (minutesSinceReview <= this.MINUTES_IN_WEEK) weeklyCount++;
      if (minutesSinceReview <= this.MINUTES_IN_MONTH) monthlyCount++;
    });

    this.statistics = {
      masteredCards: this.countMasteredCards(deckFlashcards),
      cardsToReview: totalCards - this.countMasteredCards(deckFlashcards),
      weeklyProgress: this.calculatePercentage(weeklyCount, totalCards),
      monthlyProgress: this.calculatePercentage(monthlyCount, totalCards)
    };
  }

  private getFlashcardsForDeck(deckId: number): CustomFlashcard[] {
    return this.flashcards.filter(card => card.deckId === deckId);
  }

  private countMasteredCards(cards: CustomFlashcard[]): number {
    return cards.filter(card => card.mastered).length;
  }

  private getMinutesSinceReview(lastReviewed: Date | undefined, now: Date): number {
    if (!lastReviewed) {
      return 0;
    }
    return (now.getTime() - lastReviewed.getTime()) / (1000 * 60);
  }

  private calculatePercentage(value: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  }

  getDeckStatistics(deck: Deck): {
    masteredPercentage: number;
    toReviewPercentage: number;
    weeklyProgress: number;
    monthlyProgress: number;
  } {
    const deckFlashcards = this.getFlashcardsForDeck(deck.id);
    const totalCards = deckFlashcards.length;

    if (totalCards === 0) {
      return {
        masteredPercentage: 0,
        toReviewPercentage: 0,
        weeklyProgress: 0,
        monthlyProgress: 0
      };
    }

    const now = new Date();
    const masteredCards = this.countMasteredCards(deckFlashcards);

    return {
      masteredPercentage: this.calculatePercentage(masteredCards, totalCards),
      toReviewPercentage: this.calculatePercentage(totalCards - masteredCards, totalCards),
      weeklyProgress: this.calculatePercentage(
        deckFlashcards.filter(card =>
          card.lastReviewed && this.getMinutesSinceReview(card.lastReviewed, now) <= this.MINUTES_IN_WEEK
        ).length,
        totalCards
      ),
      monthlyProgress: this.calculatePercentage(
        deckFlashcards.filter(card =>
          card.lastReviewed && this.getMinutesSinceReview(card.lastReviewed, now) <= this.MINUTES_IN_MONTH
        ).length,
        totalCards
      )
    };
  }

}
