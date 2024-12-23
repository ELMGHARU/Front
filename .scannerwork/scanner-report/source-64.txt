import {Component} from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";


@Component({
    selector: 'app-header',
    imports: [
        CommonModule,
        RouterModule
    ],
    template: `
    <header class="fixed top-0 w-full z-50">
      <!-- Top bar -->
      <div class="bg-yellow-400 py-2">
        <div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <!-- Language Switcher -->
          <div class="language-switcher">
            <select class="bg-transparent border-none">
              <option value="en">Select language</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>

          <!-- Login Link -->
          <a routerLink="/login" class="text-sm hover:text-gray-700">Log in</a>
        </div>
      </div>

      <!-- Main Header -->
      <div class="bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <!-- Logo -->
          <a routerLink="/" class="flex-shrink-0">
            <img src="assets/logo_yellow.svg" alt="Memrise" class="h-8">
          </a>

          <!-- Navigation -->
          <nav class="hidden md:flex items-center space-x-8">
            <a routerLink="/languages" class="nav-link">Languages</a>
            <a routerLink="/courses" class="nav-link">Courses</a>
            <a routerLink="/phrasebooks" class="nav-link">Phrasebooks</a>
            <a routerLink="/blog" class="nav-link">Memrise blog</a>
            <a routerLink="/start-learning"
               class="bg-yellow-400 px-6 py-2 rounded-full font-medium hover:bg-yellow-500 transition-colors">
              Start Learning
            </a>
          </nav>

          <!-- Mobile Menu Button -->
          <button class="md:hidden" (click)="toggleMenu()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  `,
    styles: [`
    .nav-link {
      color: #374151;
      font-weight: 500;
      transition: color 0.2s;
    }
    .nav-link:hover {
      color: #fbbf24;
    }
  `]
})
export class HeaderComponent {
  toggleMenu() {
    // Logique du menu mobile ici
  }
}
