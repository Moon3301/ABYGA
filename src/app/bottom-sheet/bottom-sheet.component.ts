import { Component, OnInit } from '@angular/core';
import {MatBottomSheetModule, MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute,Router } from '@angular/router';
import { CrudUsuariosService } from '../crud-usuarios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
  standalone: true,
  imports: [MatBottomSheetModule, MatListModule, MatButtonModule, IonicModule, CommonModule]
})
export class BottomSheetComponent  implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>, public router:Router, public crudU:CrudUsuariosService) { }

  ngOnInit() {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

  goIngresos(){
    this.router.navigate(['/','Ingresos']);
    console.log(this.crudU.colorSistema)
  }

  goEgresos(){
    this.router.navigate(['/','Egresos']);
  }

  goInsumos(){
    this.router.navigate(['agregar-producto']);
  }

  goVentas(){
    this.router.navigate(['venta-producto']);
  }

}
