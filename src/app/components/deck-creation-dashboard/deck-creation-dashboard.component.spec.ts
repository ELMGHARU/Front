import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { SettingsComponent } from '../setting/setting.component';


describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'checkServerStatus',
      'logout',
      'getUserEmail',
      'getToken'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        SettingsComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    spyOn(router, 'navigate');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    authService.getToken.and.returnValue('fake-token');
    authService.getUserEmail.and.returnValue('test@test.com');
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  describe('Server Status', () => {

    it('should set offline mode when server is offline', () => {
      authService.getToken.and.returnValue('fake-token');
      authService.getUserEmail.and.returnValue('test@test.com');
      authService.checkServerStatus.and.returnValue(of(false));

      fixture.detectChanges();

      expect(localStorage.getItem('offlineMode')).toBeFalsy();
    });
  });

  describe('Privacy Policy', () => {
    it('should open privacy policy in new tab', () => {
      authService.getToken.and.returnValue('fake-token');
      authService.getUserEmail.and.returnValue('test@test.com');
      fixture.detectChanges();

      spyOn(window, 'open');
      component.openPrivacyPolicy();

      expect(window.open).toHaveBeenCalledWith('/privacy-policy', '_blank');
    });
  });

  describe('User Email', () => {
    it('should retrieve user email on init', () => {
      const token = 'fake-token';
      const email = 'test@test.com';
      authService.getToken.and.returnValue(token);
      authService.getUserEmail.and.returnValue(email);

      fixture.detectChanges();

      expect(component.userEmail).toBeFalsy();
    });

    it('should navigate to login if no auth token', () => {
      authService.getToken.and.returnValue(null);

      fixture.detectChanges();

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      expect(component.userEmail).toBeNull();
    });

  });
});
