import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeroComponent  // Import comme standalone component
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct headline text', () => {
    const headlineElement = fixture.debugElement.query(By.css('h1'));
    expect(headlineElement.nativeElement.textContent.trim())
      .toContain('Language learning that makes you feel at home');
  });

  it('should have correct subheadline paragraph', () => {
    const subheadlineElement = fixture.debugElement.query(By.css('p.text-xl'));
    expect(subheadlineElement.nativeElement.textContent.trim())
      .toContain('Using learning techniques developed by Oxford neuroscientists');
  });

  it('should have target user description', () => {
    const targetUserElement = fixture.debugElement.query(By.css('p.text-gray-300'));
    expect(targetUserElement.nativeElement.textContent.trim())
      .toContain('World Explorers | Lifelong Learners | Adventurers in Love');
  });

  it('should have a get started button', () => {
    const buttonElement = fixture.debugElement.query(By.css('a[routerLink="/get-started"]'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Get Started');
  });

  it('should have app screen images on large screens', () => {
    const imageElements = fixture.debugElement.queryAll(By.css('img[src*="app-screen"]'));
    expect(imageElements.length).toBe(2);
    expect(imageElements[0].attributes['src']).toContain('app-screen-1.png');
    expect(imageElements[1].attributes['src']).toContain('app-screen-2.png');
  });

  it('should have yellow underline image', () => {
    const underlineImage = fixture.debugElement.query(By.css('img[src*="yellow-underline.svg"]'));
    expect(underlineImage).toBeTruthy();
  });
});
