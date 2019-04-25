import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperheroesListComponent } from './components/superheroes-list/superheroes-list.component';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule, MatSnackBarModule, MatToolbarModule
} from '@angular/material';
import { AddSuperheroComponent } from './components/add-superhero/add-superhero.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import { SuperheroDetailsComponent } from './components/superhero-details/superhero-details.component';
import { HeroReviewFormComponent } from './components/hero-review-form/hero-review-form.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import {SuperheroesService} from './services/superheroes.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HeroesListPipe} from './services/heroes-list-pipe.pipe';

@NgModule({
  declarations: [HeroesListPipe, SuperheroesListComponent,  AddSuperheroComponent, SuperheroDetailsComponent, HeroReviewFormComponent, ReviewsComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatSnackBarModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule
  ],
  providers: [SuperheroesService]
})
export class SuperheroesModule { }
