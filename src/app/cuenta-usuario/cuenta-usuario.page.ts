import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { ActivatedRoute,Router } from '@angular/router';
import { ApirestService } from '../apirest.service';

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

    tipoSuscripcion: 'Mensual',
    precioMensual: 1590,
    precioAnual: 15990,
    
  }

  SuscripcionPremium:any = {

    tipoSuscripcion: 'Anual',
    precioMensual: 2290,
    precioAnual: 22990,
    
  }

  //modal
  isModalOpenSuscripciones = false;
  isModalOpenPago = false;

  previousSlideIndex: number = 0;

  // Datos WebPay

  token: string = '';
  url: string = '';



  constructor(private router:Router, private api:ApirestService) { }

  ngOnInit() {
    

    this.precioMensualSuscripcion = this.SuscripcionPlus.precioMensual;
    this.precioAnualSuscripcion = this.SuscripcionPlus.precioAnual;

    this.CambiarSuscripcion = this.SuscripcionActual;
  }

  setOpenSuscripciones(isOpen: boolean) {
    this.isModalOpenSuscripciones = isOpen;
  }

  setOpenPago(isOpen: boolean) {
    this.isModalOpenPago = isOpen;
    this.realizarPago();
    
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

    }

    if(indexSwiper == 1){

      this.precioMensualSuscripcion = this.SuscripcionPremium.precioMensual;

      this.precioAnualSuscripcion = this.SuscripcionPremium.precioAnual;

    }

  }

  SeleccionSuscripcion(data:any){

    this.SusPlus = false;
    this.SusPremium = false;

    if (data === 'plus') {

      this.SusPlus = true;

      this.CambiarSuscripcion = this.SuscripcionPlus.tipoSuscripcion

    } else if (data === 'premium') {

      this.SusPremium = true;

      this.CambiarSuscripcion = this.SuscripcionPremium.tipoSuscripcion;

    }

  }

  realizarPago() {
    const data = {
      buyOrder: 'O-12345W10398',
      sessionId: 'S-6789045666778',
      amount: 1500,
      returnUrl: 'http://tbk-node-test.continuumhq.dev/webpay_plus/commit'
    };
  
    this.api.pagarWebpay(data).subscribe((response: any) => {
      this.token = response.token;
      this.url = response.url;
      
      console.log('Token:' + this.token);
      console.log('URL:' + this.url);
  
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

