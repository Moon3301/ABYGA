import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Usuario } from '../usuario';
import { ApirestService } from '../apirest.service';
import { VideoBackgroundComponent } from '../video-background/video-background.component';
import { CrudUsuariosService } from '../crud-usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(VideoBackgroundComponent)
  videoComponent: VideoBackgroundComponent = new VideoBackgroundComponent;

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
  
  contrasena:any
  Repcontrasena:any
  fotoUsuario:any = ''
  telefono:any
  nombreNegocio:any
  fotoNegocio:any
  idUsuario:any

  //

  users:any

  //

  UsuarioLogin:any
  claveLogin:any


  constructor(public api:ApirestService, public crudU:CrudUsuariosService, public router:Router) { }

  ngOnInit() {
    
  }

  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])

  }

  ionViewDidEnter(){
    this.reproducirVideo();

  }

  reproducirVideo() {
    if (this.videoComponent) {
      this.videoComponent.reproducirVideo();
    }
  }

  pausarVideo() {
    if (this.videoComponent) {
      this.videoComponent.pausarVideo();
    }
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

    const id = this.crudU.usuarios.length+1;
    const nombreUsuario = this.nombreUsuario;
    const correo =  this.correo;
    const clave = this.contrasena;
    const telefono = this.telefono;
    const foto = this.fotoUsuario;
    
    this.crudU.agregarUsuario(id,nombreUsuario,correo,clave,telefono,foto)


    this.setOpenRegistro(false);
    console.log('Usuario creado con exito')
    console.log(this.crudU.listarUsuarios());
    /*
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
    */

  }

  async validarUsuario() {
    try {
      const validacion = await this.crudU.validarUsuario(this.UsuarioLogin, this.claveLogin);
      if (validacion) {
        this.GoHome();
        console.log('Usuario correcto');
      } else {
        console.log('Usuario o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
    }
  }

}
