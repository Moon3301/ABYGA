import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VentaProductoPageRoutingModule } from './venta-producto-routing.module';

import { VentaProductoPage } from './venta-producto.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { KeysPipe } from './venta-producto.page';

import {MatButtonModule} from '@angular/material/button';

import {MatBadgeModule} from '@angular/material/badge';

import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { NzModalModule } from 'ng-zorro-antd/modal';

import {MatIconModule} from '@angular/material/icon';

import {MatRippleModule} from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VentaProductoPageRoutingModule,
    FontAwesomeModule,
    MatButtonModule,
    MatBadgeModule,
    NzBadgeModule,
    NzModalModule,
    MatIconModule,
    MatRippleModule
  ],
  declarations: [VentaProductoPage, KeysPipe]
})
export class VentaProductoPageModule {}
