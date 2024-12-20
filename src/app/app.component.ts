import { Component } from '@angular/core';
import { SocialLinksComponent } from './social-links/social-links.component';
import { HeroSectionComponent } from "./hero-section/hero-section.component";
import { RouterOutlet } from "@angular/router";
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { FooterLinksComponent } from './footer-links/footer-links.component';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {LoginComponent} from "./login/login.component";
// @ts-ignore
import {DashboardComponent} from "./dashboard/dashboard.component";
import { DeckCreationComponent } from './deck-creation/deck-creation.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    SocialLinksComponent,
    HeroSectionComponent,
    RouterOutlet,
    LanguageSwitcherComponent,
    FooterLinksComponent,
    LandingPageComponent,
    LoginComponent,
    DashboardComponent,
    DeckCreationComponent
  ]
})
export class AppComponent {
  title = 'Memrise - Learn a language';
}
