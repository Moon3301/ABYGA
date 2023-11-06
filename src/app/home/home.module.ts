import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {MatTabsModule} from '@angular/material/tabs';

import { HomePageRoutingModule } from './home-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgChartsModule } from 'ng2-charts';

import { NzButtonModule } from 'ng-zorro-antd/button';

import {MatButtonModule} from '@angular/material/button';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { register } from 'swiper/element/bundle';

import {MatIconModule} from '@angular/material/icon';

import { NzCardModule } from 'ng-zorro-antd/card';

import { NzModalModule } from 'ng-zorro-antd/modal';

import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

register();

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatTabsModule,
    FontAwesomeModule,
    NgChartsModule,
    NzButtonModule,
    MatButtonModule,
    MatIconModule,
    NzCardModule,
    NzModalModule,
    MatSlideToggleModule,
    MatBottomSheetModule,
    


  ],
  declarations: [HomePage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePageModule {}
