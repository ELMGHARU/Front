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

  it('should have the expected properties', () => {
    expect(component.categories).toBeDefined();
    expect(component.companyHistory).toBeDefined();
    expect(component.companyValues).toBeDefined();
    expect(component.features).toBeDefined();
    expect(component.howItWorksSteps).toBeDefined();
    expect(component.teamMembers).toBeDefined();
    expect(component.socialLinks).toBeDefined();
    expect(component.footerSections).toBeDefined();
    expect(component.currentYear).toBeDefined();
  });

  it('should render the expected sections', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-hero-section')).toBeTruthy();
    expect(compiled.querySelector('.company-section')).toBeTruthy();
    expect(compiled.querySelector('.features-section')).toBeTruthy();
    expect(compiled.querySelector('.steps-section')).toBeTruthy();
    expect(compiled.querySelector('.team-section')).toBeTruthy();
    expect(compiled.querySelector('.footer')).toBeTruthy();
  });

  it('should display the correct company history', () => {
    const historyItems = fixture.debugElement.queryAll(By.css('.timeline-item'));
    expect(historyItems.length).toEqual(component.companyHistory.length);

    component.companyHistory.forEach((milestone, index) => {
      const yearElement = historyItems[index].query(By.css('.year')).nativeElement;
      const descriptionElement = historyItems[index].query(By.css('p')).nativeElement;
      expect(yearElement.textContent).toContain(milestone.year.toString());
      expect(descriptionElement.textContent).toContain(milestone.description);
    });
  });

  it('should display the correct team members', () => {
    const teamCards = fixture.debugElement.queryAll(By.css('.team-card'));
    expect(teamCards.length).toEqual(component.teamMembers.length);

    component.teamMembers.forEach((member, index) => {
      const nameElement = teamCards[index].query(By.css('.team-name')).nativeElement;
      const roleElement = teamCards[index].query(By.css('.team-role')).nativeElement;
      const bioElement = teamCards[index].query(By.css('.team-bio')).nativeElement;
      expect(nameElement.textContent).toContain(member.name);
      expect(roleElement.textContent).toContain(member.role);
      expect(bioElement.textContent).toContain(member.bio);
    });
  });

  it('should pass the correct data to HeroSectionComponent', () => {
    const heroSection = fixture.debugElement.query(By.directive(HeroSectionComponent));
    expect(heroSection).toBeTruthy();
  });

  it('should render LanguageSwitcherComponent', () => {
    const languageSwitcher = fixture.debugElement.query(By.directive(LanguageSwitcherComponent));
    expect(languageSwitcher).toBeTruthy();
  });

  it('should pass the correct data to FooterLinksComponent', () => {
    const footerLinks = fixture.debugElement.query(By.directive(FooterLinksComponent));
    expect(footerLinks).toBeTruthy();
    expect(footerLinks.componentInstance.footerSections).toEqual(component.footerSections);
  });

  it('should display the correct features', () => {
    const featureItems = fixture.debugElement.queryAll(By.css('.feature-item'));
    expect(featureItems.length).toEqual(component.features.length);

    component.features.forEach((feature, index) => {
      const iconElement = featureItems[index].query(By.css('i')).nativeElement;
      const textElement = featureItems[index].query(By.css('span')).nativeElement;
      expect(iconElement.className).toContain(feature.icon);
      expect(textElement.textContent).toContain(feature.text);
    });
  });

  it('should display the current year in the footer', () => {
    const footerText = fixture.debugElement.query(By.css('footer p')).nativeElement.textContent;
    expect(footerText).toContain(new Date().getFullYear().toString());
  });
});
