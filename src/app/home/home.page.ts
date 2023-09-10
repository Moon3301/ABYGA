import { Component, OnInit } from '@angular/core';
import { Transaccion } from '../transaccion';
import {MatTabsModule} from '@angular/material/tabs';
import { ActivatedRoute,Router } from '@angular/router';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
import { CrudTransaccionesService } from '../crud-transacciones.service';
import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill, 
  faEllipsis, faClock, faList, faDollar, faScaleBalanced, faChartLine } from '@fortawesome/free-solid-svg-icons';
  import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public alertButtons = ['OK'];

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

  //Variables indicadores
  dataLoaded = false;
  dolar: number=0;
  unidadDeFomento: number=0;
  ipc: number=0;

  constructor(private router:Router, public crud:CrudTransaccionesService, public http: HttpClient) {}

  ngOnInit(){
    
    console.log(this.crud.transaccion)
    this.http.get('https://mindicador.cl/api').subscribe((data: any) => {
      this.dolar = data.dolar.valor;
      this.unidadDeFomento = data.uf.valor;
      this.ipc = data.ipc.valor;
      this.dataLoaded = true;
    });

    
  }

  ionViewWillEnter(){
    console.log(this.crud.transaccion)
    console.log(this.crud.transaccionesAgrupadas)
  }


  GetTotalTransaccionesPorFecha(): number{

    let totalGeneral = 0;
    let totalIngresos = 0;
    let totalGastos = 0;

    for(let fecha of this.crud.getFechasAgrupadas()){
      totalIngresos = this.crud.calcularMontoTotal(this.crud.transaccionesAgrupadas[fecha], 'Ingresos')
      totalGastos = this.crud.calcularMontoTotal(this.crud.transaccionesAgrupadas[fecha], 'Gastos')
    }

    totalGeneral = totalIngresos - totalGastos;

    return totalGeneral;
  }

  // Chart Donnut

  title = 'ng2-charts-demo';

  // Doughnut
  public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450, 100 ], label: 'Series A' },
      { data: [ 50, 150, 120 ], label: 'Series B' },
      { data: [ 250, 130, 70 ], label: 'Series C' }
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };

  // Chart Line

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '2006', '2007', '2008', '2009', '2010', '2011', '2012' ],
    datasets: [
      { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
      { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };


  AgregarTransaccion(){

    this.router.navigate(['agregar-transaccion'])

  }

  List(){

    for(let item of this.crud.transaccion){

      
    }



  }




}
