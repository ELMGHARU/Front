import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckListComponent } from './deck-list.component';
import { DeckService, Deck, PageResponse } from '../deck.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('DeckListComponent', () => {
  let component: DeckListComponent;
  let fixture: ComponentFixture<DeckListComponent>;
  let mockDeckService: jasmine.SpyObj<DeckService>;

  // Mock deck data
  const mockDecks: Deck[] = [
    {
      id: 1,
      name: 'Test Deck 1',
      cardCount: 10,
      lastModified: new Date().toISOString(),
      progress: 0,
      category: 'Test',
      cards: []
    },
    {
      id: 2,
      name: 'Test Deck 2',
      cardCount: 5,
      lastModified: new Date().toISOString(),
      progress: 0,
      category: 'Test',
      cards: []
    }
  ];

  // Mock page response
  const mockPageResponse: PageResponse<Deck> = {
    content: mockDecks,
    totalPages: 1,
    totalElements: 2
  };

  beforeEach(async () => {
    // Create a mock DeckService
    const deckServiceSpy = jasmine.createSpyObj('DeckService', ['getDecks']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        CommonModule,
        DeckListComponent
      ],
      providers: [
        { provide: DeckService, useValue: deckServiceSpy }
      ]
    }).compileComponents();

    // Setup mock service to return mock data
    mockDeckService = TestBed.inject(DeckService) as jasmine.SpyObj<DeckService>;
    mockDeckService.getDecks.and.returnValue(of(mockPageResponse));

    // Create component
    fixture = TestBed.createComponent(DeckListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load decks on init', () => {
    // Trigger ngOnInit
    fixture.detectChanges();

    // Check that getDecks was called
    expect(mockDeckService.getDecks).toHaveBeenCalledWith(0, 10, 'name');

    // Check that decks are populated
    expect(component.decks.length).toBe(2);
    expect(component.decks).toEqual(mockDecks);
  });

  it('should handle loading state', () => {
    // Before detection, should be loading
    expect(component.isLoading).toBe(true);

    // Trigger ngOnInit
    fixture.detectChanges();

    // After loading, should not be loading
    expect(component.isLoading).toBe(false);
  });

  it('should handle error when loading decks fails', () => {
    // Setup service to return an error
    const errorResponse = new Error('Loading failed');
    mockDeckService.getDecks.and.returnValue(throwError(errorResponse));

    // Spy on console.error
    const consoleSpy = spyOn(console, 'error');

    // Trigger ngOnInit
    fixture.detectChanges();

    // Check error handling
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('Erreur lors du chargement des decks');
    expect(consoleSpy).toHaveBeenCalledWith('Erreur:', errorResponse);
  });

  it('should update pagination correctly', () => {
    // Trigger ngOnInit
    fixture.detectChanges();

    // Check pagination properties
    expect(component.totalPages).toBe(1);
    expect(component.currentPage).toBe(0);
  });

  it('should be able to load decks for a specific page', () => {
    // Trigger loadDecks with a specific page
    component.loadDecks(1);

    // Check that getDecks was called with the correct page
    expect(mockDeckService.getDecks).toHaveBeenCalledWith(1, 10, 'name');
  });
});
