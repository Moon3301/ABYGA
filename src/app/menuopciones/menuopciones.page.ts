import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuopciones',
  templateUrl: './menuopciones.page.html',
  styleUrls: ['./menuopciones.page.scss'],

 

})


export class MenuopcionesPage implements OnInit {

  isVisible = false;
  currentModal: string = ''; // Declarar la propiedad currentModal

   //Icons font-awesome
   
   
 
  

  constructor() { }

  ngOnInit() {
  }

  showModal(modalName: string): void {
    this.currentModal = modalName;
    this.isVisible = true;
  }
  
  
  // showModal(): void {
  
  // this.isVisible = true;
  // }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ModalNotificaciones(): void {
    this.isVisible = true;
  }

  handleOkNotificacion(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancelNotificacion(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  ModalMiticket(): void {
    this.isVisible = true;
  }

  handleOkMiticket(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancelMiticket(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ModalPersonalizacion(): void {
    this.isVisible = true;
  }

  handleOkPersonalizacion(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancelPersonalizacion(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ModalRespaldo(): void {
    this.isVisible = true;
  }

  handleOkRespaldo(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancelRespaldo(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  ModalVersionApp(): void {
    this.isVisible = true;
  }

  handleOkVersionApp(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancelVersionApp(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  } 

  ModalInfo(): void {
    this.isVisible = true;
  }

  handleOkInfo(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancelInfo(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


}
