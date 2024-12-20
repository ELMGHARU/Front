import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Assurez-vous que FormsModule est bien importé
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';

// Importez votre module de routing
import { AppRoutingModule } from './app-routing.module'; // Ajoutez cette ligne

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckCreationDashboardComponent } from './components/deck-creation-dashboard/deck-creation-dashboard.component';
import { SettingsComponent } from './components/setting/setting.component'; // Ajoutez ce composant si nécessaire
import { DeckStatisticsComponent } from './deck-statistics/deck-statistics.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import {HelpPageComponent} from './help-page/help-page.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';


// Services
import { AuthService } from '../auth.service';
import { DeckService } from '../deck.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingPageComponent,
    DashboardComponent,
    DashboardAdminComponent,
    DeckCreationDashboardComponent,
    SettingsComponent,
    DeckStatisticsComponent,
    PrivacyPolicyComponent,
    ContactPageComponent,
    HelpPageComponent,
    HttpClientModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Ajoutez ici
    FormsModule,      // Assurez-vous que FormsModule est bien importé ici
    RouterModule,
    CommonModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    HttpClientModule,
  ],
  providers: [AuthService, DeckService],
  bootstrap: [AppComponent],
})
export class AppModule {}
