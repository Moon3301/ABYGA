import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialTransaccionesPageRoutingModule } from './historial-transacciones-routing.module';

import { HistorialTransaccionesPage } from './historial-transacciones.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialTransaccionesPageRoutingModule,
    FontAwesomeModule
  ],
  declarations: [HistorialTransaccionesPage]
})
export class HistorialTransaccionesPageModule {}
