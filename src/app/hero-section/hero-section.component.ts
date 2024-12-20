import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero-section',
    imports: [RouterLink, CommonModule],
    template: `
    <div class="relative overflow-hidden bg-white">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" [ngStyle]="backgroundPattern"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="pt-20 pb-24 text-center">
          <!-- Main Heading -->
          <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-8 animate-fade-in">
            Learn a language
          </h1>

          <!-- Subheading -->
          <p class="text-2xl md:text-3xl font-medium text-gray-600 mb-6">
            Memrise is
            <span class="text-yellow-500 font-semibold">authentic</span>,
            <span class="text-yellow-500 font-semibold">useful</span> &
            <span class="text-yellow-500 font-semibold">personalised</span>
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <a routerLink="/start-learning"
               class="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full text-lg font-semibold transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg"
                   class="h-5 w-5"
                   fill="none"
                   viewBox="0 0 24 24"
                   stroke="currentColor">
                <path stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
              </svg>
              Start Learning Now
            </a>
            <a routerLink="/courses"
               class="flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full text-lg font-semibold border-2 border-gray-200 hover:border-yellow-500 transition-colors">
              Explore Courses
            </a>
          </div>

          <!-- Trust Indicators -->
          <div class="flex flex-wrap justify-center gap-8 text-gray-600">
            <div class="flex items-center gap-2" *ngFor="let stat of trustStats">
              <span class="font-semibold">{{ stat.value }}</span> {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
    styles: [`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }
  `]
})
export class HeroSectionComponent {
  backgroundPattern = {
    'backgroundImage': 'radial-gradient(circle at 1px 1px, #fbbf24 1px, transparent 0)',
    'backgroundSize': '40px 40px'
  };

  trustStats = [
    { value: '50M+', label: 'Learners' },
    { value: '30+', label: 'Languages' },
    { value: '4.8★', label: 'App Store Rating' }
  ];
}
