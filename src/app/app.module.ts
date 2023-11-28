import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from 'ng2-charts';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicStorageModule } from '@ionic/storage-angular';

import {MatStepperModule} from '@angular/material/stepper';

import { MatButtonModule } from '@angular/material/button';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(),
    MatStepperModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgChartsModule, 
    HttpClientModule,
    IonicStorageModule.forRoot(),
    MatButtonModule,
    MatBottomSheetModule,
    MatListModule,
    
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }] ,
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
