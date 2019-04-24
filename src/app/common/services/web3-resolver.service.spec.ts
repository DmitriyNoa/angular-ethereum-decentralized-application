import { TestBed } from '@angular/core/testing';

import { Web3ResolverService } from './web3-resolver.service';

describe('Web3ResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Web3ResolverService = TestBed.get(Web3ResolverService);
    expect(service).toBeTruthy();
  });
});
