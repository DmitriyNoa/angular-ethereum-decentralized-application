import {Component, Input, OnInit} from '@angular/core';
import {SuperheroesService} from '../../services/superheroes.service';
import {Superhero} from '../../interfaces/Hero';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

interface Review {
  author?: string;
  mark?: number;
  text?: string;
}

@Component({
  selector: 'app-hero-review-form',
  templateUrl: './hero-review-form.component.html',
  styleUrls: ['./hero-review-form.component.css']
})
export class HeroReviewFormComponent implements OnInit {

  public marks: number[] = [1, 2, 3, 4, 5];

  @Input()
  public hero: Superhero;

  public review: Review = {};

  constructor(private superheroService: SuperheroesService, private snackBar: MatSnackBar, private router: Router) { }

  addSuperheroReview() {
    this.superheroService.reviewSuperHero(this.hero.id, this.review.mark, this.review.text).then(() => {
      this.snackBar.open('Review added', '', {
        duration: 2000,
      });
    });
  }

  ngOnInit() {
  }

}
