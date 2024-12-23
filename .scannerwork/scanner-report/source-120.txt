import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckStatisticsComponent } from './deck-statistics.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeckService } from '../deck.service';

describe('DeckStatisticsComponent', () => {
  let component: DeckStatisticsComponent;
  let fixture: ComponentFixture<DeckStatisticsComponent>;
  let deckService: DeckService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        DeckStatisticsComponent
      ],
      providers: [DeckService]
    }).compileComponents();

    fixture = TestBed.createComponent(DeckStatisticsComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
