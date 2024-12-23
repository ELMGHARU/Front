import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HeaderComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Navigation Links', () => {
    it('should have logo with home link', () => {
      const logo = fixture.debugElement.query(By.css('a[routerLink="/"]'));
      expect(logo).toBeTruthy();
      expect(logo.query(By.css('img'))).toBeTruthy();
    });

    it('should have login link', () => {
      const loginLink = fixture.debugElement.query(By.css('a[routerLink="/login"]'));
      expect(loginLink).toBeTruthy();
      expect(loginLink.nativeElement.textContent.trim()).toBe('Log in');
    });

    it('should have correct navigation links', () => {
      const links = fixture.debugElement.queryAll(By.css('nav a'));
      const expectedLinks = ['/languages', '/courses', '/phrasebooks', '/blog', '/start-learning'];

      const actualLinks = links.map(link => link.attributes['routerLink']);
      expect(actualLinks).toEqual(expectedLinks);
    });
  });

  describe('Language Switcher', () => {
    it('should render language switcher', () => {
      const select = fixture.debugElement.query(By.css('.language-switcher select'));
      expect(select).toBeTruthy();
    });

    it('should have correct language options', () => {
      const options = fixture.debugElement.queryAll(By.css('option'));
      expect(options.length).toBe(3);
      expect(options[0].nativeElement.textContent).toBe('Select language');
      expect(options[1].nativeElement.textContent).toBe('Français');
      expect(options[2].nativeElement.textContent).toBe('Español');
    });
  });

  describe('Mobile Menu', () => {
    it('should render mobile menu button', () => {
      const button = fixture.debugElement.query(By.css('button.md\\:hidden'));
      expect(button).toBeTruthy();
    });

    it('should call toggleMenu when mobile menu button is clicked', () => {
      spyOn(component, 'toggleMenu');
      const button = fixture.debugElement.query(By.css('button.md\\:hidden'));
      button.triggerEventHandler('click', null);
      expect(component.toggleMenu).toHaveBeenCalled();
    });
  });

  describe('Styling and Layout', () => {
    it('should have fixed header', () => {
      const header = fixture.debugElement.query(By.css('header'));
      expect(header.classes['fixed']).toBeTrue();
      expect(header.classes['top-0']).toBeTrue();
    });

    it('should have yellow top bar', () => {
      const topBar = fixture.debugElement.query(By.css('div.bg-yellow-400'));
      expect(topBar).toBeTruthy();
    });

    it('should have white main header with shadow', () => {
      const mainHeader = fixture.debugElement.query(By.css('div.bg-white.shadow-sm'));
      expect(mainHeader).toBeTruthy();
    });
  });

  describe('Start Learning Button', () => {
    it('should have correct text', () => {
      const button = fixture.debugElement.query(By.css('a[routerLink="/start-learning"]'));
      expect(button.nativeElement.textContent.trim()).toBe('Start Learning');
    });

    it('should have correct styling', () => {
      const button = fixture.debugElement.query(By.css('a[routerLink="/start-learning"]'));
      expect(button.classes['bg-yellow-400']).toBeTrue();
      expect(button.classes['rounded-full']).toBeTrue();
    });
  });
});
