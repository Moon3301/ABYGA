import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill,
  faEllipsis} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agregar-transaccion',
  templateUrl: './agregar-transaccion.page.html',
  styleUrls: ['./agregar-transaccion.page.scss'],
})
export class AgregarTransaccionPage implements OnInit {

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
  faCalendarDays = faCalendarDays
  faFileSignature = faFileSignature
  faMoneyBillTrendUp = faMoneyBillTrendUp
  faMoneyBill = faMoneyBill
  faEllipsis = faEllipsis


  // Icon Ionic
  IconTransaccion:any = faCircleMinus;
  
  // Abrir, Cerrar Modal
  isModalOpenCategoria = false;
  isModalOpenTipoTrans = false;

  // Cambiar Color Gastos e ingresos

  colorGastos:any
  colorIngresos:any



  

  constructor(private router:Router) { }


  // Variables dinamicas para categoria

  // Categoria
  NombreCat:any = "Categoria"
  //SubCategoria
  NombreSubCat:any = "Subcategoria"
  // Icono Categoria
  IconCat: any = faWifi
  // Tipo transaccion

  TipoTrans: any

  ArrayCategoriasGastos:any = [] = [

    {id:1,name:"Transporte",sub:[{id:1,nameSub:"Combustible", icon:faGasPump},{id:2,nameSub:"Mantenimiento", icon:faCarOn}]},
    {id:2,name:"Hogar",sub:[{id:1,nameSub:"Colegio", icon:faSchool},{id:2,nameSub:"Medicamentos", icon:faCapsules},{id:3,nameSub:"Ropa", icon:faShirt},{id:4,nameSub:"Supermercado", icon:faStore}]},
    {id:3,name:"Entretenimiento", sub:[{id:1,nameSub:"Cine", icon:faFilm},{id:2, nameSub:"Juegos", icon:faGamepad},{id:3,nameSub:"Restaurante",icon:faUtensils},{id:4,nameSub:"Compras", icon:faCartShopping},{id:5,nameSub:"Deportes",icon:faBicycle},{id:6,nameSub:"Vacaciones",icon:faPlaneDeparture},{id:7,nameSub:"Libros",icon:faBookOpen}]}
  
  ]

  ArrayCategoriasIngresos:any = [] = [
    {id:1,name:"Empleador", sub:[{id:1,nameSub:"Bono", icon:faMoneyBill},{id:2,nameSub:"Salario",icon:faMoneyBillTrendUp}]},
    {id:2,name:"Otros", sub:[{id:1,nameSub:"Otros",icon:faEllipsis}]}

  ]


  
  ngOnInit() {

  }

  setOpenCategoria(isOpen: boolean) {
    this.isModalOpenCategoria = isOpen;
  }

  setOpenTipoTransaccion(isOpen: boolean){
    this.isModalOpenTipoTrans = isOpen;
  }



  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])

  }

  ChangeIconTransaccion(){

    //"add-circle-outline"


  }

  ChangeCategoria(dataCat:string, dataSubCat:string, changeIcon: any){ 

    // Cerrar Modal
    this.isModalOpenCategoria = false;

    // Asignar nombre categoria 
    this.NombreCat = dataCat

    // Asignar nombre SubCategoria
    this.NombreSubCat = dataSubCat

    // Asignar icono de categoria
    this.IconCat = changeIcon

  }

  ChangeOptionTransaccion(data:any){

    if(data == 1){
      this.colorGastos = 'danger'
      this.colorIngresos = ''
      this.IconTransaccion = faCircleMinus;
      document.getElementById("IconMontoTrans")?.setAttribute("style","color:red")
      this.TipoTrans = "Gastos"
    }

    if(data == 2){
      this.colorGastos = ''
      this.colorIngresos = 'success'
      this.IconTransaccion = faCirclePlus;
      document.getElementById("IconMontoTrans")?.setAttribute("style","color:green")
      this.TipoTrans = "Ingresos"
    }


  }



}
