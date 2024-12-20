import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterLink],
  providers: [AuthService],
  template: `
   <div class="layout-container">
       <!-- Barre de navigation à gauche -->
       <nav class="sidebar">
         <img src="https://i.postimg.cc/Pf25nnXz/Custom-dimensions-192x69-px.png" alt="Memoria Logo" class="logo" />
         <h2 class="nav-title">Menu Principal</h2>
         <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
           <i class="fas fa-home"></i>
           <span>Tableau de bord</span>
         </a>
         <a routerLink="/decks" routerLinkActive="active" class="nav-item">
           <i class="fas fa-layer-group"></i>
           <span>Mes paquets</span>
         </a>
         <a routerLink="/statistics" routerLinkActive="active" class="nav-item">
           <i class="fas fa-chart-bar"></i>
           <span>Statistiques</span>
         </a>
         <a routerLink="/library" routerLinkActive="active" class="nav-item">
           <i class="fas fa-book"></i>
           <span>Bibliothèque</span>
         </a>
         <a routerLink="/setting" routerLinkActive="active" class="nav-item">
           <i class="fas fa-cog"></i>
           <span>Paramètres</span>
         </a>

         <button class="logout-btn" (click)="logout()">
           <i class="fas fa-door-open"></i>
           <span>Déconnexion</span>
         </button>
       </nav>

        <!-- Contenu principal -->
        <div class="main-content">
          <div class="settings-container">
            <h2>Paramètres</h2>

            <div class="settings-sections">
              <!-- Compte -->
              <section class="settings-section">
                <div class="section-header">
                  <h3>Compte</h3>
                </div>
                <div class="section-content">
                  <div class="info-row">
                    <span class="icon">📧</span>
                    <span>{{ userEmail }}</span>
                  </div>
                </div>
              </section>

              <!-- Session -->
              <section class="settings-section">
                <div class="section-header">
                  <h3>Session</h3>
                </div>
                <div class="section-content">
                  <div class="action-row" (click)="logout()">
                    <span class="icon">🚪</span>
                    <span>Déconnexion</span>
                  </div>
                </div>
              </section>

              <!-- Légal -->
              <section class="settings-section">
                <div class="section-header">
                  <h3>Légal</h3>
                </div>
                <div class="section-content">
                  <div class="action-row" (click)="openPrivacyPolicy()">
                    <span class="icon">📜</span>
                    <span>Politique de confidentialité</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    `,
    styles: [`
      /* Layout de base */
      .layout-container {
        display: flex;
        min-height: 100vh;
        background-color: #ffffff;
      }

      /* Nouvelle navbar */
      .sidebar {
        width: 260px;
        background-color: #2D2A4A;
        padding: 2rem;
        height: 100vh;
        position: fixed;
      }

      .logo {
        max-width: 100%;
        margin-bottom: 2rem;
      }

      .nav-title {
        color: #A9A7C1;
        font-size: 12px;
        text-transform: uppercase;
        margin-bottom: 1rem;
        font-weight: 500;
      }

      .nav-item {
        display: flex;
        align-items: center;
        padding: 0.75rem;
        color: #A9A7C1;
        text-decoration: none;
        border-radius: 8px;
        margin-bottom: 0.5rem;
        transition: all 0.3s ease;
      }

      .nav-item i {
        width: 20px;
        margin-right: 12px;
      }

      .nav-item:hover {
        background-color: rgba(255, 255, 255, 0.1);
        color: #FFFFFF;
      }

      .nav-item.active {
        background-color: #6C63FF;
        color: white;
      }

      .logout-btn {
        background: linear-gradient(145deg, #FF416C, #FF4B2B);
        color: white;
        border: none;
        border-radius: 8px;
        padding: 0.75rem 1rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 4px rgba(255, 65, 108, 0.2);
        margin-top: auto;
        width: 100%;
      }

      .logout-btn i {
        font-size: 1.1rem;
        transition: transform 0.2s ease;
      }

      .logout-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(255, 65, 108, 0.4);
      }

      .logout-btn:hover i {
        transform: scale(1.2);
        animation: doorOpen 0.5s ease;
      }

      .logout-btn:active {
        transform: scale(0.95);
        box-shadow: 0 2px 4px rgba(255, 65, 108, 0.2);
      }

      @keyframes doorOpen {
        0% {
          transform: scale(1) translateX(0);
        }
        50% {
          transform: scale(1.2) translateX(5px);
        }
        100% {
          transform: scale(1.2) translateX(0);
        }
      }

      /* Contenu principal */
      .main-content {
        flex: 1;
        margin-left: 260px;
        padding: 40px;
        background-color: #ffffff;
        min-height: 100vh;
      }

      .settings-container {
        max-width: 800px;
        margin: 0 auto;
      }

      h2 {
        color: #2D3748;
        margin-bottom: 30px;
        font-size: 24px;
      }

      .settings-sections {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .settings-section {
        background-color: #ffffff;
        border: 1px solid #E2E8F0;
        border-radius: 12px;
        overflow: hidden;
      }

      .section-header {
        padding: 16px 20px;
        border-bottom: 1px solid #E2E8F0;
        background-color: #f8f9fa;
      }

      .section-header h3 {
        color: #2D3748;
        margin: 0;
        font-size: 16px;
        font-weight: 600;
      }

      .section-content {
        padding: 16px 20px;
      }

      .info-row, .action-row {
        display: flex;
        align-items: center;
        gap: 12px;
        color: #4A5568;
        padding: 8px 0;
      }

      .action-row {
        cursor: pointer;
        transition: color 0.3s ease;
      }

      .action-row:hover {
        color: #2D3748;
      }

      .icon {
        font-size: 20px;
      }

      /* Responsive Design */
      @media (max-width: 1024px) {
        .main-content {
          margin-left: 200px;
        }

        .sidebar {
          width: 200px;
        }
      }

      @media (max-width: 768px) {
        .main-content {
          margin-left: 60px;
          padding: 20px;
        }

        .sidebar {
          width: 60px;
        }

        .nav-item span,
        .nav-title,
        .logout-btn span {
          display: none;
        }

        .nav-item i {
          margin-right: 0;
          font-size: 20px;
        }

        .logout-btn {
          padding: 0.75rem;
        }
      }
  `]
})
export class SettingsComponent implements OnInit {
  userEmail: string | null = null;
  isServerOnline = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserEmail();
    this.checkServerStatus();
  }

  private getUserEmail(): void {
    const authToken = this.authService.getToken();
    if (authToken) {
      this.userEmail = this.authService.getUserEmail(authToken);
    } else {
      console.error('Auth token is missing!');
      this.userEmail = null;
      this.router.navigate(['/login']);
    }
  }

  checkServerStatus() {
    this.authService.checkServerStatus().subscribe({
      next: (isOnline) => {
        this.isServerOnline = isOnline;
        if (!isOnline) {
          localStorage.setItem('offlineMode', 'true');
        } else {
          localStorage.removeItem('offlineMode');
        }
      },
      error: () => {
        this.isServerOnline = false;
        localStorage.setItem('offlineMode', 'true');
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  openPrivacyPolicy(): void {
    window.open('/privacy-policy', '_blank');
  }
}
