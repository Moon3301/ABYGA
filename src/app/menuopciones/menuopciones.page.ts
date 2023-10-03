import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-menuopciones',
  templateUrl: './menuopciones.page.html',
  styleUrls: ['./menuopciones.page.scss'],

})

export class MenuopcionesPage implements OnInit {

  isVisibleNegocio = false;
  isVisibleNotificacion = false;
  isVisibleMiticket = false;
  isVisiblePersonalizacion = false;
  isVisibleRespaldo = false;
  isVisibleVersionApp = false;
  isVisibleInfo = false;
  
  currentModal: string = ''; // Declarar la propiedad currentModal

  //Icons font-awesome
   

  constructor(public router:Router) { }

  ngOnInit() {
  }

  showModalNegocio(): void {
    this.isVisibleNegocio= true;
  }
  
  
  // showModal(): void {
  
  // this.isVisible = true;
  // }

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


}