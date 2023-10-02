import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menuopciones',
  templateUrl: './menuopciones.page.html',
  styleUrls: ['./menuopciones.page.scss'],

 

})


export class MenuopcionesPage implements OnInit {

  isVisible = false;
  

   //Icons font-awesome
   
   
 
  

  constructor() { }

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

}
