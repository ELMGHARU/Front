import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  template: `
    <section class="bg-[#2B3648] pt-32 pb-20 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="text-white">
          <h1 class="text-5xl lg:text-6xl font-bold mb-6">
            Language learning that
            <div class="relative">
              makes you
              <img src="assets/yellow-underline.svg" class="absolute -bottom-2 left-0 w-48" alt="">
            </div>
            <span class="block mt-2">feel at home</span>
          </h1>

          <p class="text-xl text-gray-300 mb-8">
            Using learning techniques developed by Oxford neuroscientists, Memrise gets you feeling and sounding like a native.
          </p>

          <p class="text-lg mb-2">*Perfect for anyone who wants to belong—</p>
          <p class="text-gray-300 mb-8">
            World Explorers | Lifelong Learners | Adventurers in Love
          </p>

          <a routerLink="/get-started" class="inline-block bg-yellow-400 hover:bg-yellow-500 text-black px-8 py-4 rounded-full font-medium text-lg transition-colors">
            Get Started
          </a>
        </div>

        <!-- Right Content - Phone Mockups -->
        <div class="hidden lg:flex justify-center gap-6 relative">
          <div class="w-64">
            <img src="assets/app-screen-1.png" alt="Memrise app" class="rounded-3xl shadow-lg">
          </div>
          <div class="w-64 mt-12">
            <img src="assets/app-screen-2.png" alt="Memrise app" class="rounded-3xl shadow-lg">
          </div>
        </div>
      </div>
    </section>
  `
})
export class HeroComponent {}
