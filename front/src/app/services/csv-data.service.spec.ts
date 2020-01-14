import { TestBed } from '@angular/core/testing';

import { CsvDataService } from './csv-data.service';

describe('CsvDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsvDataService = TestBed.get(CsvDataService);
    expect(service).toBeTruthy();
  });
});
