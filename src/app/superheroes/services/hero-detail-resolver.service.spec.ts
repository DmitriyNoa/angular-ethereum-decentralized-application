import { TestBed } from '@angular/core/testing';

import { HeroDetailResolverService } from './hero-detail-resolver.service';

describe('HeroDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HeroDetailResolverService = TestBed.get(HeroDetailResolverService);
    expect(service).toBeTruthy();
  });
});
