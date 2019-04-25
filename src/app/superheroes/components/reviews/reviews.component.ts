import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../hero-review-form/hero-review-form.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        opacity: 1,
        backgroundColor: 'yellow',
      })),
      state('closed', style({
        opacity: 1,
        backgroundColor: 'white'
      })),
      transition('open => closed', [
        animate('1s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class ReviewsComponent implements OnInit {

  @Input() reviews: Review[];

  constructor() {
  }

  ngOnInit() {
  }

}
