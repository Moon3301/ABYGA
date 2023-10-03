import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuopcionesPageRoutingModule } from './menuopciones-routing.module';

import { MenuopcionesPage } from './menuopciones.page';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuopcionesPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    NzModalModule 

  ],
  declarations: [MenuopcionesPage]
})
export class MenuopcionesPageModule {}
