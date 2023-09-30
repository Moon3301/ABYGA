import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialTransaccionesPage } from './historial-transacciones.page';

describe('HistorialTransaccionesPage', () => {
  let component: HistorialTransaccionesPage;
  let fixture: ComponentFixture<HistorialTransaccionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistorialTransaccionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
