import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CuentaUsuarioPageRoutingModule } from './cuenta-usuario-routing.module';

import { CuentaUsuarioPage } from './cuenta-usuario.page';

import {MatButtonModule} from '@angular/material/button';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { register } from 'swiper/element/bundle';

register();



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CuentaUsuarioPageRoutingModule,
    MatButtonModule,
    
  ],
  declarations: [CuentaUsuarioPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CuentaUsuarioPageModule {}
