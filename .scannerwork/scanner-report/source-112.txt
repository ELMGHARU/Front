import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDeckModalComponent } from './new-deck-modal.component';

describe('NewDeckModalComponent', () => {
  let component: NewDeckModalComponent;
  let fixture: ComponentFixture<NewDeckModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewDeckModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewDeckModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
