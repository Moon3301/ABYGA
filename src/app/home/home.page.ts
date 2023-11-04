import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Transaccion } from '../transaccion';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute,Router } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType, elements } from 'chart.js';
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

import { CrudUsuariosService } from '../crud-usuarios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
isVisible = false;
  validarRecordatorios : any

  public alertButtons = ['OK'];
  customColors: string[] = ['#FF0D0D', '#0DCFFF', '#B58958', '#FE8AEA', '#733E25','#000000', '#FFE402','#AB1C9A','#003BFF','#3DB033','#89898C','#8ED1BA','#F6880D'];

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
  faMoneyBill1Wave = faMoneyBill1Wave;
  faWandMagic = faWandMagic;
  faCamera = faCamera;
  faCubesStacked = faCubesStacked;
  faBroom = faBroom;
  faBreadSlice = faBreadSlice;
  faPumpSoap = faPumpSoap;
  faCashRegister = faCashRegister;
  faBoxes = faBoxes;
  faArrowRightArrowLeft = faArrowRightArrowLeft;
  faFileCircleCheck = faFileCircleCheck;
  faChartColumn = faChartColumn;
  faGear = faGear;
  faStoreAlt = faStoreAlt;

  matTab:any

  //Variables indicadores
  id:any = 12;
  dataLoaded = false;
  dolar: number=0;
  unidadDeFomento: number=0;
  ipc: number=0;

  // Data Grafico Pie

// Pie
public pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: true, // Esto permite controlar el aspecto del gráfico
  aspectRatio: 1.2, // Puedes ajustar este valor para cambiar el tamaño del gráfico
  elements:{
    arc: {
      backgroundColor: this.customColors
    }
  },
  plugins:{

    legend:{
      position:'left'
    }

  },

};

  public pieChartLabels = [ [ 'Alimentos y bebidas' ], [ 'Limpieza' ], ['Panaderia'],['Higiene Personal'],['Comida para mascotas'] ,[ 'Tecnologia y accesorios' ],
  [ 'Articulos escolares' ],[ 'Ropa y moda' ],[ 'Jugueteria y entretenimiento' ],[ 'Frutas y verduras' ],[ 'Materiales de construccion' ],[ 'Deporte' ],[ 'Accesorios varios' ], ];
  
  public pieChartDatasets = [ {
    data: [ 
            this.crudP.totalNetoCategorias['Alimentos y bebidas'].valorTotal,
            this.crudP.totalNetoCategorias['Productos limpieza'].valorTotal,
            this.crudP.totalNetoCategorias['Panaderia y pasteleria'].valorTotal,
            this.crudP.totalNetoCategorias['Higiene personal'].valorTotal,
            this.crudP.totalNetoCategorias['Comida para mascotas'].valorTotal,
            this.crudP.totalNetoCategorias['Tecnologia y accesorios'].valorTotal,
            this.crudP.totalNetoCategorias['Articulos escolares'].valorTotal,
            this.crudP.totalNetoCategorias['Ropa y moda'].valorTotal,
            this.crudP.totalNetoCategorias['Jugueteria y entretenimiento'].valorTotal,
            this.crudP.totalNetoCategorias['Frutas y verduras'].valorTotal,
            this.crudP.totalNetoCategorias['Materiales de construccion'].valorTotal,
            this.crudP.totalNetoCategorias['Deporte'].valorTotal,
            this.crudP.totalNetoCategorias['Accesorios varios'].valorTotal,

          ]
    
  }
  
 ];

  public pieChartLegend = true;

  public pieChartPlugins = [];

  title = 'ng2-charts-demo';

  // Chart Line

  public barChartLegend = true;
  public barChartPlugins = [
    
  ];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    
    labels: [ 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom' ],
    
    datasets: [
      { data: [ this.crud.totalNetoDia['lun'].totalEgresos,
                this.crud.totalNetoDia['mar'].totalEgresos,
                this.crud.totalNetoDia['mié'].totalEgresos,
                this.crud.totalNetoDia['jue'].totalEgresos,
                this.crud.totalNetoDia['vie'].totalEgresos,
                this.crud.totalNetoDia['sáb'].totalEgresos,
                this.crud.totalNetoDia['dom'].totalEgresos ], label: 'Egresos' },
                
      { data: [ this.crud.totalNetoDia['lun'].totalIngresos,
                this.crud.totalNetoDia['mar'].totalIngresos,
                this.crud.totalNetoDia['mié'].totalIngresos,
                this.crud.totalNetoDia['jue'].totalIngresos,
                this.crud.totalNetoDia['vie'].totalIngresos,
                this.crud.totalNetoDia['sáb'].totalIngresos,
                this.crud.totalNetoDia['dom'].totalIngresos ], label: 'Ingresos' }

    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  
    elements:{
      
      arc: {
        backgroundColor: this.customColors
        
      }
    },
    maintainAspectRatio: true, // Esto permite controlar el aspecto del gráfico
    aspectRatio: 1.2, // Puedes ajustar este valor para cambiar el tamaño del gráfico
  };

  constructor(public router:Router, public crud:CrudTransaccionesService, public http: HttpClient, public crudP:CrudProductosService, public api:ApirestService, public crudU:CrudUsuariosService) {
    

  }

  ngOnInit(){
    this.crud.obtenerNotificaciones();
 
    this.nombreUsuario = this.crudU.nombreUsuario;
    
    /*
    this.api.getUsers().subscribe(
      (data) => {
        console.log(data)
      },
      (error) => {
        console.log('Error al obtener los datos del usuario.', error)
      }

    )
      */
  
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }



  ionViewWillEnter(){

    this.crud.obtenerNotificaciones();

    this.updateDataPieChart();

    this.updateDataLineChart();

    this.nombreUsuario = this.crudU.nombreUsuario;
    


  }

  updateDataPieChart(){
    // Actualizar valores del grafico
    const categorias = Object.keys(this.crudP.totalNetoCategorias);
    const valores = categorias.map(categoria => this.crudP.totalNetoCategorias[categoria].valorTotal);

    this.pieChartDatasets = [{
      data: valores
    }];

  }

  updateDataLineChart(){

    // Valores ingresos
    const fechasIngresos = Object.keys(this.crud.totalNetoDia);
    const valoresIngresos = fechasIngresos.map(fecha => this.crud.totalNetoDia[fecha].totalIngresos)


    // Valores Egresos
    const fechasEgresos = Object.keys(this.crud.totalNetoDia);
    const valoresEgresos = fechasEgresos.map(fecha => this.crud.totalNetoDia[fecha].totalEgresos)
        
    console.log(this.barChartData);

    const labels = [ 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom' ];

    this.barChartData = {
      labels: labels,
      datasets: [
        {
          data: valoresEgresos,
          label: 'Egresos'
        },
        {
          data: valoresIngresos,
          label: 'Ingresos'
        }
        // Puedes añadir más datasets si es necesario
      ]
    }
    
  }

  
  
  

  // 

  formatearMonto(monto: number): string {
    // Formatear el monto como desees (sin los dos últimos ceros y con punto en lugar de coma)
    return monto.toFixed(2).replace(/\./, ',').replace(/,00$/, '').replace(/,/, '.');
  }


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



  onSlideChange(event:any){

    const indexSwiper = event.detail[0].activeIndex;

    if(indexSwiper == 0){
      console.log(event.detail)
   

    }

    if(indexSwiper == 1){

   

    }

    if(indexSwiper == 2){

   

    }
    if(indexSwiper == 3){

      this.crud.obtenerNotificaciones();

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
        case 'recordatorios':
          slideIndex = 3;
          break;
        // Añade más casos si tienes más diapositivas
      }

      swiper.slideTo(slideIndex);
    }
  }
  

}
