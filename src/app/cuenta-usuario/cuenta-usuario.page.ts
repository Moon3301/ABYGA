import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { ActivatedRoute,Router } from '@angular/router';

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

  previousSlideIndex: number = 0;

  constructor(private router:Router) { }

  ngOnInit() {

    this.precioMensualSuscripcion = this.SuscripcionPlus.precioMensual;
    this.precioAnualSuscripcion = this.SuscripcionPlus.precioAnual;

    this.CambiarSuscripcion = this.SuscripcionActual;
  }

  setOpenSuscripciones(isOpen: boolean) {
    this.isModalOpenSuscripciones = isOpen;
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

}
