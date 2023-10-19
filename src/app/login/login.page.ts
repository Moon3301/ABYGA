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

  isModalOpenUsuarios = false;

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

  users:any

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

  setOpenUsuarios(isOpen: boolean) {
    this.isModalOpenUsuarios = isOpen;
  }

  listarUsuarios(){

    this.setOpenUsuarios(true);

    this.api.getUsers().subscribe(
      (data) => {
        this.users = data // Asigna los datos de la respuesta a la variable 'users'
        console.log(this.users); // Muestra los datos en la consola (puedes eliminar esta línea en producción)
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );

  }

  agregarUsuario(){

    const nombre = this.nombreUsuario;
    const apellido = this.apellidoUsuario;
    const correo =  this.correo;
    const clave = this.contrasena;
    const foto = this.fotoUsuario;
    const telefono = this.telefono;

    const dataJ = {
      
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
