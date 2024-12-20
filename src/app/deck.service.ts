import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

// Interfaces
export interface Deck {
  id: number;
  name: string;
  cardCount: number;
  lastModified: string;
  progress: number;
  category: string;
  cards?: any[];
}

export interface CreateDeckRequest {
  name: string;
  description: string;
  tags: string[];
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

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export interface CreateFlashcardRequest {
  question: string;
  answer: string;
  imageUrl?: string;
  deckId: number;
  difficultyLevel: number;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  imageUrl?: string;
  deckId: number;
  difficultyLevel: number;
  nextReviewDate?: string;
  reviewCount?: number;
  successRate?: number;
}

export interface FlashcardsResponse {
  content: Flashcard[];
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private apiUrl = '/api/v1/memoria'; // Proxy redirection active

  constructor(private http: HttpClient, private router: Router) {}

  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Vérifier si localStorage est disponible et retourner les en-têtes avec jeton
  private getHeaders(): HttpHeaders {
    let token = '';
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token') || '';
    }

    console.log('Token:', token);  // Vérifiez si le token est bien récupéré
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  // Gérer les erreurs de réponse, y compris le 401 (Unauthorized) et 403 (Forbidden)
  private handleError(error: any): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 200) {
        console.error('Erreur d\'analyse de la réponse :', error);
        return throwError('Échec de l\'analyse de la réponse de l\'API');
      }
      if (error.status === 401) {
        console.error('Token expiré ou invalide. Redirection vers la page de connexion.');
        alert('Votre session a expiré. Veuillez vous reconnecter.');
        this.router.navigate(['/login']);
      } else if (error.status === 403) {
        console.error('Accès interdit : ', error.message);
        alert('Accès interdit ! Veuillez vérifier vos autorisations.');
      } else if (error.status === 500) {
        console.error('Erreur interne du serveur : ', error.message);
        alert('Une erreur interne du serveur est survenue.');
      } else {
        console.error('Une erreur est survenue : ', error.message || error);
      }
    }
    return throwError('Une erreur est survenue.');
  }

  // Créer un deck
  createDeck(deckRequest: CreateDeckRequest): Observable<Deck> {
    return this.http.post<Deck>(`${this.apiUrl}/decks`, deckRequest, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Obtenir tous les decks avec pagination
  getDecks(page: number = 0, size: number = 10, sort?: string): Observable<PageResponse<Deck>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (sort) {
      params = params.set('sort', sort);
    }

    // Ajout du token dans les headers
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('ngrok-skip-browser-warning', 'true');

    console.log('Token:', this.getToken()); // Pour déboguer
    console.log('URL:', `${this.apiUrl}/decks`);
    console.log('Headers:', headers);

    return this.http.get<PageResponse<Deck>>(`${this.apiUrl}/decks`, {
      params,
      headers
    }).pipe(
      tap(response => console.log('Success Response:', response)),
      catchError(error => {
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          headers: error.headers,
          error: error.error
        });

        if (error.status === 403) {
          // Token invalide ou expiré
          console.error('Token invalide ou expiré');
          // Optionnel : rediriger vers la page de login
          return throwError(() => new Error('Session expirée. Veuillez vous reconnecter.'));
        }

        return throwError(() => new Error('Erreur lors de la récupération des decks'));
      })
    );
  }

  // Créer une flashcard
  createFlashcard(flashcardRequest: CreateFlashcardRequest): Observable<Flashcard> {
    return this.http.post<Flashcard>(`${this.apiUrl}/flashcards`, flashcardRequest, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Obtenir une flashcard par ID
  getFlashcardById(id: number): Observable<Flashcard> {
    return this.http.get<Flashcard>(`${this.apiUrl}/flashcards/${id}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Obtenir les flashcards par Deck ID
  getFlashcardsByDeckId(deckId: number): Observable<FlashcardsResponse> {
    const url = `${this.apiUrl}/flashcards/deck/${deckId}`;

    // Ajout du token dans les headers
    const headers = new HttpHeaders()
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${this.getToken()}`)
      .set('ngrok-skip-browser-warning', 'true');

    console.log('Token:', this.getToken()); // Pour déboguer
    console.log('URL:', url);
    console.log('Headers:', headers);

    return this.http.get<FlashcardsResponse>(url, { headers }).pipe(
      tap(response => console.log('Success Response:', response)),
      catchError(error => {
        console.error('Error details:', {
          status: error.status,
          message: error.message,
          headers: error.headers,
          error: error.error
        });

        if (error.status === 403) {
          // Token invalide ou expiré
          console.error('Token invalide ou expiré');
          // Optionnel : rediriger vers la page de login
          return throwError(() => new Error('Session expirée. Veuillez vous reconnecter.'));
        }

        if (error instanceof HttpErrorResponse) {
          if (error.status === 200) {
            console.error('Erreur d\'analyse de la réponse :', error);
            return throwError('Échec de l\'analyse de la réponse de l\'API');
          }
        }

        return throwError(() => new Error('Erreur lors de la récupération des flashcards'));
      })
    );
  }

  // Démarrer une session d'étude
  startSession(deckId: number): Observable<StudySession> {
    return this.http.post<StudySession>(`${this.apiUrl}/study-sessions/start?deckId=${deckId}`, {}, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Terminer une session d'étude
  endSession(sessionId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/study-sessions/end?sessionId=${sessionId}`, {}, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Envoyer une évaluation de flashcard
  submitFlashcardReview(flashcardId: number, correct: boolean, difficultyRating: number): Observable<any> {
    const reviewData = { flashcardId, correct, difficultyRating };

    return this.http.post(`${this.apiUrl}/flashcards/${flashcardId}/review`, reviewData, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Supprimer un deck
  deleteDeck(deckId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/decks/${deckId}`, { headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

  // Rechercher des flashcards
  searchFlashcards(deckId: string, query: string, page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('deckId', deckId)
      .set('query', query)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/flashcards/search`, { params, headers: this.getHeaders() })
      .pipe(catchError(this.handleError.bind(this)));
  }

}
