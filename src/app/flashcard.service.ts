// flashcard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  imageUrl: string;
  deckId: number;
  difficultyLevel: number;
  nextReviewDate: string;
  reviewCount: number;
  successRate: number;
}

export interface ReviewFlashcardRequest {
  flashcardId: number;
  correct: boolean;
  difficultyRating: number;
}

export interface StudySession {
  id: number;
  deckId: number;
  startTime: string;
  endTime: string;
  cardsReviewed: number;
  correctAnswers: number;
  accuracy: number;
}

@Injectable({
  providedIn: 'root'
})
export class FlashcardService {
  private apiUrl = 'api/v1/memoria';

  constructor(private http: HttpClient) {}

  getDueFlashcardsByDeckId(deckId: number): Observable<Flashcard[]> {
    const url = `${this.apiUrl}/flashcards/deck/${deckId}/due`;
    return this.http.get<Flashcard[]>(url);
  }

  submitFlashcardReview(reviewData: ReviewFlashcardRequest): Observable<Flashcard> {
    const url = `${this.apiUrl}/flashcards/${reviewData.flashcardId}/review`;
    return this.http.post<Flashcard>(url, reviewData);
  }

  startSession(deckId: number): Observable<StudySession> {
    const url = `${this.apiUrl}/study-sessions/start?deckId=${deckId}`;
    return this.http.post<StudySession>(url, {});
  }
}
