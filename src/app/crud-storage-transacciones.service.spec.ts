import { TestBed } from '@angular/core/testing';

import { CrudStorageTransaccionesService } from './crud-storage-transacciones.service';

describe('CrudStorageTransaccionesService', () => {
  let service: CrudStorageTransaccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudStorageTransaccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
