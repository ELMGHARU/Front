import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckCreationDashboardComponent } from './deck-creation-dashboard.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { DeckService } from '../../deck.service';
import { of } from 'rxjs';

describe('DeckCreationDashboardComponent', () => {
  let component: DeckCreationDashboardComponent;
  let fixture: ComponentFixture<DeckCreationDashboardComponent>;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let deckService: DeckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeckCreationDashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        DeckService
      ]
    });

    fixture = TestBed.createComponent(DeckCreationDashboardComponent);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    deckService = TestBed.inject(DeckService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call the getDecks method from DeckService', () => {
    spyOn(deckService, 'getDecks').and.returnValue(of({ content: [], totalElements: 0, totalPages: 0, number: 0 }));
    component.ngOnInit();
    expect(deckService.getDecks).toHaveBeenCalled();
  });
});
