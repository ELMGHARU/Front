import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

// Import the components you're testing
import { SocialLinksComponent } from './social-links/social-links.component';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckCreationComponent } from './deck-creation/deck-creation.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppComponent,
        // Import all standalone components
        SocialLinksComponent,
        HeroSectionComponent,
        LanguageSwitcherComponent,
        FooterLinksComponent,
        LandingPageComponent,
        LoginComponent,
        DashboardComponent,
        DeckCreationComponent
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
    expect(component.title).toBe('Memrise - Learn a language');
  });

  it('should create social links component', () => {
    const socialLinksElement = fixture.debugElement.query(By.directive(SocialLinksComponent));
    expect(socialLinksElement).toBeTruthy();
  });

  it('should create hero section component', () => {
    const heroSectionElement = fixture.debugElement.query(By.directive(HeroSectionComponent));
    expect(heroSectionElement).toBeTruthy();
  });

  it('should create language switcher component', () => {
    const languageSwitcherElement = fixture.debugElement.query(By.directive(LanguageSwitcherComponent));
    expect(languageSwitcherElement).toBeTruthy();
  });

  it('should create footer links component', () => {
    const footerLinksElement = fixture.debugElement.query(By.directive(FooterLinksComponent));
    expect(footerLinksElement).toBeTruthy();
  });

  // If these components might not always be present, you can adjust the tests accordingly
  it('should have a router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
