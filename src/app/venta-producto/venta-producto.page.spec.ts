import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentaProductoPage } from './venta-producto.page';

describe('VentaProductoPage', () => {
  let component: VentaProductoPage;
  let fixture: ComponentFixture<VentaProductoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(VentaProductoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
