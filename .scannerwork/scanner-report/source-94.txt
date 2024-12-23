// register.component.ts
import { Component } from '@angular/core';
import { AuthService, RegisterRequest } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  username: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.username, this.password, this.email).subscribe({
      next: () => {
        console.log('Inscription réussie');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur d\'inscription:', error);
        if (error.status === 409) {
          this.errorMessage = 'L\'email est déjà utilisé';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
        }
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  private validateForm(): boolean {
    if (!this.username || !this.email || !this.password) {
      this.errorMessage = 'Veuillez remplir tous les champs';
      return false;
    }

    if (!this.authService.validateUsername(this.username)) {
      this.errorMessage = 'Le nom d\'utilisateur doit contenir entre 3 et 50 caractères';
      return false;
    }

    if (!this.authService.validatePassword(this.password)) {
      this.errorMessage = 'Le mot de passe doit contenir entre 6 et 100 caractères';
      return false;
    }

    if (!this.authService.validateEmail(this.email)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide';
      return false;
    }

    return true;
  }
}
