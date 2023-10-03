import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //modal
  isModalOpenLogin = false;

  isModalOpenRegistro = false;

  // clave oculta
  hide = true;

  //

  nombreUsuario:any
  apellidoUsuario:any

  correo:any
  email = new FormControl('', [Validators.required, Validators.email]);
  
  contrasena:any
  fotoUsuario:any
  telefono:any
  nombreNegocio:any
  fotoNegocio:any


  //



  constructor() { }

  ngOnInit() {
  }

  

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  setOpenLogin(isOpen: boolean) {
    this.isModalOpenLogin = isOpen;
  }

  setOpenRegistro(isOpen:boolean){
    this.isModalOpenRegistro = isOpen;
  }





}
