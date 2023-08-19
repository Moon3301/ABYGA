import { Component } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router:Router) {}


  AgregarTransaccion(){

    this.router.navigate(['agregar-transaccion'])

  }


}
