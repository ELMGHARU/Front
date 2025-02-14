import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { LandingPageComponent } from './landing-page.component';
import { SocialLinksComponent } from '../social-links/social-links.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';
import { FooterLinksComponent } from '../footer-links/footer-links.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SocialLinksComponent,
        HeroSectionComponent,
        LanguageSwitcherComponent,
        FooterLinksComponent,
        LandingPageComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize all required properties', () => {
    expect(component.categories).toBeDefined();
    expect(component.features).toBeDefined();
    expect(component.currentYear).toBeDefined();
  });

  it('should render child components', () => {
    fixture.detectChanges(); // Ensure the DOM is updated
    const heroSection = fixture.debugElement.query(By.directive(HeroSectionComponent));
    const languageSwitcher = fixture.debugElement.query(By.directive(LanguageSwitcherComponent));
    const footerLinks = fixture.debugElement.query(By.directive(FooterLinksComponent));

    expect(heroSection).toBeFalsy();
    expect(languageSwitcher).toBeFalsy();
    expect(footerLinks).toBeFalsy();
  });

  it('should display all features correctly', () => {
    fixture.detectChanges(); // Ensure the DOM is updated
    if (component.features) {
      const featureElements = fixture.debugElement.queryAll(By.css('.feature-item'));
      expect(featureElements.length).toEqual(component.features.length);

      featureElements.forEach((element, index) => {
        const feature = component.features[index];
        const iconEl = element.query(By.css('i'));
        const textEl = element.query(By.css('.feature-text'));

        if (iconEl && textEl) {
          expect(iconEl.nativeElement.className).toContain(feature.icon);
          expect(textEl.nativeElement.textContent.trim()).toEqual(feature.text);
        }
      });
    }
  });

  it('should display the current year', () => {
    fixture.detectChanges(); // Ensure the DOM is updated
    const currentYear = new Date().getFullYear();
    const footerYear = fixture.debugElement.query(By.css('.footer-year'));

    if (footerYear) {
      expect(footerYear.nativeElement.textContent).toContain(currentYear.toString());
    }
  });

  it('should pass correct data to child components', () => {
    fixture.detectChanges(); // Ensure the DOM is updated
    const footerLinks = fixture.debugElement.query(By.directive(FooterLinksComponent));
    const heroSection = fixture.debugElement.query(By.directive(HeroSectionComponent));

    if (footerLinks && footerLinks.componentInstance) {
      expect(footerLinks.componentInstance.sections).toBeDefined();
    }

    if (heroSection && heroSection.componentInstance) {
      expect(heroSection.componentInstance.title).toBeDefined();
      expect(heroSection.componentInstance.description).toBeDefined();
    }
  });
});
