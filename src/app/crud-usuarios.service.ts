import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CrudUsuariosService {

  public usuarios: Usuario[] = [];

  constructor(private storage: Storage) {

    this.initStorage();
    this.cargarListasDesdeStorage();

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

  agregarUsuario(id:any, nombreUsuario:any, correo:any, clave:any, telefono:any,foto:any ){

    if (this.usuarios.find(x => x.id === id)) {return};

    this.usuarios.push({id,nombreUsuario,correo,clave,telefono,foto})

    this.guardarListasEnStorage();

  }

  modificarUsuario(id:any, nombreUsuario:any, correo:any, clave:any, telefono:any,foto:any){

    const index = this.usuarios.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    this.usuarios[index].id = id
    this.usuarios[index].nombreUsuario = nombreUsuario
    this.usuarios[index].correo = correo
    this.usuarios[index].clave = clave
    this.usuarios[index].telefono = telefono
    this.usuarios[index].foto = foto

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

  validarUsuario(user: any, pass: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        // Validar usuario
        const usuarioEncontrado = this.usuarios.find(x => x.nombreUsuario === user);
  
        if (!usuarioEncontrado) {
          throw new Error(`No se encontró un usuario con el nombre ${user}`);
        }
  
        // Validar clave
        const claveCorrecta = this.usuarios.find(x => x.clave === pass);
  
        if (!claveCorrecta) {
          throw new Error('Contraseña incorrecta');
        }
  
        // Si el usuario es correcto y la clave es correcta, resolvemos la promesa con true
        if (usuarioEncontrado && claveCorrecta) {
          resolve(true);
        } else {
          resolve(false);
        }
      } catch (error) {
        reject(error); // Rechaza la promesa en caso de error
      }
    });
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

}
