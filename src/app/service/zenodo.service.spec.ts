import { TestBed } from '@angular/core/testing';

import { ZenodoService } from './zenodo.service';

describe('ZenodoService', () => {
  let service: ZenodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZenodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});