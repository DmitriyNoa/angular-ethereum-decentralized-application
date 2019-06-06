import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Superhero} from '../../interfaces/Hero';
import {Review} from '../hero-review-form/hero-review-form.component';
import {SuperheroesService} from '../../services/superheroes.service';
import {MatSnackBar} from '@angular/material';
import {environment} from '../../../../environments/environment';
import Web3 from 'web3';
import {WebSocketsService} from '../../../common/services/web-sockets.service';

@Component({
  selector: 'app-superhero-details',
  templateUrl: './superhero-details.component.html',
  styleUrls: ['./superhero-details.component.css']
})
export class SuperheroDetailsComponent {

  public hero: Superhero;
  public superheroReviews: Review[];

  constructor(private route: ActivatedRoute, private superheroService: SuperheroesService, private snackBar: MatSnackBar, private websoket: WebSocketsService) {
    const [id, name, avatar, category, description] = this.route.snapshot.data.RPCData;
    this.hero = {
      id, name, avatar, category, description
    };
    this.superheroReviews = this.route.snapshot.data.reviews;

    this.websoket.socketOpened.subscribe(() => {
      this.websoket.subscribe('NewReview');
    });

    this.websoket.listen((data) => {
      const {author, mark, text} = data;
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

      this.snackBar.open('New review has been added', '', {
        duration: 2000,
      });
    });
  }

}
