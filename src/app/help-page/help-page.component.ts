import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="help-container">
      <h1 class="help-title">Aide</h1>
      <div class="help-section">
        <h2>Foire aux questions (FAQ)</h2>
        <div class="faq-item">
          <h3>Comment puis-je créer un compte ?</h3>
          <p>Pour créer un compte, cliquez sur le bouton "S'inscrire" dans la page d'accueil et remplissez le formulaire d'inscription.</p>
        </div>
        <div class="faq-item">
          <h3>Comment puis-je réinitialiser mon mot de passe ?</h3>
          <p>Pour réinitialiser votre mot de passe, cliquez sur le lien "Mot de passe oublié" dans la page de connexion et suivez les instructions.</p>
        </div>
        <div class="faq-item">
          <h3>Comment puis-je modifier mes informations de profil ?</h3>
          <p>Pour modifier vos informations de profil, accédez à la page "Mon compte" et cliquez sur le bouton "Modifier le profil". Mettez à jour vos informations et enregistrez les modifications.</p>
        </div>
        <div class="faq-item">
          <h3>Comment puis-je contacter le support technique ?</h3>
          <p>Pour contacter notre équipe de support technique, vous pouvez nous envoyer un e-mail à support&#64;example.com ou utiliser le formulaire de contact disponible sur notre site web.</p>
        </div>
      </div>
      <div class="help-section">
        <h2>Guides d'utilisation</h2>
        <ul>
          <li><a href="#">Guide de démarrage rapide</a></li>
          <li><a href="#">Utilisation avancée de l'application</a></li>
          <li><a href="#">Foire aux questions (FAQ) complète</a></li>
          <li><a href="#">Conseils et astuces pour une utilisation optimale</a></li>
        </ul>
      </div>
      <div class="help-section">
        <h2>Nous contacter</h2>
        <p>Si vous avez besoin d'une assistance supplémentaire, n'hésitez pas à nous contacter :</p>
        <ul>
          <li>E-mail : <a href="mailto:support&#64;example.com">support&#64;example.com</a></li>
          <li>Téléphone : +1 (123) 456-7890</li>
          <li>Adresse : 123 Rue Principale, Ville, Marrakech</li>
          <li>Heures d'ouverture : du lundi au vendredi, de 9h00 à 17h00</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
/* styles.css */

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  background-color: #f7f7f7;
  margin: 0;
  padding: 0;
}

h1, h2, h3, h4, h5, h6 {
  color: #007bff;
}

a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #0056b3;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-input {
  display: block;
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-input:focus {
  outline: none;
  border-color: #007bff;
}
  `]
})
export class HelpPageComponent {}
