import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PracticeComponent } from './practice.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { DeckService } from '../deck.service';

describe('PracticeComponent', () => {
  let component: PracticeComponent;
  let fixture: ComponentFixture<PracticeComponent>;

  const mockDeck = {
    name: 'Test Deck',
    cards: [
      { question: 'Q1', answer: 'A1' },
      { question: 'Q2', answer: 'A2' },
      { question: 'Q3', answer: 'A3' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PracticeComponent
      ],
      providers: [
        { provide: DeckService, useValue: jasmine.createSpyObj('DeckService', ['getDeck']) }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PracticeComponent);
    component = fixture.componentInstance;
    component.deck = mockDeck;
    component.cards = mockDeck.cards;
    fixture.detectChanges();
  });

  describe('Difficulty Rating', () => {
    it('should handle easy rating correctly', () => {
      component.markDifficultyAndNext('easy');
      expect(component.getAccuracy()).toBe(50); // Un succès sur deux tentatives
    });

    it('should handle medium rating correctly', () => {
      component.markDifficultyAndNext('medium');
      expect(component.getAccuracy()).toBe(50); // Un succès sur deux tentatives
    });

    it('should handle hard rating correctly', () => {
      component.markDifficultyAndNext('hard');
      expect(component.getAccuracy()).toBe(0); // Zéro succès
    });
  });

  describe('Modal Handling', () => {
    it('should display correct statistics in modal', () => {
      // Simuler trois réponses
      component.markDifficultyAndNext('easy');    // Correct
      component.markDifficultyAndNext('hard');    // Incorrect
      component.markDifficultyAndNext('medium');  // Correct

      fixture.detectChanges();

      component.showCongratulationsModal = true;
      fixture.detectChanges();

      const statsElement = fixture.debugElement.query(By.css('.stat-number'));
      const statsText = statsElement.nativeElement.textContent.trim();
      expect(statsText).toBe('3'); // Nombre total de cartes étudiées
    });
  });

  // Autres tests...
});
