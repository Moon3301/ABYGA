import { Component, OnInit } from '@angular/core';
import { CrudTransaccionesService } from '../crud-transacciones.service';



@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.page.html',
  styleUrls: ['./historial-transacciones.page.scss'],
})
export class HistorialTransaccionesPage implements OnInit {

  constructor( public crud:CrudTransaccionesService) { }

  ngOnInit() {
  }

  GetTransaccion(id:any){
    this.crud.GetModificarTransaccion(id);
    this.crud.ActiveModificarTransaccion = true;
  }

}
