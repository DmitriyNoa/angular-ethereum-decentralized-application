import { TestBed } from '@angular/core/testing';

import { TronwebService } from './tronweb.service';

describe('TronwebService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TronwebService = TestBed.get(TronwebService);
    expect(service).toBeTruthy();
  });
});
