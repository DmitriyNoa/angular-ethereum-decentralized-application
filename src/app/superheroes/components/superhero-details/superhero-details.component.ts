import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';
import {Review} from '../hero-review-form/hero-review-form.component';
import {SuperheroesService} from '../../services/superheroes.service';
@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.css']
})
export class SuperheroDetailsComponent  {

  public hero: Superhero;
  public superheroReviews: Review[];

  constructor(private route: ActivatedRoute, private superheroService: SuperheroesService) {
    const [id, name, avatar, category, description] = this.route.snapshot.data.RPCData;
    this.hero = {
      id, name, avatar, category, description
    };
    this.superheroReviews = this.route.snapshot.data.reviews;
    this.superheroService.subscribeToEvent('NewReview', (event) => {
      const [author, mark, text] = event.returnValues;
      const review = {
        author,
        mark,
        text,
        isOpen: true
      };
      setTimeout(() => {
        review.isOpen = false;
      }, 500);
      this.superheroReviews.unshift(review);
    });
  }

}
