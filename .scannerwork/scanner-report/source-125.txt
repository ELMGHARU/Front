import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FlashcardService, Flashcard, ReviewFlashcardRequest, StudySession } from './flashcard.service';

describe('FlashcardService', () => {
  let service: FlashcardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FlashcardService]
    });

    service = TestBed.inject(FlashcardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no outstanding HTTP requests
  });

  // Mock data
  const mockFlashcards: Flashcard[] = [
    {
      id: 1,
      question: 'Test Question 1',
      answer: 'Test Answer 1',
      imageUrl: 'test-url-1',
      deckId: 1,
      difficultyLevel: 2,
      nextReviewDate: '2024-01-01',
      reviewCount: 5,
      successRate: 80
    },
    {
      id: 2,
      question: 'Test Question 2',
      answer: 'Test Answer 2',
      imageUrl: 'test-url-2',
      deckId: 1,
      difficultyLevel: 3,
      nextReviewDate: '2024-01-02',
      reviewCount: 3,
      successRate: 70
    }
  ];

  const mockStudySession: StudySession = {
    id: 1,
    deckId: 1,
    startTime: '2024-01-01T10:00:00',
    endTime: '2024-01-01T11:00:00',
    cardsReviewed: 5,
    correctAnswers: 4,
    accuracy: 80
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get due flashcards by deck ID', () => {
    const deckId = 1;

    service.getDueFlashcardsByDeckId(deckId).subscribe(flashcards => {
      expect(flashcards.length).toBe(2);
      expect(flashcards).toEqual(mockFlashcards);
    });

    const req = httpMock.expectOne(`api/v1/memoria/flashcards/deck/${deckId}/due`);
    expect(req.request.method).toBe('GET');
    req.flush(mockFlashcards);
  });

  it('should submit flashcard review', () => {
    const reviewData: ReviewFlashcardRequest = {
      flashcardId: 1,
      correct: true,
      difficultyRating: 2
    };

    const expectedFlashcard: Flashcard = {
      ...mockFlashcards[0],
      successRate: 85
    };

    service.submitFlashcardReview(reviewData).subscribe(flashcard => {
      expect(flashcard).toEqual(expectedFlashcard);
    });

    const req = httpMock.expectOne(`api/v1/memoria/flashcards/${reviewData.flashcardId}/review`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(reviewData);
    req.flush(expectedFlashcard);
  });

  it('should start a study session', () => {
    const deckId = 1;

    service.startSession(deckId).subscribe(session => {
      expect(session).toEqual(mockStudySession);
    });

    const req = httpMock.expectOne(`api/v1/memoria/study-sessions/start?deckId=${deckId}`);
    expect(req.request.method).toBe('POST');
    req.flush(mockStudySession);
  });

  it('should handle errors when getting due flashcards', () => {
    const deckId = 1;
    const errorMessage = 'Error fetching flashcards';

    service.getDueFlashcardsByDeckId(deckId).subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`api/v1/memoria/flashcards/deck/${deckId}/due`);
    req.flush(errorMessage, { status: 500, statusText: errorMessage });
  });

  it('should handle errors when submitting flashcard review', () => {
    const reviewData: ReviewFlashcardRequest = {
      flashcardId: 1,
      correct: true,
      difficultyRating: 2
    };
    const errorMessage = 'Error submitting review';

    service.submitFlashcardReview(reviewData).subscribe({
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe(errorMessage);
      }
    });

    const req = httpMock.expectOne(`api/v1/memoria/flashcards/${reviewData.flashcardId}/review`);
    req.flush(errorMessage, { status: 400, statusText: errorMessage });
  });
});
