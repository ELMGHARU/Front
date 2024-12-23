import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// Créer des composants de test simplifiés
@Component({
  selector: 'app-social-links',
  template: ''
})
class MockSocialLinksComponent {}

@Component({
  selector: 'app-hero-section',
  template: ''
})
class MockHeroSectionComponent {}

@Component({
  selector: 'app-language-switcher',
  template: ''
})
class MockLanguageSwitcherComponent {}

@Component({
  selector: 'app-footer-links',
  template: ''
})
class MockFooterLinksComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppComponent
      ],
      declarations: [
        MockSocialLinksComponent,
        MockHeroSectionComponent,
        MockLanguageSwitcherComponent,
        MockFooterLinksComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toEqual('Memrise - Learn a language');
  });

  it('should render main navigation components', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-social-links')).toBeTruthy();
    expect(compiled.querySelector('app-hero-section')).toBeTruthy();
    expect(compiled.querySelector('app-language-switcher')).toBeTruthy();
    expect(compiled.querySelector('app-footer-links')).toBeTruthy();
  });

  it('should have a router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });

  // Test de la navigation si nécessaire
  it('should render the correct route components', () => {
    const router = TestBed.inject(RouterTestingModule);
    // Ajouter des tests de navigation si nécessaire
  });

  // Test du template principal
  it('should have the main layout structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main')).toBeTruthy();
    expect(compiled.querySelector('header')).toBeTruthy();
    expect(compiled.querySelector('footer')).toBeTruthy();
  });
});
