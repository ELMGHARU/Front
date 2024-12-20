import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';

// Interfaces
export interface StudySession {
  id: number;
  deckId: number;
  startTime: string;
  endTime: string;
  cardsReviewed: number;
  correctAnswers: number;
  accuracy: number;
}
export interface StudySessionStats {
  totalSessions: number;
  totalCardsReviewed: number;
  averageAccuracy: number;
  totalStudyTimeMinutes: number;
  streakDays: number;
}


@Injectable({
  providedIn: 'root'
})
export class StudySessionService {
  private apiUrl = '/api/v1/memoria'; // Base URL for API requests

  constructor(private http: HttpClient, private router: Router) {}

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'ngrok-skip-browser-warning': 'true', // Optional for ngrok issues
    });
  }

  // Start a study session
  startSession(deckId: number): Observable<StudySession> {
    const url = `${this.apiUrl}/study-sessions/start?deckId=${deckId}`;
    console.log('Token:', this.getToken()); // Debugging token
    console.log('URL:', url);

    return this.http.post<StudySession>(url, {}, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Success Response:', response)),
        catchError((error) => {
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            headers: error.headers,
            error: error.error
          });

          if (error.status === 403) {
            console.error('Session expired or unauthorized');
            this.router.navigate(['/login']);
            return throwError(() => new Error('Session expired. Please log in again.'));
          }

          return throwError(() => new Error('Error starting the session'));
        })
      );
  }

  // End a study session
  endSession(sessionId: number): Observable<any> {
    const url = `${this.apiUrl}/study-sessions/end?sessionId=${sessionId}`;
    console.log('Token:', this.getToken()); // Debugging token
    console.log('URL:', url);

    return this.http.post<any>(url, {}, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Success Response:', response)),
        catchError((error) => {
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            headers: error.headers,
            error: error.error
          });

          if (error.status === 403) {
            console.error('Session expired or unauthorized');
            this.router.navigate(['/login']);
            return throwError(() => new Error('Session expired. Please log in again.'));
          }

          return throwError(() => new Error('Error ending the session'));
        })
      );
  }

  // Get session details by ID
  getSessionById(sessionId: number): Observable<StudySession> {
    const url = `${this.apiUrl}/study-sessions/${sessionId}`;
    console.log('Token:', this.getToken()); // Debugging token
    console.log('URL:', url);

    return this.http.get<StudySession>(url, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Success Response:', response)),
        catchError((error) => {
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            headers: error.headers,
            error: error.error
          });

          if (error.status === 403) {
            console.error('Session expired or unauthorized');
            this.router.navigate(['/login']);
            return throwError(() => new Error('Session expired. Please log in again.'));
          }

          return throwError(() => new Error('Error fetching session details'));
        })
      );
  }

  // Get all study sessions with pagination
  getStudySessions(page: number = 0, size: number = 10, sort?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    const url = `${this.apiUrl}/study-sessions`;
    console.log('Token:', this.getToken()); // Debugging token
    console.log('URL:', url);
    console.log('Params:', params);

    return this.http.get<any>(url, { params, headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Success Response:', response)),
        catchError((error) => {
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            headers: error.headers,
            error: error.error
          });

          if (error.status === 403) {
            console.error('Session expired or unauthorized');
            this.router.navigate(['/login']);
            return throwError(() => new Error('Session expired. Please log in again.'));
          }

          return throwError(() => new Error('Error fetching study sessions'));
        })
      );
  }

  // Submit flashcard review
  submitFlashcardReview(flashcardId: number, correct: boolean, difficultyRating: number): Observable<any> {
    const reviewData = { flashcardId, correct, difficultyRating };
    const url = `${this.apiUrl}/flashcards/${flashcardId}/review`;

    console.log('Token:', this.getToken()); // Debugging token
    console.log('URL:', url);

    return this.http.post<any>(url, reviewData, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Success Response:', response)),
        catchError((error) => {
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            headers: error.headers,
            error: error.error
          });

          if (error.status === 403) {
            console.error('Session expired or unauthorized');
            this.router.navigate(['/login']);
            return throwError(() => new Error('Session expired. Please log in again.'));
          }

          return throwError(() => new Error('Error submitting flashcard review'));
        })
      );
  }

  // Get flashcards by deck ID
  getFlashcardsByDeckId(deckId: number): Observable<any> {
    const url = `${this.apiUrl}/flashcards/deck/${deckId}`;

    // Add token in headers
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('ngrok-skip-browser-warning', 'true');

    console.log('Token:', this.getToken()); // For debugging
    console.log('URL:', url);
    console.log('Headers:', headers);

    return this.http.get<any>(url, { headers }).pipe(
      tap(response => console.log('Success Response:', response)),
      catchError(error => {
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          headers: error.headers,
          error: error.error
        });

        if (error.status === 403) {
          // Invalid or expired token
          console.error('Token invalid or expired');
          // Optionally redirect to login page
          return throwError(() => new Error('Session expired. Please log in again.'));
        }

        if (error instanceof HttpErrorResponse) {
          if (error.status === 200) {
            console.error('Error parsing the response:', error);
            return throwError('Failed to parse the API response');
          }
        }

        return throwError(() => new Error('Error fetching flashcards'));
      })
    );
  }
  getStudySessionStats(): Observable<StudySessionStats> {
    const url = `${this.apiUrl}/study-sessions/stats`;
    console.log('Token:', this.getToken()); // Debugging token
    console.log('URL:', url);

    return this.http.get<StudySessionStats>(url, { headers: this.getHeaders() })
      .pipe(
        tap(response => console.log('Success Response:', response)),
        catchError((error) => {
          console.error('Error details:', {
            status: error.status,
            message: error.message,
            headers: error.headers,
            error: error.error
          });

          if (error.status === 403) {
            console.error('Session expired or unauthorized');
            this.router.navigate(['/login']);
            return throwError(() => new Error('Session expired. Please log in again.'));
          }

          return throwError(() => new Error('Error fetching study session stats'));
        })
      );
  }
}
