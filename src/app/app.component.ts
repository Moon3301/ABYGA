import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { MatListModule } from '@angular/material/list';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    register();
  }
}
