import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule,FormBuilder, FormGroup, AbstractControl} from '@angular/forms';
import { Usuario } from '../usuario';
import { ApirestService } from '../apirest.service';
import { VideoBackgroundComponent } from '../video-background/video-background.component';
import { CrudUsuariosService } from '../crud-usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class LoginPage implements OnInit {

  @ViewChild(VideoBackgroundComponent)
  videoComponent: VideoBackgroundComponent = new VideoBackgroundComponent;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    validacionDuplicado: ['', Validators.required]

  });

  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  submitted:boolean = false;


  //modal
  isModalOpenLogin = false;

  isModalOpenRegistro = false;

  isModalOpenUsuarios = false;

  // clave oculta
  hide = true;

  //
  idUsuario:any
  nombreUsuario:any
  correo:any
  contrasena:any
  Repcontrasena:any
  telefono:any

  nombreNegocio:any
  direccionNegocio:any

  //

  public UsuarioLogin: string = ''
  claveLogin: string = ''

  constructor(public api:ApirestService, public crudU:CrudUsuariosService, public router:Router, public navController: NavController, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    
    this.crudU.cerrarSesionUsuario();

  }

  validarUsuarioDuplicado(){

    this.submitted = true;

    this.nombreUsuario = this.firstFormGroup.get('validacionDuplicado')?.value;
    console.log(this.nombreUsuario)

    const usuarioDuplicado = this.crudU.validarUsuarioDuplicado(this.nombreUsuario);
    
    return usuarioDuplicado

  }

  GoHome(){
    
    // Retroceder a page 'Home'

    this.router.navigate(['/home'])
    console.log('GoHome ejecutado...')
    
  }

  ionViewDidEnter(){
    this.crudU.cerrarSesionUsuario();
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
    const nombreNegocio = this.nombreNegocio;
    const direccionNegocio = this.direccionNegocio;

    const login = false;

    this.crudU.agregarUsuario(id,nombreUsuario,correo,clave,telefono,nombreNegocio,direccionNegocio, login);

    this.setOpenRegistro(false);
    this.ResetData();
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

  ResetData(){

    this.nombreUsuario = ''
    this.correo = ''
    this.contrasena = ''
    this.Repcontrasena = ''
    this.telefono = ''
  
    this.nombreNegocio = ''
    this.direccionNegocio = ''

  }

  validacionCorrecta(){

    this.setOpenLogin(false);

    this.GoHomeNav();
    this.crudU.iniciarSesionUsuario(this.UsuarioLogin);
    
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

}
