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
  nombreNegocio:any
  ticket:any
  nombreUsuario:any
  totalCantidad:any
  productosAgrupados:any
  totalVenta:any
  fecha:any


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

    this.nombreNegocio = this.crudP.ventaProductos[index].usuario.nombreNegocio;
    this.ticket = this.crudP.ventaProductos[index].ticket;
    this.nombreUsuario = this.crudP.ventaProductos[index].usuario.nombreUsuario;
    this.totalCantidad = this.crudP.ventaProductos[index].totalCantidad;
    this.productosAgrupados = this.crudP.ventaProductos[index].productosAgrupados;
    this.totalVenta = this.crudP.ventaProductos[index].totalVenta;
    this.cantidadProductos = Object.keys(this.crudP.ventaProductos[index].productosAgrupados).length;
    this.fecha = this.crudP.ventaProductos[index].fecha;
  }

}
