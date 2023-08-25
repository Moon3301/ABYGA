import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import {MatTabsModule} from '@angular/material/tabs';

import { HomePageRoutingModule } from './home-routing.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NgChartsModule } from 'ng2-charts';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    MatTabsModule,
    FontAwesomeModule,
    NgChartsModule

  ],
  declarations: [HomePage]
})
export class HomePageModule {}
