import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VentaProductoPage } from './venta-producto.page';

const routes: Routes = [
  {
    path: '',
    component: VentaProductoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VentaProductoPageRoutingModule {}
