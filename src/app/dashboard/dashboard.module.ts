import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DeckCreationComponent } from './deck-creation/deck-creation.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardComponent
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
