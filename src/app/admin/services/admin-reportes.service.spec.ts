import { TestBed } from '@angular/core/testing';

import { AdminReportesServiceService } from './admin-reportes.service';

describe('AdminReportesServiceService', () => {
  let service: AdminReportesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminReportesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
