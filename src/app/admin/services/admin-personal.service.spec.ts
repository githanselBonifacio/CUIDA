import { TestBed } from '@angular/core/testing';

import { AdminPersonalService } from './admin-personal.service';

describe('AdminPersonalService', () => {
  let service: AdminPersonalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminPersonalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
