import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DeckCreationComponent } from './deck-creation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DeckService } from '../deck.service';

describe('DeckCreationComponent', () => {
  let component: DeckCreationComponent;
  let fixture: ComponentFixture<DeckCreationComponent>;
  let deckService: DeckService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        DeckCreationComponent
      ],
      providers: [DeckService]
    }).compileComponents();

    fixture = TestBed.createComponent(DeckCreationComponent);
    component = fixture.componentInstance;
    deckService = TestBed.inject(DeckService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
