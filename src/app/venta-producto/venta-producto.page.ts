import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CrudProductosService } from '../crud-productos.service';
import { CrudTransaccionesService } from '../crud-transacciones.service';
import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill, 
  faEllipsis, faClock, faList,faBarcode, faImage, faMagnifyingGlass, faCalculator, faMoneyBill1Wave,
  faWandMagic, faCamera, faCubesStacked, faBroom, faBreadSlice, faPumpSoap, faCreditCard, faMoneyCheck, faMoneyCheckDollar, faCheck, faCashRegister} from '@fortawesome/free-solid-svg-icons';

import { Producto } from '../producto';
import { Pipe, PipeTransform } from '@angular/core';
import { CrudUsuariosService } from '../crud-usuarios.service';

@Pipe({ name: 'keys' })
export class KeysPipe implements PipeTransform {
  transform(value: any): string[] {
    return Object.keys(value);
  }
}

@Component({
  selector: 'app-venta-producto',
  templateUrl: './venta-producto.page.html',
  styleUrls: ['./venta-producto.page.scss'],
})
export class VentaProductoPage implements OnInit {
  
  myColor:any = "gray"
  unbounded:any = false;

   //Icons font-awesome
   faGasPump = faGasPump;
   faCarOn = faCarOn;
   faSchool= faSchool;
   faBuildingColumns = faBuildingColumns;
   faCapsules = faCapsules;
   faShirt = faShirt;
   faStore = faStore;
   faFilm = faFilm;
   faGamepad = faGamepad;
   faUtensils = faUtensils;
   faCartShopping = faCartShopping;
   faBicycle = faBicycle;
   faPlaneDeparture = faPlaneDeparture;
   faBookOpen = faBookOpen;
   faDroplet = faDroplet;
   faLightbulb = faLightbulb;
   faWifi = faWifi;
   faFireFlameSimple = faFireFlameSimple;
   faCircleMinus = faCircleMinus;
   faCirclePlus = faCirclePlus;
   faCalendarDays = faCalendarDays;
   faFileSignature = faFileSignature;
   faMoneyBillTrendUp = faMoneyBillTrendUp;
   faMoneyBill = faMoneyBill;
   faEllipsis = faEllipsis;
   faClock = faClock;
   faList = faList;
   faBarcode = faBarcode;
   faImage = faImage;
   faMagnifyingGlass = faMagnifyingGlass;
   faCalculator = faCalculator;
   faMoneyBill1Wave = faMoneyBill1Wave
   faWandMagic = faWandMagic
   faCamera = faCamera
   faCubesStacked = faCubesStacked
   faBroom = faBroom
   faBreadSlice = faBreadSlice
   faPumpSoap = faPumpSoap
   faCreditCard = faCreditCard
   faMoneyCheck = faMoneyCheck
   faMoneyCheckDollar = faMoneyCheckDollar
   faCheck = faCheck
   faCashRegister = faCashRegister

  // TOAST
  isToastOpen = false;

  CarroCompras: Producto[] = []
  totalVenta:any = 0
  CantidadTotal:any = 0;
  fechaActual:any

  isModalOpenCategoria = false;
  isModalVentaRealizada = false;
  isModalTicket = false;

  // seleccionar boton metodo de pago

  isSelectedEfectivo = false;
  isSelectedDebito = false;
  isSelectedCredito = false;
  isSelectedCheque = false;
  isSelectedOtros = false;
  metodoPago:any
  //

  isOkButtonEnabled = true

  productosAgrupados: { [id: string]: { nombre: string; cantidad: number; stock:number; valorUnitario: number; ganancia:number; total: number; img:any } } = {};

  usuario:any

  // modal ng-zorro
  isVisible = false;

  idProd:any

  //Badge
  hidden = false;

  constructor(private router:Router, public crudP:CrudProductosService, public crudT:CrudTransaccionesService, public crudU:CrudUsuariosService) { }

  ngOnInit() {

    // agregar transaccion 
    this.fechaActual = new Date();
    this.fechaActual = this.ConvertirFecha(this.fechaActual);
    
    
  }

  // En tu componente de Angular
  getNumeroDeProductos(): number {
    return Object.keys(this.productosAgrupados).length;
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }

  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])
    
  }

  scan(){

  }

  seleccionarMetodoDePago(data:any){

    this.isSelectedEfectivo = false;
    this.isSelectedDebito = false;
    this.isSelectedCredito = false;
    this.isSelectedCheque = false;
    this.isSelectedOtros = false;

    if (data === 'Efectivo') {
      this.isSelectedEfectivo = true;
    } else if (data === 'Debito') {
      this.isSelectedDebito = true;
    } else if (data === 'Credito') {
      this.isSelectedCredito = true;
    } else if (data === 'Cheque') {
      this.isSelectedCheque = true;
    } else if (data === 'Otros') {
      this.isSelectedOtros = true;
    }

    this.isOkButtonEnabled = false;
    this.metodoPago = data;
  }

  AgregarAlCarro(producto:any){

  const idProducto = producto.id;

  // valida si el producto se encuentra en stock

    if (this.productosAgrupados[idProducto]) {

      // Si el producto ya está en el carro, actualiza la cantidad, el total y el valor unitario.
      if(this.productosAgrupados[idProducto].stock >=1){

        // cantidad en el carro
        this.productosAgrupados[idProducto].cantidad++;

        // stock actualizado del producto
        this.productosAgrupados[idProducto].stock--;
        
        this.CantidadTotal++;

        // Actualiza el total de la venta.
        this.totalVenta += producto.precio;
  
        this.productosAgrupados[idProducto].total += producto.precio;
      }else{
        this.setOpenToast(true);
      }
      
    } else {
      // Si el producto no está en el carro, agrégalo al registro.

      if(producto.stock >= 1){

        this.productosAgrupados[idProducto] = {
          nombre: producto.nombre,
          cantidad: 1,
          stock: producto.stock,
          valorUnitario: producto.precio,
          ganancia: 0,
          total: producto.precio,
          img: producto.imagen
        };

        this.productosAgrupados[idProducto].stock--;
    
        this.CantidadTotal++;
        this.totalVenta += producto.precio;

      }else{

        this.setOpenToast(true);
      }
      
    }
  
  // Agrega el producto al carro de compras.
  this.CarroCompras.push(producto);

  }

  setOpenCategoria(isOpen: boolean) {
    this.isModalOpenCategoria = isOpen;
  }

  setOpenVentaRealizada(isOpen:boolean){
    this.isModalVentaRealizada = isOpen;
    this.handleOk();
  }

  setOpenTicket(isOpen:boolean){

    this.isModalTicket = isOpen;

  }

  ModificarCantidad(tipo:any, producto:any){

    switch(tipo){

      case 'aumentar':

        if(producto.stock <= 1){

          this.setOpenToast(true);
    
        }else{
    
          producto.stock--;
    
          producto.cantidad ++;
          this.CantidadTotal ++;
      
          producto.total += producto.valorUnitario;
          this.totalVenta += producto.valorUnitario;
    
        }

      break;

      case 'disminuir':

        if(producto.cantidad <= 1){

        }else{
          producto.cantidad --;
          this.CantidadTotal --;
    
          producto.stock++;
      
          producto.total -= producto.valorUnitario;
          this.totalVenta -= producto.valorUnitario;

        }

      break;

    }

  }

  // LUEGO DE REALIZAR LA LOGICA PASAR FUNCION AL CRUD PRODUCTOS
  realizarVenta(){

    this.setOpenCategoria(false);

    this.usuario = this.crudU.buscarUsuarioActivo(true);

    for (const key in this.productosAgrupados) {
      if (this.productosAgrupados.hasOwnProperty(key)) {
        
        const producto = this.productosAgrupados[key];

        // Descontar stock de producto vendido
        const productoInventario = this.crudP.MostrarProducto(Number(key))

        productoInventario.stock -= producto.cantidad
        
        if(productoInventario.stock <= 0){

          productoInventario.estado = false;

        }

        const categoria = productoInventario.categoria && productoInventario.categoria[0] ? productoInventario.categoria[0].nombre : 'Categoría no definida';
        console.log('Categoria producto en venta: '+categoria)
        try{
          if(this.crudP.totalNetoCategorias[categoria]){

            console.log('total neto por categoria: '+this.crudP.totalNetoCategorias[categoria])
             
            const total = producto.cantidad * producto.valorUnitario;
    
            this.crudP.totalNetoCategorias[categoria].valorTotal += total;
            
            console.log('valor Total: '+this.crudP.totalNetoCategorias[categoria].valorTotal)
            }
        }catch(error){
          console.log('Error en categoria:'+error);
        }

        // Obtener ganancia

        const precio = productoInventario.precio * producto.cantidad;
        console.log('Precio total producto:', precio)

        const costo = productoInventario.costo * producto.cantidad;
        console.log('Costo total producto:', costo)

        const ganancias = precio - costo;
        console.log('Ganancia total producto:', ganancias)
        this.productosAgrupados[key].ganancia = ganancias
        
      }
      
    }

    // Agregar venta a la lista

    // busca el usuario actualmente activo
    
    console.log('Usuario Activo: ',this.usuario)

    if(this.crudP.ventaProductos && this.crudP.ventaProductos.length > 0){
      this.crudP.agregarVenta(
        this.crudP.ventaProductos.length+1,
        this.fechaActual,
        this.usuario,
        this.productosAgrupados
      );
    }else{
      this.crudP.agregarVenta(1, this.fechaActual, this.usuario, this.productosAgrupados);
    }
  
    // Se agrega una transaccion con los datos de los productos vendidos.
    this.crudT.AgregarTransaccion(this.crudT.transacciones.length+1,'',this.totalVenta,false,this.fechaActual,'','Ingresos','',[{id:2,nombre:'Ventas',subCategoria:[{id:1,nombre:'Productos', icon:faCashRegister}]}], this.productosAgrupados, 'Ingresos Variables')

    this.setOpenVentaRealizada(true);

  }

  nuevaVenta(){

    this.setOpenVentaRealizada(false);
    
    this.productosAgrupados = {};
    this.CantidadTotal = 0
    this.totalVenta = 0
    this.CarroCompras = []

  }

  ConvertirFecha(date:any): string{

    const fecha = new Date(date);
    return fecha.toLocaleDateString('es',{ weekday:'short',day:'2-digit', month:'long', year:'numeric'})
    
  }

}
