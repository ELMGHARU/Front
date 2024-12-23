import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'register',
      'validateUsername',
      'validatePassword',
      'validateEmail'
    ]);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule,
        RegisterComponent
      ],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Form Validation', () => {
    it('should fail validation if username is empty', () => {
      // Configurer les validations
      authService.validateUsername.and.returnValue(true);
      authService.validatePassword.and.returnValue(true);
      authService.validateEmail.and.returnValue(true);

      component.username = '';
      component.password = 'validPassword';
      component.email = 'test@test.com';

      component.onSubmit();

      expect(component.errorMessage).toContain('Veuillez remplir tous les champs');
    });
  });

  describe('Registration Process', () => {
    it('should call register service method on successful validation', () => {
      // Configurer les validations
      authService.validateUsername.and.returnValue(true);
      authService.validatePassword.and.returnValue(true);
      authService.validateEmail.and.returnValue(true);

      // Fournir un mock de réponse complet
      authService.register.and.returnValue(of({
        token: 'fake-token',
        refreshToken: 'fake-refresh-token'
      }));

      component.username = 'testuser';
      component.password = 'password123';
      component.email = 'test@test.com';

      component.onSubmit();

      expect(authService.register).toHaveBeenCalledWith(
        'testuser',
        'password123',
        'test@test.com'
      );
    });

    it('should handle registration error with conflict status', () => {
      authService.validateUsername.and.returnValue(true);
      authService.validatePassword.and.returnValue(true);
      authService.validateEmail.and.returnValue(true);
      authService.register.and.returnValue(throwError(() => ({ status: 409 })));

      component.username = 'testuser';
      component.password = 'password123';
      component.email = 'test@test.com';

      component.onSubmit();

      expect(component.errorMessage).toBe('L\'email est déjà utilisé');
    });
  });
});
