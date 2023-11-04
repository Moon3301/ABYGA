import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CrudProductosService } from '../crud-productos.service';
import { CrudUsuariosService } from '../crud-usuarios.service';
import { CrudTransaccionesService } from '../crud-transacciones.service';


@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})



export class DocumentosPage implements OnInit {

  constructor(public router:Router, public crudP:CrudProductosService, public crudU:CrudUsuariosService, public crudT:CrudTransaccionesService) { }

  ngOnInit() {
  }

  GoHome(){

    this.router.navigate(['home']);

  }

}
