import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

// Import new models and services
import { User, CreateUserDto, LoginDto, UserStatus } from './models/user.model';
import { Business } from './models/business.model';
import { Result, createSuccessResult, createErrorResult } from './models/base.model';
import { AuthenticationService } from './services/authentication.service';
import { NotificationService } from './services/notification.service';
import { NotificationType } from './services/factories/notification.factory';

/**
 * Legacy CRUD service for users - being refactored to use new architecture
 * @deprecated Use AuthenticationService and UserRepository instead
 * This service is maintained for backward compatibility during migration
 */
@Injectable({
  providedIn: 'root'
})
export class CrudUsuariosService {

  /** Legacy users array - will be migrated to new User model */
  public usuarios: any[] = [];

  /** Legacy businesses array */
  public negocios: any[] = [];

  /** Current user ID */
  public idUsuario:any
  
  /** Current business ID */
  public idNegocio:any
  
  /** Currently active user */
  public usuarioActivo: any;
  
  /** Current user's email */
  public correoUsuario: string = '';
  
  /** Current business address */
  public direccionNegocio:string = '';
  
  /** Current business name */
  public nombreNegocio:string = '';
  
  /** System color theme preference */
  public colorSistema: string = '#1C2833';

  /** Current username */
  public nombreUsuario:any

  constructor(
    private storage: Storage, 
    public router: Router,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.initStorage();
    this.cargarListasDesdeStorage();
  }

  /**
   * Navigate to home page
   */
  goHome(){
    this.router.navigate(['home']);
  }

  /**
   * Initialize storage
   * @private
   */
  async initStorage(){
    try {
      await this.storage.create();
    } catch (error) {
      console.error('Failed to initialize storage:', error);
      this.notificationService.showError('Error', 'Failed to initialize storage');
    }
  }

  /**
   * Save user lists to storage
   * @private
   */
  async guardarListasEnStorage() {
    try {
      const listasParaGuardar = {
        usuarios: this.usuarios
      }

      await this.storage.set('listaUsuarios', listasParaGuardar);
    } catch (error) {
      console.error('Failed to save users to storage:', error);
      this.notificationService.showError('Error', 'Failed to save user data');
    }
  }

  /**
   * Load user lists from storage
   * @private
   */
  async cargarListasDesdeStorage() {
    try {
      const listasGuardadas = await this.storage.get('listaUsuarios');

      if (listasGuardadas) {
        this.usuarios = listasGuardadas.usuarios || [];
      }
    } catch (error) {
      console.error('Failed to load users from storage:', error);
      this.notificationService.showError('Error', 'Failed to load user data');
    }
  }

  /**
   * Add a new user (legacy method)
   * @deprecated Use AuthenticationService.register() instead
   */
  agregarUsuario(
    id: any, 
    nombreUsuario: any, 
    correo: any, 
    clave: any, 
    telefono: any, 
    nombreNegocio: any, 
    direccionNegocio: any, 
    login: any
  ): void {
    try {
      // Check if user already exists
      if (this.usuarios.find(x => x.id === id)) {
        this.notificationService.showWarning('Warning', 'User already exists');
        return;
      }

      // Create business
      const idNegocio = this.negocios.length + 1;
      this.negocios.push({ idNegocio, nombreNegocio, direccionNegocio });
      
      const negocio = { idNegocio, nombreNegocio, direccionNegocio };
      
      // Add user
      this.usuarios.push({ id, nombreUsuario, correo, clave, telefono, login, negocio });
      
      this.guardarListasEnStorage();
      this.notificationService.showSuccess('Success', 'User created successfully');
    } catch (error) {
      console.error('Error adding user:', error);
      this.notificationService.showError('Error', 'Failed to create user');
    }
  }

  /**
   * Modify an existing user (legacy method)
   * @deprecated Use UserRepository.update() instead
   */
  modificarUsuario(
    id: any, 
    nombreUsuario: any, 
    correo: any, 
    clave: any, 
    telefono: any, 
    nombreNegocio: any, 
    direccionNegocio: any
  ): void {
    try {
      const index = this.usuarios.findIndex(x => x.id === id);

      if (index === -1) {
        this.notificationService.showError('Error', `User with ID ${id} not found`);
        return;
      }

      const idNegocio = this.negocios.length + 1;
      const negocio = { idNegocio, nombreNegocio, direccionNegocio };

      // Update user properties
      this.usuarios[index].id = id;
      this.usuarios[index].nombreUsuario = nombreUsuario;
      this.usuarios[index].correo = correo;
      this.usuarios[index].clave = clave;
      this.usuarios[index].telefono = telefono;
      this.usuarios[index].negocio = negocio;

      this.guardarListasEnStorage();
      this.notificationService.showSuccess('Success', 'User updated successfully');
    } catch (error) {
      console.error('Error updating user:', error);
      this.notificationService.showError('Error', 'Failed to update user');
    }
  }

  /**
   * Delete a user (legacy method)
   * @deprecated Use UserRepository.delete() instead
   */
  eliminarUsuario(id: number): void {
    try {
      const index = this.usuarios.findIndex(x => x.id === id);

      if (index === -1) {
        this.notificationService.showError('Error', `User with ID ${id} not found`);
        return;
      }

      this.usuarios.splice(index, 1);
      this.guardarListasEnStorage();
      this.notificationService.showSuccess('Success', 'User deleted successfully');
    } catch (error) {
      console.error('Error deleting user:', error);
      this.notificationService.showError('Error', 'Failed to delete user');
    }
  }

  /**
   * Find a user by ID (legacy method)
   * @deprecated Use UserRepository.findById() instead
   */
  buscarUsuario(id: number): any {
    try {
      const usuarioEncontrado = this.usuarios.find(x => x.id === id);

      if (!usuarioEncontrado) {
        this.notificationService.showError('Error', `User with ID ${id} not found`);
        return null;
      }

      return usuarioEncontrado;
    } catch (error) {
      console.error('Error finding user:', error);
      this.notificationService.showError('Error', 'Failed to find user');
      return null;
    }
  }

  /**
   * Validate user credentials (refactored with proper error handling)
   * @param user Username
   * @param pass Password
   * @returns Promise<boolean> indicating if credentials are valid
   */
  async validarUsuario(user: any, pass: any): Promise<boolean> {
    return new Promise(async (resolve) => {
      try {
        // Find user by username
        const usuarioEncontrado = this.usuarios.find(x => x.nombreUsuario == user);
        
        if (!usuarioEncontrado) {
          console.log('User not found:', user);
          resolve(false);
          return;
        }
        
        // Validate password
        const claveCorrecta = usuarioEncontrado.clave === pass;
        
        if (claveCorrecta) {
          this.nombreUsuario = user;
          resolve(true);
        } else {
          console.log('Invalid password for user:', user);
          resolve(false);
        }
      } catch (error) {
        console.error('Error validating user:', error);
        resolve(false);
      }
    });
  }

  /**
   * Alternative user validation method
   * @deprecated Use AuthenticationService.login() instead
   */
  validarUsuarioV2(nombreUsuario: string, clave: string): boolean {
    try {
      const usuarioIndex = this.usuarios.findIndex(
        user => user.nombreUsuario === nombreUsuario && user.clave === clave
      );
      return usuarioIndex !== -1;
    } catch (error) {
      console.error('Error in validarUsuarioV2:', error);
      return false;
    }
  }

  /**
   * Validate user and navigate (legacy method)
   * @deprecated Use AuthenticationService.login() instead
   */
  validarUsuarioV3(nombreUsuario: string, clave: string){
    try {
      const usuarioIndex = this.usuarios.findIndex(
        user => user.nombreUsuario === nombreUsuario && user.clave === clave
      );

      if (usuarioIndex === -1) {
        this.notificationService.showError('Error', 'Invalid username or password');
      } else {
        this.goHome();
      }
    } catch (error) {
      console.error('Error in validarUsuarioV3:', error);
      this.notificationService.showError('Error', 'Validation failed');
    }
  }
  
  /**
   * List all users (legacy method)
   * @deprecated Use UserRepository.findAll() instead
   */
  listarUsuarios(){
    try {
      if (this.usuarios.length === 0) {
        console.log("No users to display.");
        return;
      }

      console.log("User list:");
      this.usuarios.forEach(usuario => {
        console.log(usuario);
      });
    } catch (error) {
      console.error('Error listing users:', error);
    }
  }

  /**
   * Check if username already exists
   * @param user Username to check
   * @returns True if username exists
   */
  validarUsuarioDuplicado(user: any): boolean {
    try {
      for (const users of this.usuarios) {
        if (users.nombreUsuario === user) {
          console.log('Username already exists:', user);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Error checking duplicate username:', error);
      return false;
    }
  }

  /**
   * Set user login status
   * @param user Username
   */
  iniciarSesionUsuario(user: any): void {
    try {
      for (const users of this.usuarios) {
        if (users.nombreUsuario === user) {
          users.login = true;
        }
      }
      this.guardarListasEnStorage();
      console.log('User logged in:', user);
    } catch (error) {
      console.error('Error logging in user:', error);
      this.notificationService.showError('Error', 'Failed to log in user');
    }
  }

  /**
   * Log out all users
   */
  cerrarSesionUsuario(){
    try {
      for (const users of this.usuarios) {
        users.login = false;
      }
      this.guardarListasEnStorage();
      console.log('All users logged out');
    } catch (error) {
      console.error('Error logging out users:', error);
      this.notificationService.showError('Error', 'Failed to log out users');
    }
  }

  /**
   * Find index of active user
   * @returns Index of active user or -1 if none found
   */
  validarUsuarioActivo(): number {
    try {
      return this.usuarios.findIndex(x => x.login === true);
    } catch (error) {
      console.error('Error finding active user:', error);
      return -1;
    }
  }

  /**
   * Set current user data from active user
   */
  dataUsuarioActivo(): void {
    try {
      const usuarioEncontrado = this.usuarios.find(x => x.login === true);

      if (!usuarioEncontrado) {
        console.error('No active user found');
        return;
      }

      this.usuarioActivo = usuarioEncontrado;
    } catch (error) {
      console.error('Error getting active user data:', error);
    }
  }

  /**
   * Find and return active user
   * @returns Active user object or null if none found
   */
  buscarUsuarioActivo(): any {
    try {
      const usuarioEncontrado = this.usuarios.find(x => x.login === true);

      if (!usuarioEncontrado) {
        console.error('No active user found');
        return null;
      }

      // Set user properties
      this.nombreUsuario = usuarioEncontrado.nombreUsuario;
      this.direccionNegocio = usuarioEncontrado.negocio?.direccionNegocio || '';
      this.nombreNegocio = usuarioEncontrado.negocio?.nombreNegocio || '';

      return usuarioEncontrado;
    } catch (error) {
      console.error('Error finding active user:', error);
      return null;
    }
  }
}