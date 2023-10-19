import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Transaccion } from '../transaccion';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute,Router } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { CrudTransaccionesService } from '../crud-transacciones.service';
import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill, 
  faEllipsis, faClock, faList, faDollar, faScaleBalanced, faChartLine, faMagnifyingGlassChart, faCalculator, faMoneyBill1Wave,
  faWandMagic, faCamera, faCubesStacked, faBroom, faBreadSlice, faPumpSoap, faCashRegister, faBoxes, faArrowRightArrowLeft, faFileCircleCheck,
  faChartColumn, faGear,faStoreAlt } from '@fortawesome/free-solid-svg-icons';

import { MatTabChangeEvent } from '@angular/material/tabs';

import { HttpClient } from '@angular/common/http';

import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

import { CrudProductosService } from '../crud-productos.service';

import { ApirestService } from '../apirest.service';

import { Swiper } from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public alertButtons = ['OK'];
  nombreUsuario:any="Gabriela";

  @ViewChild(IonModal)
  modal!: IonModal;

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;


  //Icons font-awesome
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
  faCircleMinus = faCircleMinus;
  faCirclePlus = faCirclePlus;
  faCalendarDays = faCalendarDays;
  faFileSignature = faFileSignature;
  faMoneyBillTrendUp = faMoneyBillTrendUp;
  faMoneyBill = faMoneyBill;
  faEllipsis = faEllipsis;
  faClock = faClock;
  faList = faList;
  faDollar = faDollar;
  faScaleBalanced = faScaleBalanced;
  faChartLine = faChartLine;
  faMagnifyingGlassChart = faMagnifyingGlassChart;
  faCalculator = faCalculator;
  faMoneyBill1Wave = faMoneyBill1Wave
  faWandMagic = faWandMagic
  faCamera = faCamera
  faCubesStacked = faCubesStacked
  faBroom = faBroom
  faBreadSlice = faBreadSlice
  faPumpSoap = faPumpSoap
  faCashRegister = faCashRegister
  faBoxes = faBoxes
  faArrowRightArrowLeft = faArrowRightArrowLeft
  faFileCircleCheck = faFileCircleCheck
  faChartColumn = faChartColumn
  faGear = faGear
  faStoreAlt = faStoreAlt

  matTab:any

  //Variables indicadores
  id:any = 12;
  dataLoaded = false;
  dolar: number=0;
  unidadDeFomento: number=0;
  ipc: number=0;

  constructor(private router:Router, public crud:CrudTransaccionesService, public http: HttpClient, public crudP:CrudProductosService, public api:ApirestService) {}

  ngOnInit(){

    
    this.api.getUsers().subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.log('Error al obtener los datos del usuario.', error)
      }

    )

  
  }

  ionViewWillEnter(){
    
  }

  // Chart Donnut

  title = 'ng2-charts-demo';

  // Chart Line

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom' ],
    datasets: [
      { data: [ 37990, 34230, 10430, 81098, 56376, 5575, 4050 ], label: 'Egresos' },
      { data: [ 28690, 5690, 4000, 35690, 75900, 90899, 98769 ], label: 'Ingresos' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  // Radar

  public radarChartOptions: ChartConfiguration<'radar'>['options'] = {
    responsive: false,
  };
  public radarChartLabels: string[] = ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'];

  public radarChartDatasets: ChartConfiguration<'radar'>['data']['datasets'] = [
    { data: [65, 59, 90, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 96, 27, 100], label: 'Series B' }
  ];

  AgregarTransaccion(){

    this.confirm();
    this.router.navigate(['agregar-transaccion'])

  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(null, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      
    }
  }

  GetTransaccion(id:any){
    this.crud.GetModificarTransaccion(id);
    this.crud.ActiveModificarTransaccion = true;
  }

  GetProducto(id:any){

    this.crudP.GetModificarProducto(id);
    this.crudP.ActiveModificarProducto = true;

  }

  GoPageProducto(){
    this.router.navigate(['agregar-producto']);
    this.confirm();
  }

  GoPageVentas(){
    this.router.navigate(['venta-producto']);
    
  }

  onTabChange(event: MatTabChangeEvent): void {
    const tabLabel = event.tab.textLabel; // Obtén el texto de la etiqueta de la pestaña seleccionada
    this.matTab = event.tab.textLabel;
    console.log(`Pestaña seleccionada: ${tabLabel}`);
    
    // Aquí puedes realizar acciones específicas basadas en la pestaña seleccionada
    if (tabLabel === 'PRINCIPAL') {
      // Acciones para la pestaña PRINCIPAL
    } else if (tabLabel === 'TRANSACCIONES') {
      // Acciones para la pestaña TRANSACCIONES
    }
  }

  onSlideChange(event:any){

    const indexSwiper = event.detail[0].activeIndex;

    if(indexSwiper == 0){
      console.log(event.detail)
   

    }

    if(indexSwiper == 1){

   

    }

    if(indexSwiper == 2){

   

    }

  }

  goToSlide(slideName: string) {

    this.matTab = slideName;

    if (this.swiperRef) {
      const swiper = this.swiperRef?.nativeElement.swiper;

      let slideIndex = 0;

      switch (slideName) {
        case 'principal':
          slideIndex = 0;
          break;
        case 'transacciones':
          slideIndex = 1;
          break;
        case 'inventario':
          slideIndex = 2;
          break;
        // Añade más casos si tienes más diapositivas
      }

      swiper.slideTo(slideIndex);
    }
  }

}
