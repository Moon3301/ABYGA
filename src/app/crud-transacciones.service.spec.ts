import { TestBed } from '@angular/core/testing';

import { CrudTransaccionesService } from './crud-transacciones.service';

describe('CrudTransaccionesService', () => {
  let service: CrudTransaccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudTransaccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
