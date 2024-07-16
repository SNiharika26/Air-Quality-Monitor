import { TestBed } from '@angular/core/testing';

import { AirPollutionService } from './air-pollution.service';

describe('AirPollutionService', () => {
  let service: AirPollutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AirPollutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
