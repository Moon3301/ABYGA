import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-agregar-transaccion',
  templateUrl: './agregar-transaccion.page.html',
  styleUrls: ['./agregar-transaccion.page.scss'],
})
export class AgregarTransaccionPage implements OnInit {

  //Icons
  faGasPump = faGasPump;
  faCarOn = faCarOn;
  faSchool= faSchool;
  faBuildingColumns = faBuildingColumns;
  faCapsules = faCapsules;
  faShirt = faShirt;
  faStore = faStore;
  faFilm = faFilm;
  faGamepad = faGamepad;
  faUtensils = faUtensils;
  faCartShopping = faCartShopping;
  faBicycle = faBicycle;
  faPlaneDeparture = faPlaneDeparture;
  faBookOpen = faBookOpen;
  faDroplet = faDroplet;
  faLightbulb = faLightbulb;
  faWifi = faWifi;
  faFireFlameSimple = faFireFlameSimple;



  IconTransaccion:string = "remove-circle-outline"
  
  isModalOpen = false;

  

  constructor(private router:Router) { }

  NombreCat:any = "Categoria"

  NombreSubCat:any = "caca"

  IconCat: any = "apps-outline"


  


  ngOnInit() {

  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  GoHome(){
    
    this.router.navigate(['home'])

  }

  ChangeIconTransaccion(){

    //"add-circle-outline"


  }

  ChangeCategoria(dataCat:string, dataSubCat:string, changeIcon: string){ 

    this.isModalOpen = false;

    this.NombreCat = dataCat

    this.NombreSubCat = dataSubCat

    this.IconCat = changeIcon

  }



}
