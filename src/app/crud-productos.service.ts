import { Injectable } from '@angular/core';
import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {

  constructor() { }

  public productos: Producto[] = [];

  ActiveModificarProducto:any = false;

  DataProducto:any

  agregarProducto(id:any,nombre:any,precio:any,costo:any,stock:any,unidadMedida:any,fechaCreacion:any,fechaModificacion:any,imagen:any,estado:any,descripcion:any,categoria:any){

    if (this.productos.find(x => x.id === id)) {return};

    this.ConvertirFecha(fechaCreacion);
    this.ConvertirFecha(fechaModificacion);

    this.productos.push({id,nombre,precio,costo,stock,unidadMedida,fechaCreacion:this.ConvertirFecha(fechaCreacion),fechaModificacion:this.ConvertirFecha(fechaModificacion),imagen,estado,descripcion,categoria})

  }

  modificarProducto(id:any,nombre:any,precio:any,costo:any,stock:any,unidadMedida:any,fechaCreacion:any,fechaModificacion:any,imagen:any,estado:any,descripcion:any,categoria:any){

    const index = this.productos.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    this.productos[index].nombre = nombre;
    this.productos[index].precio = precio;
    this.productos[index].costo = costo;
    this.productos[index].stock = stock;
    this.productos[index].unidadMedida = unidadMedida;
    this.productos[index].fechaCreacion = fechaCreacion;
    this.productos[index].fechaModificacion = fechaModificacion;
    this.productos[index].imagen = imagen;
    this.productos[index].estado = estado;
    this.productos[index].descripcion = descripcion;
    this.productos[index].categoria = categoria;

  }

  listarProductos(){

    if (this.productos.length === 0) {
      console.log("No hay transacciones para mostrar.");
      return;
    }

    console.log("Lista de transacciones:");
    this.productos.forEach(productos => {
        console.log(productos);
    });

  }

  MostrarProducto(id:number) {
    const productoEncontrado = this.productos.find(x => x.id === id);

    if (!productoEncontrado) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    console.log(productoEncontrado);

    return productoEncontrado;
  }

  GetModificarProducto(id:any){

    this.DataProducto = this.MostrarProducto(id);

  }

  GetDataModificar(){
    return this.DataProducto
  }

  ConvertirFecha(date:any): string{

    const fecha = new Date(date);
    return fecha.toLocaleDateString('es',{ weekday:'short',day:'2-digit', month:'long', year:'numeric'})
    
  }

}
