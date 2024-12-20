import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import * as jwtDecode from 'jwt-decode';
import { map, timeout } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
// Interfaces
export interface RegisterRequest {
  username: string;   // maxLength: 50 minLength: 3
  email: string;
  password: string;   // maxLength: 100 minLength: 6
}
export interface PasswordResetRequest {
  email: string;
  oldPassword: string;
  newPassword: string;
}
export interface AuthenticationResponse {
  token: string;
  refreshToken: string;
}

export interface AuthenticationRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/v1/memoria';  // URL de l'API

  constructor(private http: HttpClient) {
    this.initializeToken(); // Initialiser le token à la création du service
  }

  private token: string | null = null;

  // Méthode d'initialisation du token
  private initializeToken(): void {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  // Méthode d'inscription
  register(username: string, password: string, email: string): Observable<AuthenticationResponse> {
    const registerData: RegisterRequest = {
      username,
      email,
      password
    };

    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/register`, registerData)
      .pipe(
        tap(response => {
          if (response.token) {
            this.storeTokens(response); // Stocker les tokens si l'inscription réussit
          }
        }),
        catchError(error => {
          console.error('Erreur lors de l\'inscription', error);
          throw error;
        })
      );
  }

  // Méthode de connexion
  login(credentials: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/auth/authenticate`, credentials)
      .pipe(
        tap(response => {
          if (response.token) {
            this.storeTokens(response); // Stocker les tokens si la connexion réussit
          }
        }),
        catchError(error => {
          console.error('Erreur lors de la connexion', error);
          throw error;
        })
      );
  }

  // Méthode de déconnexion
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refreshToken');
    // Vous pouvez ajouter ici la logique de redirection après la déconnexion
  }

  // Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!this.getToken(); // Si un token est présent, l'utilisateur est connecté
  }

  // Récupère le token
  getToken(): string | null {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  // Récupère le refresh token
  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken') || sessionStorage.getItem('refreshToken');
  }

  // Validation des champs
  validateUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 50;
  }

  validatePassword(password: string): boolean {
    return password.length >= 6 && password.length <= 100;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Fonction utilitaire pour stocker les tokens
  private storeTokens(response: AuthenticationResponse): void {
    localStorage.setItem('token', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('refreshToken', response.refreshToken);
  }


checkServerStatus(): Observable<boolean> {
  const headers = new HttpHeaders()
    .set('Accept', '*/*')
    .set('Content-Type', 'application/json');

  return this.http.get(`${this.apiUrl}/health`, {
    headers,
    observe: 'response'  // Pour observer la réponse complète HTTP
  }).pipe(
    map(response => {
      // Vérification du status HTTP
      return response.status === 200;
    }),
    catchError((error: HttpErrorResponse) => {
      if (error.status === 200) {
        // Si on reçoit un statut 200 même dans l'erreur
        return of(true);
      }
      console.error('Server check failed:', error);
      return of(false);
    })
  );
}



  // Exemple pour récupérer l'email
 private decodeToken<T extends object>(token: string): T | null {
    try {
      return JSON.parse(atob(token.split('.')[1])) as T;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }


 private clearToken(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
   getUserEmail(token: string): string | null {
     try {
       console.log('Decoding token:', token);
       const decodedToken = this.decodeToken<{ sub: string }>(token);
       console.log('Decoded token:', decodedToken);
       if (decodedToken && decodedToken.sub) {
         return decodedToken.sub;
       } else {
         console.error('Email not found in decoded token');
         return null;
       }
     } catch (error) {
       console.error('Error retrieving user email:', error);
       return null;
     }
   }

resetPassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
  const resetData: PasswordResetRequest = {
    email,
    oldPassword,
    newPassword
  };

  return this.http.post(`${this.apiUrl}/auth/reset-password`, resetData)
    .pipe(
      tap(() => {
        // Déconnexion optionnelle après le changement de mot de passe
        this.logout();
      }),
      catchError(error => {
        console.error('Erreur lors de la réinitialisation du mot de passe', error);
        throw error;
      })
    );
}
}
