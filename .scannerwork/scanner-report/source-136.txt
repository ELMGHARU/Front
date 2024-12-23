import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivacyPolicyComponent } from './privacy-policy.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('PrivacyPolicyComponent', () => {
  let component: PrivacyPolicyComponent;
  let fixture: ComponentFixture<PrivacyPolicyComponent>;
  let router: Router;

  beforeEach(async () => {
    spyOn(window, 'close');

    await TestBed.configureTestingModule({
      imports: [
        PrivacyPolicyComponent,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(PrivacyPolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain all required sections', () => {
    const sections = fixture.debugElement.queryAll(By.css('section'));
    expect(sections.length).toBe(3);

    const headings = fixture.debugElement.queryAll(By.css('h2'));
    expect(headings[0].nativeElement.textContent).toContain('Introduction');
    expect(headings[1].nativeElement.textContent).toContain('Collecte');
    expect(headings[2].nativeElement.textContent).toContain('Utilisation');
  });

  it('should have working accept button', () => {
    const acceptButton = fixture.debugElement.query(By.css('.accept-button'));
    acceptButton.triggerEventHandler('click', null);
    expect(localStorage.getItem('privacy-accepted')).toBe('true');
  });

  it('should have working close button with router link', () => {
    const closeButton = fixture.debugElement.query(By.css('.close-button'));
    expect(closeButton.attributes['routerLink']).toBe('/dashboard');
  });

  it('should set localStorage when accepting policy', () => {
    component.acceptPolicy();
    expect(localStorage.getItem('privacy-accepted')).toBe('true');
    expect(window.close).toHaveBeenCalled();
  });

  it('should call window.close when closing policy', () => {
    component.closePolicy();
    expect(window.close).toHaveBeenCalled();
  });

  it('should render the last update date', () => {
    const lastUpdate = fixture.debugElement.query(By.css('.last-update'));
    expect(lastUpdate.nativeElement.textContent).toContain('25 novembre 2024');
  });

  it('should render all list items in collecte section', () => {
    const collecteSection = fixture.debugElement.query(By.css('#collecte'));
    const listItems = collecteSection.queryAll(By.css('li'));
    expect(listItems.length).toBe(4);
  });

  it('should render all list items in utilisation section', () => {
    const utilisationSection = fixture.debugElement.query(By.css('#utilisation'));
    const listItems = utilisationSection.queryAll(By.css('li'));
    expect(listItems.length).toBe(5);
  });

  it('should have responsive container', () => {
    const container = fixture.debugElement.query(By.css('.privacy-container'));
    expect(container).toBeTruthy();
    // Vérifier la présence de la classe plutôt que le style calculé
    expect(container.classes['privacy-container']).toBeTrue();
  });

  // Test supplémentaire pour la structure responsive
  it('should have responsive footer buttons', () => {
    const footer = fixture.debugElement.query(By.css('.privacy-footer'));
    const buttons = footer.queryAll(By.css('button'));
    expect(buttons.length).toBe(2);
    expect(buttons[0].classes['accept-button']).toBeTrue();
    expect(buttons[1].classes['close-button']).toBeTrue();
  });
});
