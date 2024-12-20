import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeckCreationDashboardComponent } from './components/deck-creation-dashboard/deck-creation-dashboard.component';
import { SettingsComponent } from './components/setting/setting.component';
import { NewDeckModalComponent } from './components/new-deck-modal/new-deck-modal.component';
import { PracticeComponent } from './practice/practice.component';
import { AddCardComponent } from './add-card/add-card.component';
import { LibraryComponent } from './library/library.component';
import { DeckCreationComponent } from './deck-creation/deck-creation.component';
import { DeckListComponent } from './deck-list/deck-list.component';
import { DeckStatisticsComponent } from './deck-statistics/deck-statistics.component';
import { AuthGuard } from './auth.guard';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component'
import { ContactPageComponent } from './contact-page/contact-page.component';
import {HelpPageComponent} from './help-page/help-page.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: LandingPageComponent },
  { path: 'contact', component: ContactPageComponent },
 { path: 'help-page', component: HelpPageComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
   {
      path: 'admin-dashboard',
      component: DashboardAdminComponent
    },
  {
    path: 'decks',
    component: DeckCreationDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'library',
    component: LibraryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'setting',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new-deck',
    component: NewDeckModalComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-card/:deckId',
    component: AddCardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'practice',
    component: PracticeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'deck-creation',
    component: DeckCreationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'deck-list',
    component: DeckListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'statistics',
    component: DeckStatisticsComponent,
    canActivate: [AuthGuard]
  },
{ path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
