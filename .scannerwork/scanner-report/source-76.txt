import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-landing-page',
    imports: [CommonModule, RouterModule],
    template: `
    <div class="main-container">
      <header class="header">
        <nav class="navbar">
          <div class="nav-brand">
            <img src='https://i.postimg.cc/Pf25nnXz/Custom-dimensions-192x69-px.png' alt='Memoria Logo'/>
          </div>
          <ul class="nav-menu">
            <li *ngFor="let item of categories">
              <a [routerLink]="[item.route]">{{item.name}}</a>
            </li>
          </ul>
          <button class="cta-button" routerLink="/login">Start Learning</button>
        </nav>
      </header>

      <main>
        <section class="hero-section">
          <div class="hero-text">
            <div class="accent-line"></div>
            <h1 class="hero-title">Master any subject<br>with smart flashcards</h1>
            <p class="hero-description">
              Using spaced repetition and active recall techniques,
              Memoria helps you learn effectively.
            </p>
            <div class="user-types">
              <span class="tag">Students</span>
              <span class="tag">Professionals</span>
              <span class="tag">Lifelong Learners</span>
            </div>
            <button class="primary-button" routerLink="/login">Get Started</button>
          </div>
          <div class="hero-images">
            <img src='https://th.bing.com/th/id/OIP.5HwbOwybvfeP6shamWF1ewHaHa?rs=1&pid=ImgDetMain' alt='App Preview'/>
          </div>
        </section>

        <section class="company-section">
          <div class="company-content">
            <div class="history-block">
              <h2 class="section-title">Our Story</h2>
              <div class="timeline">
                <div *ngFor="let milestone of companyHistory" class="timeline-item">
                  <span class="year">{{milestone.year}}</span>
                  <p>{{milestone.description}}</p>
                </div>
              </div>
            </div>

            <div class="mission-block">
              <h2 class="section-title">Our Mission</h2>
              <p class="mission-text">At Memoria, we believe that effective learning should be accessible to everyone. Our mission is to revolutionize education through intelligent technology and proven learning methods.</p>
              <div class="values-grid">
                <div *ngFor="let value of companyValues" class="value-item">
                  <i [class]="value.icon"></i>
                  <h3>{{value.title}}</h3>
                  <p>{{value.text}}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="features-section">
          <h2 class="section-title">Smart Learning Features</h2>
          <ul class="feature-list">
            <li *ngFor="let feature of features" class="feature-item">
              <i [class]="feature.icon"></i>
              <span>{{feature.text}}</span>
            </li>
          </ul>
        </section>

        <section class="steps-section">
          <h2 class="section-title">How It Works</h2>
          <div class="steps-grid">
            <div *ngFor="let step of howItWorksSteps; let i = index" class="step-card">
              <span class="step-number">{{i + 1}}</span>
              <p class="step-text">{{step}}</p>
            </div>
          </div>
        </section>
        <section class="team-section">
          <h2 class="section-title">Meet Our Team</h2>
          <div class="team-grid">
            <div *ngFor="let member of teamMembers" class="team-card">
              <img [src]="member.photo" alt="{{member.name}}" class="team-photo"/>
              <h3 class="team-name">{{member.name}}</h3>
              <p class="team-role">{{member.role}}</p>
              <p class="team-bio">{{member.bio}}</p>
            </div>
          </div>
        </section>
      </main>

      <footer class="footer">
        <div class="footer-grid">
          <div class="brand-section">
            <img src='https://i.postimg.cc/Pf25nnXz/Custom-dimensions-192x69-px.png' alt='Memoria Logo'/>
            <p>Make learning easier with smart flashcards.</p>
            <div class="social-icons">
              <a *ngFor="let social of socialLinks" [href]="social.url">
                <i [class]="social.icon"></i>
              </a>
            </div>
          </div>

          <div class="footer-links" *ngFor="let section of footerSections">
            <h3>{{section.title}}</h3>
            <ul>
              <li *ngFor="let link of section.links">
                <a [routerLink]="link.route">{{link.name}}</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>&copy; {{currentYear}} Memoria. All rights reserved.</p>
          <div class="legal-links">
            <a routerLink="/privacy">Privacy</a>
            <a routerLink="/terms">Terms</a>
          </div>
        </div>

        <div class="footer-section">

            </div>
            </footer>


  `,
    styles: [`
    :root {
      --primary: #4A90E2;
      --secondary: #6c757d;
      --dark: #000;
      --light: #f8f9fa;
      --white: #fff;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .main-container {
      font-family: 'Inter', sans-serif;
      color: var(--dark);
    }

    /* Header & Navigation */
    .header {
      position: fixed;
      width: 100%;
      background: var(--white);
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      z-index: 100;
    }

    .navbar {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand img {
      height: 40px;
    }

 /* Personnalisation des liens */
.nav-menu a {
  text-decoration: none; /* Enlève le soulignement des liens */
  color: black; /* Définit la couleur du texte en noir */
  font-weight: 500;
  transition: color 0.3s; /* Ajoute une transition douce pour la couleur au survol */
}


 /* Au survol */
 .nav-menu a:hover {
    color: #000; /* Une nuance plus claire de noir ou gris foncé au survol (optionnel) */
  }
 /* Liens visités */
.nav-menu a:visited {
  color: black; /* Maintient la couleur noire pour les liens visités */
}

 /* Liens actifs (quand l'utilisateur est sur la page du lien) */
nav-menu a:active {
  color: black; /* Reste en noir quand le lien est actif */
}

    .cta-button {
      background: var(--primary);
      color: var(--white);
      padding: 0.8rem 1.5rem;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background 0.3s;
    }

    .cta-button:hover {
      background: #357abd;
    }
.main-container {
  font-family: 'Inter', sans-serif;
}

.header {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
}



.hero-section {
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
}

.footer {
  text-align: center;
  padding: 2rem;
  background: #000;
   color: white;

}
.nav-menu li {
  list-style: none; /* Assurez-vous que les points sont supprimés */
}
    /* Hero Section */
    .hero-section {
      padding: 8rem 2rem 4rem;
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    .accent-line {
      width: 80px;
      height: 4px;
      background: #FFD700;
      margin-bottom: 2rem;
    }

    .hero-title {
      font-size: 3.5rem;
      line-height: 1.2;
      margin-bottom: 1.5rem;
    }

    .hero-description {
      font-size: 1.2rem;
      color: var(--secondary);
      margin-bottom: 2rem;
    }

    .user-types {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .tag {
      padding: 0.5rem 1rem;
      background: var(--light);
      border-radius: 20px;
      font-size: 0.9rem;
    }

    .primary-button {
      background: var(--primary);
      color: var(--white);
      padding: 1rem 2rem;
      border: none;
      border-radius: 5px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .primary-button:hover {
      background: #357abd;
      transform: translateY(-2px);
    }

    .hero-images {
      display: flex;
      justify-content: center;
    }

    .hero-images img {
      width: 100%;
      max-width: 500px;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      transition: transform 0.3s;
    }

    .hero-images img:hover {
      transform: scale(1.02);
    }

    /* Company Section */
    .company-section {
      padding: 6rem 2rem;
      background: var(--light);
    }

    .company-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .history-block {
      margin-bottom: 6rem;
    }

    .section-title {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    .timeline {
      display: grid;
      gap: 2rem;
    }

    .timeline-item {
      display: flex;
      gap: 2rem;
      padding: 1.5rem;
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      transition: transform 0.3s;
    }

    .timeline-item:hover {
      transform: translateY(-5px);
    }

    .timeline-item .year {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--primary);
      min-width: 80px;
    }

    .mission-text {
      text-align: center;
      max-width: 800px;
      margin: 0 auto 3rem;
      font-size: 1.2rem;
      color: var(--secondary);
    }

    .values-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .value-item {
      text-align: center;
      padding: 2rem;
      background: var(--white);
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      transition: transform 0.3s;
    }

    .value-item:hover {
      transform: translateY(-5px);
    }

    .value-item i {
      font-size: 2rem;
      color: var(--primary);
      margin-bottom: 1rem;
    }

    .value-item h3 {
      margin-bottom: 1rem;
    }

    /* Features Section */
    .features-section {
      padding: 6rem 2rem;
      background: var(--white);
    }

    .feature-list {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      list-style: none;

    }

    .feature-item {
      padding: 2rem;
      background: var(--light);
      border-radius: 10px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.3s;
    }

    .feature-item:hover {
      transform: translateY(-5px);
    }

    .feature-item i {
      font-size: 1.5rem;
      color: var(--primary);
    }

    /* Steps Section */
    .steps-section {
      padding: 6rem 2rem;
      background: var(--light);
    }

    .steps-grid {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .step-card {
      background: var(--white);
      padding: 2rem;
      border-radius: 10px;
      position: relative;
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      transition: transform 0.3s;
    }

    .step-card:hover {
      transform: translateY(-5px);
    }

    .step-number {
      position: absolute;
      top: -15px;
      left: -15px;
      width: 40px;
      height: 40px;
      background: var(--primary);
      color: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
    }

    /* Footer */
    /* Footer amélioré */
    .footer {
      background-color: #000;
      color: #fff;
      padding: 4rem 0 0;
    }

    .footer-grid {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: grid;
      grid-template-columns: 2fr repeat(2, 1fr);
      gap: 3rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
      padding-bottom: 3rem;
    }

    .footer-bottom {
      background-color: #000;
      padding: 1.5rem 0;
    }

    .footer-bottom .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    /* Media queries améliorées */
    @media (max-width: 1024px) {
      .hero-section {
        padding: 6rem 1rem;
      }

      .hero-title {
        font-size: 3rem;
      }
    }

    @media (max-width: 768px) {
      .nav-bar {
        padding: 0.8rem;
      }

      .hero-images img {
        max-width: 400px;
      }

      .footer-grid {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .footer-section h3:after {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  .social-icons {
    display: flex;
    justify-content: center; /* Centrer les icônes horizontalement */
    gap: 1.5rem; /* Espacement entre les icônes */
    margin-top: 1rem;
  }

  .social-icons a {
    text-decoration: none; /* Supprimer les soulignements */
    color: var(--black); /* Couleur par défaut des icônes */
    font-size: 1.5rem; /* Taille des icônes */
    transition: color 0.3s; /* Ajouter une transition fluide */
  }



    @media (max-width: 480px) {
      .hero-title {
        font-size: 2rem;
      }

      .timeline-item {
        padding: 1rem;
      }
    }
  .social-icons a {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
      list-style: none; /* Assurez-vous que les points sont supprimés */

  }
.team-section {
  padding: 6rem 2rem;
  background: var(--light);
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.team-card {
  text-align: center;
  padding: 2rem;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
}

.team-card:hover {
  transform: translateY(-5px);
}

.team-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
}

.team-name {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.team-role {
  font-size: 1.2rem;
  color: var(--primary);
  margin-bottom: 1rem;
}

.team-bio {
  font-size: 1rem;
  color: var(--secondary);
  line-height: 1.6;
}
  .social-icons a:hover {
    transform: translateY(-3px);
  }

  /* Couleurs spécifiques pour chaque réseau social */
  .social-icons a:nth-child(1) { /* Facebook */
    background: #1877f2;
    color: white;
  }

  .social-icons a:nth-child(2) { /* Twitter */
    background: #1da1f2;
    color: white;
  }

  .social-icons a:nth-child(3) { /* Instagram */
    background: #e4405f;
    color: white;
  }
   `]
})
  export class LandingPageComponent {
   categories = [
     { name: 'Login', route: '/login' },
     { name: 'Register', route: '/register' }
   ];

   companyHistory = [
     { year: '2020', description: 'Founded in Marrakech as a research project at School Emsi' },
     { year: '2021', description: 'Launched beta version with 10,000 early adopters' },
     { year: '2022', description: 'Secured Series A funding, expanded to 15 countries' },
     { year: '2023', description: 'Reached 1 million users, introduced AI-powered features' }
   ];

   companyValues = [
     { icon: 'fas fa-brain', title: 'Innovation', text: 'Pushing boundaries in educational technology' },
     { icon: 'fas fa-users', title: 'Accessibility', text: 'Making quality education available globally' },
     { icon: 'fas fa-chart-line', title: 'Impact', text: 'Measurable improvement in learning outcomes' }
   ];

   features = [
     { icon: 'fas fa-magic', text: 'AI-Powered Card Creation' },
     { icon: 'fas fa-chart-line', text: 'Progress Tracking' },
     { icon: 'fas fa-clock', text: 'Spaced Repetition' },
     { icon: 'fas fa-brain', text: 'Smart Learning' }
   ];

   howItWorksSteps = [
     'Create or choose flashcard sets',
     'Study with spaced repetition',
     'Track your progress',
     'Master any subject'
   ];
  teamMembers = [
    {
      name: 'Aya ELMGHARI',
      role: 'CEO & Founder',
      bio: 'Aya is the visionary behind Memoria, passionate about revolutionizing education with technology.',
      photo: 'https://i.postimg.cc/gjY8q0p2/Capture-d-cran-2024-11-26-233501.png' // Remplacez par l'URL de la photo réelle
    },
    {
      name: 'Youness Kasside',
      role: 'CTO',
      bio: 'Youness is responsible for the tech innovations at Memoria, always looking for new ways to enhance the user experience.',
      photo: 'https://i.postimg.cc/K8V7SFP0/Capture-d-cran-2024-11-26-233129.png' // Remplacez par l'URL de la photo réelle
    },
    {
      name: 'Hiba Arbel',
      role: 'Lead Designer',
      bio: 'Hiba designs the Memoria experience, ensuring it is both user-friendly and visually appealing.',
      photo: 'https://i.postimg.cc/NfskRdGk/Capture-d-cran-2024-11-26-221149.jpg' // Remplacez par l'URL de la photo réelle
    }
  ];
   socialLinks = [
     { icon: 'fab fa-facebook', url: '#' },
     { icon: 'fab fa-twitter', url: '#' },
     { icon: 'fab fa-instagram', url: '#' }
   ];

   footerSections = [
     {
       title: '',
       links: [

       ]
     },
     {
       title: 'App',
       links: [
         { name: 'About', route: '/about' },
         { name: 'Contact', route: '/contact' },
         { name: 'Help Center', route: '/help-page' }
       ]
     }
   ];

   currentYear = new Date().getFullYear();
  }
