import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarProductoPageRoutingModule } from './agregar-producto-routing.module';

import { AgregarProductoPage } from './agregar-producto.page';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {MatTabsModule} from '@angular/material/tabs';

import {MatSelectModule} from '@angular/material/select';

import {MatInputModule} from '@angular/material/input';

import { NzButtonModule } from 'ng-zorro-antd/button';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { NzBadgeModule } from 'ng-zorro-antd/badge';

import { NzCardModule } from 'ng-zorro-antd/card';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarProductoPageRoutingModule,
    FontAwesomeModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    NzButtonModule,
    MatSlideToggleModule,
    NzBadgeModule,
    NzCardModule

  ],
  declarations: [AgregarProductoPage]
})
export class AgregarProductoPageModule {}
