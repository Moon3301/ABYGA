import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentosPageRoutingModule } from './documentos-routing.module';

import { DocumentosPage } from './documentos.page';
import {MatIconModule} from '@angular/material/icon';
import { KeysPipe } from './documentos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentosPageRoutingModule,
    MatIconModule
  ],
  declarations: [DocumentosPage, KeysPipe]
})
export class DocumentosPageModule {}
