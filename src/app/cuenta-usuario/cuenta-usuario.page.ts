import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { ActivatedRoute,Router } from '@angular/router';
import { ApirestService } from '../apirest.service';
import { CrudUsuariosService } from '../crud-usuarios.service';

@Component({
  selector: 'app-cuenta-usuario',
  templateUrl: './cuenta-usuario.page.html',
  styleUrls: ['./cuenta-usuario.page.scss'],
})

export class CuentaUsuarioPage implements OnInit {

  SuscripcionActual:any = 'Gratis'

  CambiarSuscripcion:any

  precioMensualSuscripcion:any
  precioAnualSuscripcion:any
  
  SusPlus:any
  SusPremium:any

  SuscripcionPlus:any = {

    tipoSuscripcion: 'Plus',
    precioMensual: 1590,
    precioAnual: 15990,
    
  }

  SuscripcionPremium:any = {

    tipoSuscripcion: 'Premium',
    precioMensual: 2290,
    precioAnual: 22990,
    
  }

  // SeleccionUsuario
  SuscripcionSeleccionada:any

  //modal
  isModalOpenSuscripciones = false;
  isModalOpenPago = false;
  isModalValidacionSuscripcion = false;

  previousSlideIndex: number = 0;

  // Datos WebPay

  token: string = '';
  url: string = '';

  // validacion suscripcion

  messageValidacion:any
  iconValidacion:any

  tipoSuscripcion:any

  constructor(private router:Router, private api:ApirestService, private route: ActivatedRoute, public crudU:CrudUsuariosService) {

    this.route.queryParams.subscribe(params => {
      const token_ws = params['token_ws'];

      if(token_ws){
        // 
      
        this.api.confirmarWebPay({token_ws}).subscribe((response: any) => {
        
        console.log(response)

        if(response){
          this.setOpenValidacionSuscripcion(true);

          if(response.status == 'AUTHORIZED'){
          
            this.messageValidacion = 'Transaccion realizada con exito'
            
            this.iconValidacion = 'assets/icon/carrito-de-compras.png'

          }else{

            this.messageValidacion = 'Transaccion rechazada'
            
            this.iconValidacion = 'assets/icon/advertencia.png'

          }

        }

      }, (error) => {
        console.error('Error al procesar la transacción de Webpay:', error);
        // Maneja el error apropiadamente
      });

    } 
  
    });
    
  }

  ngOnInit() {
    

    this.precioMensualSuscripcion = this.SuscripcionPlus.precioMensual;
    this.precioAnualSuscripcion = this.SuscripcionPlus.precioAnual;

    this.CambiarSuscripcion = this.SuscripcionActual;
  }

  ionViewWillEnter(){

   

  }

  cerrarSesion(){

    this.crudU.cerrarSesionUsuario();
    
  }

  setOpenSuscripciones(isOpen: boolean) {
    this.isModalOpenSuscripciones = isOpen;
  }

  setOpenPago(isOpen: boolean) {
    this.isModalOpenPago = isOpen;
    this.realizarPago();
    
  }

  setOpenValidacionSuscripcion(isOpen: boolean){
    this.isModalValidacionSuscripcion = isOpen;
  }

  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])
    
  }



  onSlideChange(event:any){

    const indexSwiper = event.detail[0].activeIndex;

    if(indexSwiper == 0){

      this.precioMensualSuscripcion = this.SuscripcionPlus.precioMensual;

      this.precioAnualSuscripcion = this.SuscripcionPlus.precioAnual;

      this.tipoSuscripcion = 'Plus'

    }

    if(indexSwiper == 1){ 

      this.precioMensualSuscripcion = this.SuscripcionPremium.precioMensual;

      this.precioAnualSuscripcion = this.SuscripcionPremium.precioAnual;

      this.tipoSuscripcion = 'Premium'

    }

  }

  SeleccionSuscripcion(data:any){

    this.SusPlus = false;
    this.SusPremium = false;

    if (data === 'mes') {

      this.SusPlus = true;

      this.CambiarSuscripcion = 'Mes'

    } else if (data === 'anio') {

      this.SusPremium = true;

      this.CambiarSuscripcion = 'Anio'

    }

    console.log()

  }

  realizarPago() {

    let precio = 0;

    this.SuscripcionSeleccionada = this.tipoSuscripcion;

    if(this.SuscripcionSeleccionada == 'Plus'){

      if(this.CambiarSuscripcion == 'Mes'){

        precio = 1590;

      }else{

        precio = 15990;

      }
    
    }

    if(this.SuscripcionSeleccionada == 'Plus'){

      if(this.CambiarSuscripcion == 'Mes'){

        precio = 2290;
  
      }else{
  
        precio = 22990;
  
      }

    }
    


    const data = {
      buyOrder: 'O-12345W10398',
      sessionId: 'S-6789045666778',
      amount: 56000,
      returnUrl: 'http://localhost:8100/cuenta-usuario'
    };
  
    this.api.pagarWebpay(data).subscribe((response: any) => {
      this.token = response.token;
      this.url = response.url;
      
      console.log('Token:' + this.token);
      console.log('URL:' + this.url);
      console.log('URL COMPLETA: '+ this.url+'?token_ws='+this.token)
      // Ahora, puedes redirigir al usuario usando window.location.href
    }, (error) => {
      console.error('Error al procesar la transacción de Webpay:', error);
      // Maneja el error apropiadamente
    });
  }

  redirigirUsuario() {
    // Redirige al usuario usando JavaScript
    const urlCompleta = this.url + '?token_ws=' + this.token;
    window.location.href = urlCompleta;
  }

}

