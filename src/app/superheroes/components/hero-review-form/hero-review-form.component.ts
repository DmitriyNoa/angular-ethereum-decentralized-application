import {Component, Input, OnInit} from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {Superhero} from '../../interfaces/Hero';
import {MatSnackBar} from '@angular/material';
import {Web3Service} from '../../../common/services/web3.service';

export interface Review {
  mark?: number;
  text?: string;
  author?: string;
  isOpen?: boolean;
}

@Component({
  selector: 'app-hero-review-form',
  templateUrl: './hero-review-form.component.html',
  styleUrls: ['./hero-review-form.component.css']
})
export class HeroReviewFormComponent{

  public marks: number[] = [1, 2, 3, 4, 5];

  @Input()
  public hero: Superhero;

  public review: Review = {};

  constructor(private superheroService: SuperheroesService, private snackBar: MatSnackBar) {
  }

  addSuperheroReview() {
    this.superheroService.reviewSuperHero(this.hero.id, this.review.mark, this.review.text).then(() => {
      this.snackBar.open('You review has been sent', '', {
        duration: 2000,
      });
    });
  }

}
