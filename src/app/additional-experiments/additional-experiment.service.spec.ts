import { TestBed } from '@angular/core/testing';

import { AdditionalExperimentService } from './additional-experiment.service';

describe('AdditionalExperimentService', () => {
  let service: AdditionalExperimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalExperimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
