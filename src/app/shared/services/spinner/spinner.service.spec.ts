import { TestBed } from '@angular/core/testing';

import { SpinnerService } from './spinner.service.service';

describe('SpinnerServiceService', () => {
  let service: SpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpinnerService);
  });

  it('crear servicio', () => {
    expect(service).toBeTruthy();
  });

  it('mostrar spinner', () => {
    service.show();
    service.spinnerObservable.subscribe(resp => {
      expect(resp).toBeTruthy();
    })
  })

  it('ocultar spinner', () => {
    service.hide();
    service.spinnerObservable.subscribe(resp => {
      expect(resp).toBeFalsy();
    })
  })
});
