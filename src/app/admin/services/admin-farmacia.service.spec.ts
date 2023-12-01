import { TestBed } from '@angular/core/testing';

import { AdminFarmaciaService } from './admin-farmacia.service';

describe('AdminFarmaciaService', () => {
  let service: AdminFarmaciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFarmaciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
