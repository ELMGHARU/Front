import { Component } from '@angular/core';
import { AuthService, AuthenticationRequest, AuthenticationResponse } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  newPassword: string = '';
  oldPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  isResetMode: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isResetMode) {
      this.handlePasswordReset();
    } else {
      this.handleLogin();
    }
  }

  private handleLogin() {
    const loginData: AuthenticationRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe({
      next: (response: AuthenticationResponse) => {
        console.log('Connexion réussie');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Erreur de connexion:', error);
        if (error.status === 403) {
          this.errorMessage = 'Email ou mot de passe incorrect';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la connexion';
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private handlePasswordReset() {
    this.authService.resetPassword(this.email, this.oldPassword, this.newPassword).subscribe({
      next: () => {
        console.log('Mot de passe réinitialisé avec succès');
        this.isResetMode = false;
        this.errorMessage = 'Mot de passe modifié avec succès. Veuillez vous connecter.';
        this.clearForm();
      },
      error: (error) => {
        console.error('Erreur lors de la réinitialisation du mot de passe:', error);
        if (error.status === 403) {
          this.errorMessage = 'Ancien mot de passe incorrect';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la réinitialisation du mot de passe';
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.email) {
      this.errorMessage = 'Veuillez entrer votre email';
      return false;
    }

    if (!this.authService.validateEmail(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return false;
    }

    if (this.isResetMode) {
      if (!this.oldPassword || !this.newPassword) {
        this.errorMessage = 'Veuillez remplir tous les champs';
        return false;
      }
      if (!this.authService.validatePassword(this.newPassword)) {
        this.errorMessage = 'Le nouveau mot de passe doit contenir au moins 6 caractères';
        return false;
      }
    } else {
      if (!this.password) {
        this.errorMessage = 'Veuillez entrer votre mot de passe';
        return false;
      }
    }

    return true;
  }

  toggleResetMode() {
    this.isResetMode = !this.isResetMode;
    this.errorMessage = '';
    this.clearForm();
  }

  private clearForm() {
    this.password = '';
    this.oldPassword = '';
    this.newPassword = '';
  }
}
