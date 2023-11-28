import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popover-ia',
  templateUrl: './popover-ia.component.html',
  styleUrls: ['./popover-ia.component.scss'],
  standalone: true,
  imports: [IonicModule, NzButtonModule, CommonModule]
})
export class PopoverIAComponent  implements OnInit {

  @ViewChild('popover') popover: any;

  isOpenPrincipal = false;

  openPrincipal = true;

  openTransaccion = false;
  openEgresos = false;
  openIngresos = false;

  openInventario = false;

  openVentas = false;

  openDocumentos = false;

  openReportes = false;

  openRecordatorios = false;


  constructor(public router:Router) { }

  ngOnInit() {}

  presentPopover(e: Event) {

    this.popover.event = e;

    this.isOpenPrincipal = true;
    this.openPrincipal = true;

    this.openTransaccion = false;
    this.openEgresos = false;
    this.openIngresos = false;

    this.openInventario = false;

    this.openVentas = false;

    this.openDocumentos = false;

    this.openReportes = false;

    this.openRecordatorios = false;

  }

  isOpenTransaccion(){
    
    this.openPrincipal = false;
    this.openTransaccion = true;

  }

  isOpenIngresos(){

    this.openTransaccion = false;
    this.openIngresos = true;
  }

  isOpenEgresos(){

    this.openTransaccion = false;
    this.openEgresos = true;
  }

  isOpenInventario(){
    this.openPrincipal = false;
    this.openInventario = true;
  }

  isOpenVentas(){
    this.openPrincipal = false;
    this.openVentas = true;
  }

  isOpenDocumentos(){
    this.openPrincipal = false;
    this.openDocumentos = true;
  }

  isOpenReportes(){
    this.openPrincipal = false;
    this.openReportes = true;
  }

  isOpenRecordatorios(){
    this.openPrincipal = false;
    this.openRecordatorios = true;
  }

  goIngresos(){
    
    this.isOpenPrincipal = false;
    this.router.navigate(['/','Ingresos']);
    
  }

  goEgresos(){
    
    this.isOpenPrincipal = false;
    this.router.navigate(['/','Egresos']);
  }

  goInsumos(){
    this.router.navigate(['agregar-producto']);
  }

  goVentas(){
    this.router.navigate(['venta-producto']);
  }

  goDocumentos(){
    this.router.navigate(['documentos']);
  }

  goReportes(){
    this.router.navigate(['reportes']);
  }

}
