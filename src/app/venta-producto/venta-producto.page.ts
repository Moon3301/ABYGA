import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CrudProductosService } from '../crud-productos.service';
import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill, 
  faEllipsis, faClock, faList,faBarcode, faImage, faMagnifyingGlass, faCalculator, faMoneyBill1Wave,
  faWandMagic, faCamera, faCubesStacked, faBroom, faBreadSlice, faPumpSoap} from '@fortawesome/free-solid-svg-icons';

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


  CarroCompras: Producto[] = []
  totalVenta:any = 0

  isModalOpenCategoria = false;

  productosAgrupados: { [id: string]: { nombre: string; cantidad: number; valorUnitario: number; total: number } } = {};

  // modal ng-zorro
  isVisible = false;

  idProd:any

  //Badge
  hidden = false;

  constructor(private router:Router, public crudP:CrudProductosService) { }

  ngOnInit() {
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

  AgregarAlCarro(producto:any){

    const idProducto = producto.id;

  if (this.productosAgrupados[idProducto]) {
    // Si el producto ya está en el carro, actualiza la cantidad, el total y el valor unitario.
    this.productosAgrupados[idProducto].cantidad++;
    this.productosAgrupados[idProducto].total += producto.precio;
  } else {
    // Si el producto no está en el carro, agrégalo al registro.
    this.productosAgrupados[idProducto] = {
      nombre: producto.nombre,
      cantidad: 1,
      valorUnitario: producto.precio,
      total: producto.precio,
    };
  }

  // Agrega el producto al carro de compras.
  this.CarroCompras.push(producto);

  // Actualiza el total de la venta.
  this.totalVenta += producto.precio;

  console.log(producto);

  }

  setOpenCategoria(isOpen: boolean) {
    this.isModalOpenCategoria = isOpen;
  }

  GroupProductos(){



    
  }

}
