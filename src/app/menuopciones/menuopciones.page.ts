import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill, 
  faEllipsis, faClock, faList,faBarcode, faImage, faMagnifyingGlass, faCalculator, faMoneyBill1Wave,
  faWandMagic, faCamera, faCubesStacked, faBroom, faBreadSlice, faPumpSoap, } from '@fortawesome/free-solid-svg-icons';

import { CrudProductosService } from '../crud-productos.service';
import { CrudTransaccionesService } from '../crud-transacciones.service';
import { CrudUsuariosService } from '../crud-usuarios.service';

@Component({
  selector: 'app-menuopciones',
  templateUrl: './menuopciones.page.html',
  styleUrls: ['./menuopciones.page.scss'],
  
})

export class MenuopcionesPage implements OnInit {

  faImage = faImage;

  isVisibleNegocio = false;
  isVisibleNotificacion = false;
  isVisibleMiticket = false;
  isVisiblePersonalizacion = false;
  isVisibleRespaldo = false;
  isVisibleVersionApp = false;
  isVisibleInfo = false;
  
  currentModal: string = ''; // Declarar la propiedad currentModal

  //Icons font-awesome
   
  // Respaldo y restauracion

  isOkButtonEnabled = true;

  isChekedDeleteProductos = false;
  isChekedDeleteTransacciones = false;

  constructor(public router:Router, public crudP: CrudProductosService, public crudT:CrudTransaccionesService, public crudU:CrudUsuariosService) { }

  ngOnInit() {
  }

  borrarRegistros(){

    if(this.isChekedDeleteProductos){

      this.crudP.eliminarListasEnStorage();
      console.log('Registros de productos eliminados')
    }

    if(this.isChekedDeleteTransacciones){

      this.crudT.eliminarListasEnStorage();
      console.log('Registros de transacciones eliminadas')
    }

    this.isChekedDeleteProductos = false;
    this.isChekedDeleteTransacciones = false;

    this.handleOkRespaldo();

  }

  validarSeleccionEliminacion(){

    if(this.isChekedDeleteProductos == true || this.isChekedDeleteTransacciones == true){
      this.isOkButtonEnabled = false;
    }else{
      this.isOkButtonEnabled = true;
    }

  }

  showModalNegocio(): void {
    this.isVisibleNegocio= true;
  }

  handleOkNegocio(): void {
    console.log('Button ok clicked!');
    this.isVisibleNegocio = false;
  }

  handleCancelNegocio(): void {
    console.log('Button cancel clicked!');
    this.isVisibleNegocio = false;
  }

  //Modal notificaciones

  ModalNotificaciones(): void {
    this.isVisibleNotificacion = true;
  }

  handleOkNotificacion(): void {
    console.log('Button ok clicked!');
    this.isVisibleNotificacion = false;
  }

  handleCancelNotificacion(): void {
    console.log('Button cancel clicked!');
    this.isVisibleNotificacion = false;
  }

//Modal Miticket
  ModalMiticket(): void {
    this.isVisibleMiticket = true;
  }

  handleOkMiticket(): void {
    console.log('Button ok clicked!');
    this.isVisibleMiticket = false;
  }

  handleCancelMiticket(): void {
    console.log('Button cancel clicked!');
    this.isVisibleMiticket = false;
  }

  //ModalPersonalizacion

  ModalPersonalizacion(): void {
    this.isVisiblePersonalizacion = true;
  }

  handleOkPersonalizacion(): void {
    console.log('Button ok clicked!');
    this.isVisiblePersonalizacion = false;
  }

  handleCancelPersonalizacion(): void {
    console.log('Button cancel clicked!');
    this.isVisiblePersonalizacion = false;
  }

  //ModalRespaldo


  ModalRespaldo(): void {
    this.isVisibleRespaldo = true;
  }

  handleOkRespaldo(): void {
    console.log('Button ok clicked!');
    this.isVisibleRespaldo = false;
  }

  handleCancelRespaldo(): void {
    console.log('Button cancel clicked!');
    this.isVisibleRespaldo = false;
  }

  //ModalVersionApp

  ModalVersionApp(): void {
    this.isVisibleVersionApp = true;
  }

  handleOkVersionApp(): void {
    console.log('Button ok clicked!');
    this.isVisibleVersionApp = false;
  }

  handleCancelVersionApp(): void {
    console.log('Button cancel clicked!');
    this.isVisibleVersionApp = false;
  } 

  //ModalInfo

  ModalInfo(): void {
    this.isVisibleInfo = true;
  }

  handleOkInfo(): void {
    console.log('Button ok clicked!');
    this.isVisibleInfo = false;
  }

  handleCancelInfo(): void {
    console.log('Button cancel clicked!');
    this.isVisibleInfo = false;
  }

  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])

  }

  cerrarSesion(){
    
  }

  SeleccionPersonalizacionColor(boton:any){
    

    if (boton == 'basico' ){
      console.log("presiona basico")
      this.crudU.colorSistema='#1C2833'
      
    }

    if (boton == 'azul' ){
      console.log("presiona azul")
      this.crudU.colorSistema='#0000ff'
      
    }

    if (boton == 'violeta' ){
      this.crudU.colorSistema="#8a2be2"
      
    }

    if (boton == 'rojo' ){
      this.crudU.colorSistema="#8b0000"
      
    }

    if (boton == 'naranjo' ){
      this.crudU.colorSistema="#ffa500"
      
    }

    if (boton == 'purpura' ){
      this.crudU.colorSistema="#800080"
      
    }


  }

}