import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { Storage } from '@ionic/storage-angular';
import { Transaccion } from './transaccion';
import { CrudTransaccionesService } from './crud-transacciones.service';
import { Venta } from './venta';
import { Negocio } from './negocio';
import { Usuario } from './usuario';
import { CrudUsuariosService } from './crud-usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {

  isToastOpen:any

  message:any

  public ventaProductos: Venta[] = [];

  public productos: Producto[] = [];

  public totalNetoCategorias: { [categoria: string]: { valorTotal: number } } = {
    'Alimentos y bebidas': { valorTotal: 1 },
    'Productos limpieza': { valorTotal: 1 },
    'Panaderia y pasteleria': { valorTotal: 1 },
    'Higiene personal': { valorTotal: 1 },
    'Comida para mascotas' : {valorTotal:1},
    'Tecnologia y accesorios' : {valorTotal:1},
    'Articulos escolares' : {valorTotal:1},
    'Ropa y moda' : {valorTotal:1},
    'Jugueteria y entretenimiento' : {valorTotal:1},
    'Frutas y verduras' : {valorTotal:1},
    'Materiales de construccion' : {valorTotal:1},
    'Deporte' : {valorTotal:1},
    'Accesorios varios' : {valorTotal:1},

  };

  ActiveModificarProducto:any = false;

  DataProducto:any

  constructor(private storage: Storage, public crudT:CrudTransaccionesService, public crudU:CrudUsuariosService) {

    this.initStorage();
    this.cargarListasDesdeStorage();

  }

  async initStorage(){
    await this.storage.create();
  }

  // Storage

  async guardarListasEnStorage() {

    const listasParaGuardar = {
      productos: this.productos,
      totalNetoCategorias: this.totalNetoCategorias,
      ventas: this.ventaProductos,
    }

    await this.storage.set('listaProductos', listasParaGuardar);

  }

  async cargarListasDesdeStorage() {

    const listasGuardadas = await this.storage.get('listaProductos');

    if (listasGuardadas) {

      this.productos = listasGuardadas.productos;
      this.totalNetoCategorias = listasGuardadas.totalNetoCategorias;
      this.ventaProductos = listasGuardadas.ventas;

    }

  }

  async eliminarListasEnStorage() {
    await this.storage.remove('listaProductos');
    
    // Puedes restablecer tus variables a su estado inicial si es necesario
    this.productos = [];
    this.totalNetoCategorias = {
      'Alimentos y bebidas': { valorTotal: 1 },
      'Productos limpieza': { valorTotal: 1 },
      'Panaderia y pasteleria': { valorTotal: 1 },
      'Higiene personal': { valorTotal: 1 },
      'Comida para mascotas' : {valorTotal:1},
      'Tecnologia y accesorios' : {valorTotal:1},
      'Articulos escolares' : {valorTotal:1},
      'Ropa y moda' : {valorTotal:1},
      'Jugueteria y entretenimiento' : {valorTotal:1},
      'Frutas y verduras' : {valorTotal:1},
      'Materiales de construccion' : {valorTotal:1},
      'Deporte' : {valorTotal:1},
      'Accesorios varios' : {valorTotal:1},
    }

  }

  agregarProducto(id:any,nombre:any,precio:any,costo:any,stock:any,unidadMedida:any,fechaCreacion:any,fechaModificacion:any,imagen:any,estado:any,descripcion:any,categoria:any){

    if (this.productos.find(x => x.id === id)) {return};

    this.ConvertirFecha(fechaCreacion);
    this.ConvertirFecha(fechaModificacion);

    const usuarioActivo = this.crudU.buscarUsuarioActivo();
    const negocio = usuarioActivo.negocio

    this.productos.push({id,nombre,precio,costo,stock,unidadMedida,fechaCreacion:this.ConvertirFecha(fechaCreacion),fechaModificacion:this.ConvertirFecha(fechaModificacion),imagen,estado,descripcion,categoria,negocio})

    this.guardarListasEnStorage();

    this.message = 'Producto creado con exito !'
    this.setOpenToast(true);
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

    this.guardarListasEnStorage();

    this.message = 'Producto modificado !'
    this.setOpenToast(true);

  }

  eliminarProducto(id:Number){

    const index = this.productos.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró un producto con ID ${id}`);
    }

    this.productos.splice(index, 1);

    this.guardarListasEnStorage();

    this.message = 'Producto eliminado !'
    this.setOpenToast(true);

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

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }


  MostrarProducto(id:number) {
    const productoEncontrado = this.productos.find(x => x.id === id);

    if (!productoEncontrado) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

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

  agregarVenta(ticket:any, totalVenta:number, totalCantidad:number , fecha:any, usuario:any, productosAgrupados:any ){

    if (this.ventaProductos.find(x => x.ticket === ticket)) {return};
    
    this.ventaProductos.push({ticket ,totalVenta ,totalCantidad ,fecha, usuario, productosAgrupados})

    this.guardarListasEnStorage();

  }

}
