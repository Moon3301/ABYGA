import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CrudUsuariosService {

  public usuarios: Usuario[] = [];

  public nombreUsuario:any

  constructor(private storage: Storage, public router:Router) {

    this.initStorage();
    this.cargarListasDesdeStorage();

  }

  goHome(){
    this.router.navigate(['home']);
  }

  async initStorage(){
    await this.storage.create();
  }

  async guardarListasEnStorage() {

    const listasParaGuardar = {
      usuarios: this.usuarios
    }

    await this.storage.set('listaUsuarios', listasParaGuardar);

  }

  async cargarListasDesdeStorage() {

    const listasGuardadas = await this.storage.get('listaUsuarios');

    if (listasGuardadas) {

      this.usuarios = listasGuardadas.usuarios

    }

  }

  agregarUsuario(id:any, nombreUsuario:any, correo:any, clave:any, telefono:any, nombreNegocio:any, direccionNegocio:any, login:any ){

    if (this.usuarios.find(x => x.id === id)) {return};

    this.usuarios.push({id, nombreUsuario, correo, clave, telefono, nombreNegocio, direccionNegocio, login});

    this.guardarListasEnStorage();

  }

  modificarUsuario(id:any, nombreUsuario:any, correo:any, clave:any, telefono:any,nombreNegocio:any, direccionNegocio:any){

    const index = this.usuarios.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    this.usuarios[index].id = id
    this.usuarios[index].nombreUsuario = nombreUsuario
    this.usuarios[index].correo = correo
    this.usuarios[index].clave = clave
    this.usuarios[index].telefono = telefono
    this.usuarios[index].nombreNegocio = nombreNegocio
    this.usuarios[index].direccionNegocio = direccionNegocio

    this.guardarListasEnStorage();

  }

  eliminarUsuario(id:Number){

    const index = this.usuarios.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró un producto con ID ${id}`);
    }

    this.usuarios.splice(index, 1);

    this.guardarListasEnStorage();

  }

  buscarUsuario(id:number){

    const usuarioEncontrado = this.usuarios.find(x => x.id === id);

    if (!usuarioEncontrado) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    return usuarioEncontrado;

  }

  async validarUsuario(user: any, pass: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validar usuario
        const usuarioEncontrado = this.usuarios.find(x => x.nombreUsuario == user);
        console.log('Usuario encontrado: '+usuarioEncontrado)
        if (!usuarioEncontrado) {
          throw new Error(`No se encontró un usuario con el nombre ${user}`);
        }
        
        // Validar clave
        const claveCorrecta = this.usuarios.find(x => x.clave == pass);
        
        console.log('CLave correcta: '+claveCorrecta)

        if (!claveCorrecta) {
          throw new Error('Contraseña incorrecta');
        }
  
        // Si el usuario es correcto y la clave es correcta, resolvemos la promesa con true

        if (usuarioEncontrado && claveCorrecta) {
          this.nombreUsuario = user;
          resolve(true); // Usuario y clave correctos
        } else {
          resolve(false); // Usuario o clave incorrectos
        }
      } catch (error) {
        reject(error); // Rechaza la promesa en caso de error
      }
    });
  }

  validarUsuarioV2(nombreUsuario: string, clave: string): boolean {
    // Buscar un usuario con el nombre de usuario especificado y su clave correspondiente.
    const usuarioIndex = this.usuarios.findIndex(user => user.nombreUsuario === nombreUsuario && user.clave === clave);

    return usuarioIndex !== -1;
  } 

  validarUsuarioV3(nombreUsuario: string, clave: string){

    const usuarioIndex = this.usuarios.findIndex(user => user.nombreUsuario === nombreUsuario && user.clave === clave);

    if(usuarioIndex == -1){
      console.log('Usuario o contrasena incorrecta');
    }else{
      this.goHome();
      
    }

  }
  
  listarUsuarios(){

    if (this.usuarios.length === 0) {
      console.log("No hay transacciones para mostrar.");
      return;
    }

    console.log("Lista de transacciones:");
    this.usuarios.forEach(usuarios => {
        console.log(usuarios);
    });

  }

  validarUsuarioDuplicado(user:any){

    for(let users of this.usuarios){

      if(users.nombreUsuario === user){
        console.log('Usuario ya existe')
        return true;
      }

    }

    return false;
  }

  iniciarSesionUsuario(user:any){

    for(let users of this.usuarios){

      if(users.nombreUsuario === user){

        users.login = true;

      }

    }

    this.guardarListasEnStorage();
    console.log('Lista de usuarios: ',this.usuarios)

  }

  cerrarSesionUsuario(){

    for(let users of this.usuarios){

      users.login = false;
      
    }
    console.log('Lista de usuarios: ',this.usuarios)
    this.guardarListasEnStorage();

  }

  buscarUsuarioActivo(login:any){

    const usuarioEncontrado = this.usuarios.find(x => x.login === login);

    if (!usuarioEncontrado) {
      
      throw new Error(`No se encontró una transacción con ID ${login}`);
    
    }

    return usuarioEncontrado;

  }

}
