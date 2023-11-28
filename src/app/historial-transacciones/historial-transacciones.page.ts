import { Component, OnInit } from '@angular/core';
import { CrudTransaccionesService } from '../crud-transacciones.service';
import { Router } from '@angular/router';
import { CrudUsuariosService } from '../crud-usuarios.service';

@Component({
  selector: 'app-historial-transacciones',
  templateUrl: './historial-transacciones.page.html',
  styleUrls: ['./historial-transacciones.page.scss'],
})
export class HistorialTransaccionesPage implements OnInit {

  constructor( public crud:CrudTransaccionesService, public router:Router, public crudU:CrudUsuariosService) { }

  ngOnInit() {
  }

  GetTransaccion(id:any){
    this.crud.GetModificarTransaccion(id);
    this.crud.ActiveModificarTransaccion = true;
  }

  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])

  }

}
