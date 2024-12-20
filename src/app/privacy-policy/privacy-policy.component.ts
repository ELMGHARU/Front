import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-privacy-policy',
    imports: [CommonModule,
        RouterModule],
    template: `
    <div class="privacy-container">
      <div class="privacy-content">
        <h1>Politique de Confidentialité</h1>
        <div class="last-update">Dernière mise à jour : 25 novembre 2024</div>

        <!-- Sections -->
        <section id="intro">
          <h2>1. Introduction</h2>
          <div class="section-content">
            <p>Bienvenue sur Memoria. Nous nous engageons à protéger votre vie privée et vos données personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations.</p>
          </div>
        </section>

        <section id="collecte">
          <h2>2. Collecte des Données</h2>
          <div class="section-content">
            <p>Nous collectons les informations suivantes :</p>
            <ul>
              <li>Informations de compte (email, nom d'utilisateur)</li>
              <li>Données de connexion et d'utilisation</li>
              <li>Informations de synchronisation en mode hors ligne</li>
              <li>Préférences utilisateur</li>
            </ul>
          </div>
        </section>

        <section id="utilisation">
          <h2>3. Utilisation des Données</h2>
          <div class="section-content">
            <p>Vos données sont utilisées pour :</p>
            <ul>
              <li>Fournir et maintenir le service</li>
              <li>Améliorer l'expérience utilisateur</li>
              <li>Assurer la synchronisation hors ligne</li>
              <li>Communiquer avec vous concernant votre compte</li>
              <li>Assurer la sécurité du service</li>
            </ul>
          </div>
        </section>

        <div class="privacy-footer">
          <button class="accept-button" (click)="acceptPolicy()">Accepter</button>
          <button class="close-button" routerLink="/dashboard">Fermer</button>
        </div>
      </div>
    </div>
  `,
    styles: [`
    .privacy-container {
      background: linear-gradient(135deg, #3f4c6b, #1d2731);
      color: #fff;
      padding: 40px 20px;
      min-height: 100vh;
      font-family: 'Arial', sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .privacy-content {
      background-color: #2a3743;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 900px;
    }

    h1 {
      color: #f1f1f1;
      font-size: 32px;
      text-align: center;
      margin-bottom: 25px;
    }

    .last-update {
      color: #d1d1d1;
      font-size: 14px;
      text-align: center;
      margin-bottom: 35px;
      opacity: 0.8;
    }

    section {
      margin-bottom: 40px;
      background: rgba(0, 0, 0, 0.1);
      padding: 25px;
      border-radius: 10px;
    }

    h2 {
      color: #fff;
      font-size: 22px;
      margin-bottom: 15px;
      border-bottom: 2px solid #4e6e82;
      padding-bottom: 8px;
    }

    p, ul, li {
      color: #d1d1d1;
      line-height: 1.6;
      margin-bottom: 15px;
    }

    ul {
      list-style-type: none;
      padding-left: 20px;
    }

    li {
      margin-bottom: 12px;
      position: relative;
    }

    li:before {
      content: "•";
      position: absolute;
      left: -20px;
      color: #4e6e82;
    }

    .privacy-footer {
      margin-top: 50px;
      display: flex;
      justify-content: center;
      gap: 20px;
      border-top: 2px solid rgba(255, 255, 255, 0.3);
      padding-top: 25px;
    }

    button {
      padding: 12px 30px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      cursor: pointer;
      transition: all 0.3s ease;
      background-color: #4e6e82;
      color: #fff;
      font-size: 16px;
      min-width: 120px;
    }

    .accept-button:hover {
      background-color: #3a5566;
    }

    .close-button {
      background-color: transparent;
      color: #d1d1d1;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .close-button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    @media (max-width: 768px) {
      .privacy-container {
        padding: 20px;
      }

      .privacy-content {
        padding: 15px;
      }

      .privacy-footer {
        flex-direction: column;
        gap: 10px;
      }

      button {
        width: 100%;
      }
    }
  `]
})
export class PrivacyPolicyComponent {
  acceptPolicy(): void {
    localStorage.setItem('privacy-accepted', 'true');
    this.closePolicy();
  }

  closePolicy(): void {
    window.close();
  }
}
