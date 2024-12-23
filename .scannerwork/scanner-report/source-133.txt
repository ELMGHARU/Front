import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryComponent } from './library.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('LibraryComponent', () => {
  let component: LibraryComponent;
  let fixture: ComponentFixture<LibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryComponent,
        RouterTestingModule,
        FormsModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.searchQuery).toBe('');
    expect(component.selectedDeck).toBeNull();
    expect(component.currentCardIndex).toBe(0);
    expect(component.cardFlipped).toBeFalse();
  });

  it('should filter decks based on search query', () => {
    // Given
    component.searchQuery = 'English';

    // When
    component.searchDecks();

    // Then
    expect(component.filteredDecks.length).toBe(1);
    expect(component.filteredDecks[0].name).toContain('English');
  });

  it('should show deck details when a deck is selected', () => {
    // Given
    const testDeck = component.decks[0];

    // When
    component.showDeckDetails(testDeck);

    // Then
    expect(component.selectedDeck).toBe(testDeck);
    expect(component.currentCardIndex).toBe(0);
    expect(component.cardFlipped).toBeFalse();
  });

  it('should close cards and reset state', () => {
    // Given
    component.selectedDeck = component.decks[0];
    component.currentCardIndex = 2;
    component.cardFlipped = true;

    // When
    component.closeCards();

    // Then
    expect(component.selectedDeck).toBeNull();
    expect(component.currentCardIndex).toBe(0);
    expect(component.cardFlipped).toBeFalse();
  });

  it('should flip card when triggered', () => {
    // Given
    const initialState = component.cardFlipped;

    // When
    component.flipCard();

    // Then
    expect(component.cardFlipped).toBe(!initialState);
  });

  it('should navigate to next card correctly', () => {
    // Given
    component.selectedDeck = component.decks[0];
    component.currentCardIndex = 0;
    component.cardFlipped = true;

    // When
    component.nextCard();

    // Then
    expect(component.currentCardIndex).toBe(1);
    expect(component.cardFlipped).toBeFalse();
  });

  it('should not go beyond last card when navigating forward', () => {
    // Given
    component.selectedDeck = component.decks[0];
    component.currentCardIndex = component.selectedDeck.cards.length - 1;

    // When
    component.nextCard();

    // Then
    expect(component.currentCardIndex).toBe(component.selectedDeck.cards.length - 1);
  });

  it('should navigate to previous card correctly', () => {
    // Given
    component.selectedDeck = component.decks[0];
    component.currentCardIndex = 1;
    component.cardFlipped = true;

    // When
    component.previousCard();

    // Then
    expect(component.currentCardIndex).toBe(0);
    expect(component.cardFlipped).toBeFalse();
  });

  it('should not go below first card when navigating backward', () => {
    // Given
    component.selectedDeck = component.decks[0];
    component.currentCardIndex = 0;

    // When
    component.previousCard();

    // Then
    expect(component.currentCardIndex).toBe(0);
  });

  it('should render correct number of deck cards', () => {
    const deckElements = fixture.debugElement.queryAll(By.css('.deck-card'));
    expect(deckElements.length).toBe(component.decks.length);
  });

  it('should update search results on input change', () => {
    // Given
    const input = fixture.debugElement.query(By.css('.search-input')).nativeElement;

    // When
    input.value = 'Compilation';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Then
    expect(component.filteredDecks.length).toBe(1);
    expect(component.filteredDecks[0].name).toContain('Compilation');
  });
});
