import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuopcionesPageRoutingModule } from './menuopciones-routing.module';

import { MenuopcionesPage } from './menuopciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuopcionesPageRoutingModule
  ],
  declarations: [MenuopcionesPage]
})
export class MenuopcionesPageModule {}
