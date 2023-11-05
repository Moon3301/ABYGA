import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CrudProductosService } from '../crud-productos.service';
import { CrudUsuariosService } from '../crud-usuarios.service';
import { CrudTransaccionesService } from '../crud-transacciones.service';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: any): string[] {
    return Object.keys(value);
  }
}

@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.page.html',
  styleUrls: ['./documentos.page.scss'],
})

export class DocumentosPage implements OnInit {

  isModalTicket = false;
  cantidadProductos:any

  constructor(public router:Router, public crudP:CrudProductosService, public crudU:CrudUsuariosService, public crudT:CrudTransaccionesService) { }

  ngOnInit() {
  }

  GoHome(){

    this.router.navigate(['home']);

  }

  setOpenTicket(isOpen:boolean){

    this.isModalTicket = isOpen;
    

  }

  getNumeroDeProductos(index :any){
    
    this.cantidadProductos = Object.keys(this.crudP.ventaProductos[index].productosAgrupados).length;

  }

}
