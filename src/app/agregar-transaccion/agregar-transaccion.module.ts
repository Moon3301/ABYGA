import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarTransaccionPageRoutingModule } from './agregar-transaccion-routing.module';

import { AgregarTransaccionPage } from './agregar-transaccion.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {MatTabsModule} from '@angular/material/tabs';

import {MatSelectModule} from '@angular/material/select';

import {MatInputModule} from '@angular/material/input';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTransaccionPageRoutingModule,
    FontAwesomeModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule
    
  ],
  declarations: [AgregarTransaccionPage]
})
export class AgregarTransaccionPageModule {}
