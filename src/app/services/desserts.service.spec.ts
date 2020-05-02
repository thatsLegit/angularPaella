import { TestBed } from '@angular/core/testing';

import { DessertsService } from './desserts.service';

describe('DessertsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DessertsService = TestBed.get(DessertsService);
    expect(service).toBeTruthy();
  });
});
