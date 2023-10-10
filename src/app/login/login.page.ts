import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Usuario } from '../usuario';
import { ApirestService } from '../apirest.service';


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
  idUsuario:any

  //

  constructor(public api:ApirestService) { }

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

  agregarUsuario(){

    const id = 31;
    const nombre = this.nombreUsuario;
    const apellido = this.apellidoUsuario;
    const correo =  this.correo;
    const clave = this.contrasena;
    const foto = this.fotoUsuario;
    const telefono = this.telefono;
 ``
    const dataJ = {
      id,
      nombre,
      apellido,
      correo,
      clave,
      foto,
      telefono
    }

    this.api.agregarUsuario(dataJ).subscribe(

      (data) => {
        console.log('Usuario agregado con éxito:', data);

        this.setOpenRegistro(false);
        // Puedes realizar acciones adicionales después de agregar el usuario, como mostrar un mensaje de éxito o redirigir a otra página.
      },
      (error) => {
        console.error('Error al agregar usuario:', error);
      }

    )

  }

}
