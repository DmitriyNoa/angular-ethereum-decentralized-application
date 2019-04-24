import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroReviewFormComponent } from './hero-review-form.component';

describe('HeroReviewFormComponent', () => {
  let component: HeroReviewFormComponent;
  let fixture: ComponentFixture<HeroReviewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroReviewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroReviewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
