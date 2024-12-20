import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="contact-container">
      <h1 class="contact-title">Contactez-nous</h1>
      <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Nom :</label>
          <input type="text" id="name" formControlName="name" required>
          <div *ngIf="contactForm.get('name')?.invalid && (contactForm.get('name')?.dirty || contactForm.get('name')?.touched)">
            <div *ngIf="contactForm.get('name')?.errors?.['required']">Le nom est requis.</div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">Email :</label>
          <input type="email" id="email" formControlName="email" required>
          <div *ngIf="contactForm.get('email')?.invalid && (contactForm.get('email')?.dirty || contactForm.get('email')?.touched)">
            <div *ngIf="contactForm.get('email')?.errors?.['required']">L'email est requis.</div>
            <div *ngIf="contactForm.get('email')?.errors?.['email']">L'email n'est pas valide.</div>
          </div>
        </div>
        <div class="form-group">
          <label for="message">Message :</label>
          <textarea id="message" formControlName="message" required></textarea>
          <div *ngIf="contactForm.get('message')?.invalid && (contactForm.get('message')?.dirty || contactForm.get('message')?.touched)">
            <div *ngIf="contactForm.get('message')?.errors?.['required']">Le message est requis.</div>
          </div>
        </div>
        <button type="submit" [disabled]="contactForm.invalid">Envoyer</button>
      </form>
    </div>

  `,
  styles: [`
    .contact-container {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
    }

    .contact-title {
      text-align: center;
      margin-bottom: 20px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
    }

    input,
    textarea {
      width: 100%;
      padding: 10px;
      font-size: 16px;
    }

    button {
      padding: 10px 20px;
      font-size: 16px;
      background-color: #007bff;
      color: #fff;
      border: none;
      cursor: pointer;
    }

    button:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `]
})
export class ContactPageComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const { name, email, message } = this.contactForm.value;
      const mailtoLink = `mailto:aya.elmghari2003@gmail.com?subject=Nouveau message de contact&body=${encodeURIComponent(`Nom : ${name}\nE-mail : ${email}\n\n${message}`)}`;
      window.location.href = mailtoLink;
      this.contactForm.reset();
    }
  }
}
