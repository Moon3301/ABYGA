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

  productosAgrupados: { [id: string]: { nombre: string; cantidad: number; valorUnitario: number; total: number } } = {};

  // modal ng-zorro
  isVisible = false;

  idProd:any

  //Badge
  hidden = false;

  constructor(private router:Router, public crudP:CrudProductosService, public crudT:CrudTransaccionesService) { }

  ngOnInit() {

    // agregar transaccion 
    this.fechaActual = new Date();
    this.fechaActual = this.ConvertirFecha(this.fechaActual);
    
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

  if (this.productosAgrupados[idProducto]) {
    // Si el producto ya está en el carro, actualiza la cantidad, el total y el valor unitario.
    this.productosAgrupados[idProducto].cantidad++;

    this.CantidadTotal++;

    this.productosAgrupados[idProducto].total += producto.precio;
  } else {
    // Si el producto no está en el carro, agrégalo al registro.
    this.productosAgrupados[idProducto] = {
      nombre: producto.nombre,
      cantidad: 1,
      valorUnitario: producto.precio,
      total: producto.precio,
    };

    this.CantidadTotal++;
  }

  // Agrega el producto al carro de compras.
  this.CarroCompras.push(producto);

  // Actualiza el total de la venta.
  this.totalVenta += producto.precio;

  // Actualiza la cantidad de productos.s
  

  console.log(producto);

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

    if(tipo == 'aumentar'){

      producto.cantidad ++;
      this.CantidadTotal ++;

      producto.total += producto.valorUnitario;
      this.totalVenta += producto.valorUnitario;

    }

    if(tipo == 'disminuir'){

      producto.cantidad --;
      this.CantidadTotal --;

      producto.total -= producto.valorUnitario;
      this.totalVenta -= producto.valorUnitario;
    }
    
  }

  // LUEGO DE REALIZAR LA LOGICA PASAR FUNCION AL CRUD PRODUCTOS
  realizarVenta(){

    this.isOkButtonEnabled = false;

    for (const key in this.productosAgrupados) {
      if (this.productosAgrupados.hasOwnProperty(key)) {

        const producto = this.productosAgrupados[key];

        // Descontar stock de producto vendido
        const productoInventario = this.crudP.MostrarProducto(Number(key))

        productoInventario.stock -= producto.cantidad
        console.log(`Key: ${key}, Nombre: ${producto.nombre}, Cantidad: ${producto.cantidad}, Valor Unitario: ${producto.valorUnitario}, Total: ${producto.total}`);

      }
      
    }

    this.crudT.AgregarTransaccion(this.crudT.transaccion.length+1,'',this.totalVenta,'',this.fechaActual,'','Ingresos','',[{id:2,nombre:'Ventas',subCategoria:[{id:1,nombre:'Productos', icon:faCashRegister}]}])

    this.setOpenVentaRealizada(true);

    console.log(this.crudP.productos)

  }

  nuevaVenta(){

    this.setOpenVentaRealizada(false);
    this.setOpenCategoria(false);

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