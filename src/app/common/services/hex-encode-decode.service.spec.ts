import { TestBed } from '@angular/core/testing';

import { HexEncodeDecodeService } from './hex-encode-decode.service';

describe('HexEncodeDecodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HexEncodeDecodeService = TestBed.get(HexEncodeDecodeService);
    expect(service).toBeTruthy();
  });
});
