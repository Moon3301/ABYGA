import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuopcionesPageRoutingModule } from './menuopciones-routing.module';

import { MenuopcionesPage } from './menuopciones.page';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuopcionesPageRoutingModule,
    MatButtonModule,
    MatIconModule,
    NzModalModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    NzButtonModule,
    FontAwesomeModule
    

  ],
  declarations: [MenuopcionesPage]
})
export class MenuopcionesPageModule {}
