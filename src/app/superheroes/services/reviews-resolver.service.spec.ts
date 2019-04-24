import { TestBed } from '@angular/core/testing';

import { ReviewsResolverService } from './reviews-resolver.service';

describe('ReviewsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReviewsResolverService = TestBed.get(ReviewsResolverService);
    expect(service).toBeTruthy();
  });
});
