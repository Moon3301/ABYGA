import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTransaccionPageRoutingModule } from './agregar-transaccion-routing.module';

import { AgregarTransaccionPage } from './agregar-transaccion.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTransaccionPageRoutingModule,
    FontAwesomeModule
    
  ],
  declarations: [AgregarTransaccionPage]
})
export class AgregarTransaccionPageModule {}
