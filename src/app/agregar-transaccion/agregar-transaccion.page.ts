import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { faGasPump, faCarOn, faSchool, faBuildingColumns } from '@fortawesome/free-solid-svg-icons';

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


  IconTransaccion:string = "remove-circle-outline"
  
  isModalOpen = false;

  

  constructor(private router:Router) { }

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
}
