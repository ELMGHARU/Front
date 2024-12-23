import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckCreationDashboardComponent } from './deck-creation-dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DeckService } from '../../deck.service';
import { of, throwError } from 'rxjs';

describe('DeckCreationDashboardComponent', () => {
  let component: DeckCreationDashboardComponent;
  let fixture: ComponentFixture<DeckCreationDashboardComponent>;
  let httpTestingController: HttpTestingController;
  let deckService: DeckService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        DeckCreationDashboardComponent // Import as standalone component
      ],
      providers: [DeckService],
    }).compileComponents();

    fixture = TestBed.createComponent(DeckCreationDashboardComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    deckService = TestBed.inject(DeckService);
  });

  afterEach(() => {
    // Ensure no pending HTTP requests remain after tests
    httpTestingController.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle error during deck loading', () => {
    const errorMessage = 'Error loading decks';

    spyOn(deckService, 'getDecks').and.returnValue(throwError(() => new Error(errorMessage)));
    component.ngOnInit();

    expect(deckService.getDecks).toHaveBeenCalled();
    expect(component.decks).toEqual([]); // Ensure decks remain empty on error
    // Optional: Add checks for error handling logic in the component if implemented
  });
});
