import { TestBed } from '@angular/core/testing';
import { DeckService, Deck, PageResponse, CreateDeckRequest, Flashcard, FlashcardsResponse, StudySession } from './deck.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

describe('DeckService', () => {
  let service: DeckService;
  let httpMock: HttpTestingController;
  let router: Router;
  const apiUrl = '/api/v1/memoria';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [DeckService]
    });

    service = TestBed.inject(DeckService);
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);

    // Mock localStorage
    spyOn(localStorage, 'getItem').and.returnValue('test-token');
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getDecks', () => {
    it('should fetch decks with pagination', () => {
      const mockResponse: PageResponse<Deck> = {
        content: [{
          id: 1,
          name: 'Test Deck',
          cardCount: 10,
          lastModified: '2024-01-01',
          progress: 0,
          category: 'TEST'
        }],
        totalPages: 1,
        totalElements: 1
      };

      service.getDecks(0, 10).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/decks?page=0&size=10`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle empty deck list', () => {
      const mockResponse: PageResponse<Deck> = {
        content: [],
        totalPages: 0,
        totalElements: 0
      };

      service.getDecks(0, 10).subscribe(response => {
        expect(response.content.length).toBe(0);
        expect(response.totalPages).toBe(0);
      });

      const req = httpMock.expectOne(`${apiUrl}/decks?page=0&size=10`);
      req.flush(mockResponse);
    });

    it('should handle error response', () => {
      const errorSpy = jasmine.createSpy('errorSpy');

      service.getDecks().pipe(
        catchError(error => {
          errorSpy(error);
          return throwError(() => error);
        })
      ).subscribe({
        error: () => {} // Catch the error to prevent unhandled rejection
      });

      const req = httpMock.expectOne(`${apiUrl}/decks?page=0&size=10`);
      req.error(new ErrorEvent('Network error'));

      expect(errorSpy).toHaveBeenCalled();
    });
  });

  describe('createDeck', () => {
    it('should create a new deck', () => {
      const mockRequest: CreateDeckRequest = {
        name: 'New Deck',
        description: 'Test description',
        tags: ['test']
      };

      const mockResponse: Deck = {
        id: 1,
        name: 'New Deck',
        cardCount: 0,
        lastModified: '2024-01-01',
        progress: 0,
        category: 'TEST'
      };

      service.createDeck(mockRequest).subscribe(deck => {
        expect(deck).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/decks`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(mockRequest);
      req.flush(mockResponse);
    });

    it('should handle validation errors when creating a deck', () => {
      const invalidRequest: CreateDeckRequest = {
        name: '', // Empty name should trigger validation
        description: '',
        tags: []
      };

      const errorSpy = jasmine.createSpy('errorSpy');

      service.createDeck(invalidRequest).pipe(
        catchError(error => {
          errorSpy(error);
          return throwError(() => error);
        })
      ).subscribe({
        error: () => {} // Catch the error to prevent unhandled rejection
      });

      const req = httpMock.expectOne(`${apiUrl}/decks`);
      req.flush('Validation Error', { status: 400, statusText: 'Bad Request' });

      expect(errorSpy).toHaveBeenCalled();
    });
  });

  describe('getFlashcardsByDeckId', () => {
    it('should fetch flashcards for a deck', () => {
      const mockResponse: FlashcardsResponse = {
        content: [{
          id: 1,
          question: 'Test Question',
          answer: 'Test Answer',
          deckId: 1,
          difficultyLevel: 1
        }],
        pageable: {},
        last: true,
        totalElements: 1,
        totalPages: 1
      };

      service.getFlashcardsByDeckId(1).subscribe(response => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne(`${apiUrl}/flashcards/deck/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle empty flashcards response', () => {
      const mockResponse: FlashcardsResponse = {
        content: [],
        pageable: {},
        last: true,
        totalElements: 0,
        totalPages: 0
      };

      service.getFlashcardsByDeckId(1).subscribe(response => {
        expect(response.content.length).toBe(0);
        expect(response.totalElements).toBe(0);
      });

      const req = httpMock.expectOne(`${apiUrl}/flashcards/deck/1`);
      req.flush(mockResponse);
    });
  });

  describe('startSession and endSession', () => {
    it('should handle study sessions', () => {
      const mockSession: StudySession = {
        id: 1,
        deckId: 1,
        startTime: '2024-01-01T00:00:00',
        endTime: '2024-01-01T00:01:00',
        cardsReviewed: 10,
        correctAnswers: 8,
        accuracy: 80
      };

      // Test startSession
      service.startSession(1).subscribe(session => {
        expect(session).toEqual(mockSession);
      });

      let req = httpMock.expectOne(`${apiUrl}/study-sessions/start?deckId=1`);
      expect(req.request.method).toBe('POST');
      req.flush(mockSession);

      // Test endSession
      service.endSession(1).subscribe(response => {
        expect(response).toBeTruthy();
      });

      req = httpMock.expectOne(`${apiUrl}/study-sessions/end?sessionId=1`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('Error Handling', () => {


    it('should handle 500 internal server error', () => {
      const errorSpy = jasmine.createSpy('errorSpy');

      service.getDecks().pipe(
        catchError(error => {
          errorSpy(error);
          return throwError(() => error);
        })
      ).subscribe({
        error: () => {} // Catch the error to prevent unhandled rejection
      });

      const req = httpMock.expectOne(`${apiUrl}/decks?page=0&size=10`);
      req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
