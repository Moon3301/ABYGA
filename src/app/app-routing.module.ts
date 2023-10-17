import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'agregar-producto',
    loadChildren: () => import('./agregar-producto/agregar-producto.module').then( m => m.AgregarProductoPageModule)
  },
  {
    path: 'venta-producto',
    loadChildren: () => import('./venta-producto/venta-producto.module').then( m => m.VentaProductoPageModule)
  },
  {
    path: 'menuopciones',
    loadChildren: () => import('./menuopciones/menuopciones.module').then( m => m.MenuopcionesPageModule)
  },
  {
    path: 'historial-transacciones',
    loadChildren: () => import('./historial-transacciones/historial-transacciones.module').then( m => m.HistorialTransaccionesPageModule)
  },
  {
    path: 'cuenta-usuario',
    loadChildren: () => import('./cuenta-usuario/cuenta-usuario.module').then( m => m.CuentaUsuarioPageModule)
  },
  {
    path: ':id',
    loadChildren: () => import('./agregar-transaccion/agregar-transaccion.module').then( m => m.AgregarTransaccionPageModule)
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
