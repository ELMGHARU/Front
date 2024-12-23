import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard, authGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => false
          }
        }
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should redirect to login when not authenticated', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const mockSnapshot = { url: '/test' } as RouterStateSnapshot;

    const result = guard.canActivate({} as ActivatedRouteSnapshot, mockSnapshot);

    expect(result).toBeFalsy();
    expect(navigateSpy).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: mockSnapshot.url }
    });
  });

  it('should allow access when authenticated', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);
    const mockSnapshot = {} as RouterStateSnapshot;

    const result = guard.canActivate({} as ActivatedRouteSnapshot, mockSnapshot);

    expect(result).toBeTruthy();
  });
});

describe('authGuard function', () => {
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AuthService,
          useValue: {
            isLoggedIn: () => false
          }
        }
      ]
    });

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should redirect to login when not authenticated', () => {
    const routerSpy = spyOn(router, 'createUrlTree').and.callThrough();

    TestBed.runInInjectionContext(() => {
      const result = authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/test' } as RouterStateSnapshot
      );

      expect(routerSpy).toHaveBeenCalledWith(['/login'], {
        queryParams: { returnUrl: '/test' }
      });
    });
  });

  it('should allow access when authenticated', () => {
    spyOn(authService, 'isLoggedIn').and.returnValue(true);

    TestBed.runInInjectionContext(() => {
      const result = authGuard(
        {} as ActivatedRouteSnapshot,
        {} as RouterStateSnapshot
      );

      expect(result).toBeTruthy();
    });
  });
});
