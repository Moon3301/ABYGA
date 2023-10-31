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

import { NzButtonModule } from 'ng-zorro-antd/button';

import { CalendarModule } from 'primeng/calendar';

import { ButtonModule } from 'primeng/button';

import {MatButtonModule} from '@angular/material/button';

import {MatDialogModule} from '@angular/material/dialog';

import { KeysPipe } from './agregar-transaccion.page';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarTransaccionPageRoutingModule,
    FontAwesomeModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    NzButtonModule,
    CalendarModule,
    ButtonModule,
    MatButtonModule,
    MatDialogModule,
    MatSlideToggleModule,
    
    
  ],
  declarations: [AgregarTransaccionPage, KeysPipe]
})
export class AgregarTransaccionPageModule {}
