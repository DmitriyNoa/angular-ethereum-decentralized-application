import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';
import {Review} from '../hero-review-form/hero-review-form.component';
import {SuperheroesService} from '../../services/superheroes.service';
@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.css']
})
export class SuperheroDetailsComponent implements OnInit {

  public hero: Superhero;
  public superheroReviews: Review[];

  // [1, 'Superman', 'https://someavatar.com/avatar', 'DC', 'Has many superpowers']
  constructor(private route: ActivatedRoute, private superheroService: SuperheroesService) {
    const [id, name, avatar, category, description] = this.route.snapshot.data.RPCData;
    this.hero = {
      id, name, avatar, category, description
    };
    this.superheroReviews = this.route.snapshot.data.reviews;
    console.log(this.superheroReviews );
    this.superheroService.setContractABI(this.route.snapshot.data.abi);
  }

  ngOnInit() {
      this.superheroService.subscribeToEvent('NewReview', (data) => {
        const review = {
          author: data.args.author,
          mark: data.args.mark,
          text: data.args.text,
          isOpen: true
        };
        setTimeout(() => {
          review.isOpen = false;
        }, 500);
        this.superheroReviews.unshift(review);
      });
  }

}
