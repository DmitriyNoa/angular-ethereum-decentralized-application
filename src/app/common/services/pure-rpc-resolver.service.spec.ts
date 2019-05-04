import { TestBed } from '@angular/core/testing';

import { PureRpcResolverService } from './pure-rpc-resolver.service';

describe('PureRpcResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PureRpcResolverService = TestBed.get(PureRpcResolverService);
    expect(service).toBeTruthy();
  });
});
