import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Usuario } from '../usuario';
import { ApirestService } from '../apirest.service';
import { VideoBackgroundComponent } from '../video-background/video-background.component';
import { CrudUsuariosService } from '../crud-usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

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

  public UsuarioLogin: string = ''
  claveLogin: string = ''

  isSpinning = false;


  constructor(public api:ApirestService, public crudU:CrudUsuariosService, public router:Router, public navController: NavController) { }

  ngOnInit() {
    
  }

  GoHome(){
    
    // Retroceder a page 'Home'

    this.router.navigate(['/home'])
    console.log('GoHome ejecutado...')

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
    /*
    this.api.getUsers().subscribe(
      (data) => {
        this.users = data // Asigna los datos de la respuesta a la variable 'users'
        console.log(this.users); // Muestra los datos en la consola (puedes eliminar esta línea en producción)
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
      */
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

  GoHomeNav(){
    this.navController.navigateRoot('/home');
  }

  validacionCorrecta(){

    // Cerrar el modal
    console.log('Se abre funcion cerrar modal')
    this.setOpenLogin(false);

    this.GoHomeNav();

    console.log('Se abre funcion GoHome')
    
  }

  async validarUsuario() {
    try {

      console.log('Usuario registrado: '+this.UsuarioLogin)
      console.log('Clave ingresada: '+this.claveLogin)

      const validacion = await this.crudU.validarUsuario(String(this.UsuarioLogin) , String(this.claveLogin));
      
      console.log(validacion)

      if (validacion) {

        this.validacionCorrecta();
       
        console.log('Usuario correcto');

      } else {
        console.log('Usuario o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error al validar el usuario:', error);
    }
  }

  validarUsuarioV2(): void {
    const usuarioValido = this.crudU.validarUsuarioV2(this.UsuarioLogin, this.claveLogin);

    console.log('usuarioValido: '+usuarioValido);
    if (usuarioValido) {
      // Usuario válido, aquí puedes realizar la navegación a la página de inicio, por ejemplo.
      console.log('Usuario correcto');
      this.validacionCorrecta();
    } else {
      // Usuario o contraseña incorrectos, puedes mostrar un mensaje de error.
      console.log('Usuario o contraseña incorrecta');
    }
  }

  validarUsuarioV3(){
    this.crudU.validarUsuarioV3(this.UsuarioLogin, this.claveLogin);
    this.validacionCorrecta();
  }

}
