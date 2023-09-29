import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuopcionesPage } from './menuopciones.page';

describe('MenuopcionesPage', () => {
  let component: MenuopcionesPage;
  let fixture: ComponentFixture<MenuopcionesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MenuopcionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
