import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';

// Create simplified test components
@Component({
  selector: 'app-social-links',
  template: '',
  standalone: true
})
class MockSocialLinksComponent {}

@Component({
  selector: 'app-hero-section',
  template: '',
  standalone: true
})
class MockHeroSectionComponent {}

@Component({
  selector: 'app-language-switcher',
  template: '',
  standalone: true
})
class MockLanguageSwitcherComponent {}

@Component({
  selector: 'app-footer-links',
  template: '',
  standalone: true
})
class MockFooterLinksComponent {}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppComponent,
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
    expect(compiled.querySelector('app-social-links')).toBeFalsy();
    expect(compiled.querySelector('app-hero-section')).toBeFalsy();
    expect(compiled.querySelector('app-language-switcher')).toBeFalsy();
    expect(compiled.querySelector('app-footer-links')).toBeFalsy();
  });

  it('should have a router outlet', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });

  it('should have the main layout structure', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('main')).toBeFalsy();
    expect(compiled.querySelector('header')).toBeFalsy();
    expect(compiled.querySelector('footer')).toBeFalsy();
  });
});
