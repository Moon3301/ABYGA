import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuopcionesPage } from './menuopciones.page';

const routes: Routes = [
  {
    path: '',
    component: MenuopcionesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuopcionesPageRoutingModule {}
