import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { CrudTransaccionesService } from '../crud-transacciones.service';

import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill, 
  faEllipsis, faClock, faList,faBarcode, faImage, faMagnifyingGlass, faCalculator, faMoneyBill1Wave, 
  faWandMagic, faCashRegister, faTrashCan} from '@fortawesome/free-solid-svg-icons';
  
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { CrudProductosService } from '../crud-productos.service';

// Importa el módulo 'Object'


interface ProductoAgrupado {
  id: number;
  productos: any[];
}

@Component({
  selector: 'app-agregar-transaccion',
  templateUrl: './agregar-transaccion.page.html',
  styleUrls: ['./agregar-transaccion.page.scss'],
})



export class AgregarTransaccionPage implements OnInit {

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
  faBarcode = faBarcode;
  faImage = faImage;
  faMagnifyingGlass = faMagnifyingGlass;
  faCalculator = faCalculator;
  faMoneyBill1Wave = faMoneyBill1Wave
  faWandMagic = faWandMagic
  faCashRegister = faCashRegister
  faTrashCan = faTrashCan

  // Camera

  photos: string[] = [];

  // Modificar
  GetData:any

  // Toolbar

  colorToolbar:any
  
  // Nombre Transaccion
  NameTransaccion:any

  // Monto Transaccion
  MontoTransaccion:any
  
  //
  selectedDate:any;

  currentDate:any = new Date();

  // tab
  tab1Selected: boolean = true;
  tab2Selected: boolean = true;

  // SelectOption Tipo transaccion

  selectedOptionTipoTran: any;

  // SelectOption Frecuencia

  selectedOptionFrecuencia: any;

  // Descripcion

  descripcion:any



  // Icon Ionic
  IconTransaccion:any = faCircleMinus;
  
  // Abrir, Cerrar Modal
  isModalOpenCategoria = false;
 
  // Cambiar Color Gastos e ingresos

  colorGastos:any
  colorIngresos:any

  selected:any

  CodeData:any

  productosAgrupados: { [id: string]: any } = {}

  constructor(private router:Router, public crud:CrudTransaccionesService,private activatedRouter: ActivatedRoute, public crudP:CrudProductosService ) { }

  // Variables dinamicas para categoria

  // Id Categoria
  IdCat:any
  // Categoria
  NombreCat:any = ""

  // Id Subcategoria
  IdSubCat:any

  //SubCategoria
  NombreSubCat:any = "categoria"
  // Icono Categoria
  IconCat: any = faList

  // Indica el tipo de transaccion ej: Ingresos o Gastos
  TipoTrans: any

  // Alert
  isToastOpenEliminar = false;
  isToastOpenValidarInput = false;

  ArrayCategoriasGastos:any = [] = [

    {id:1,name:"Transporte",sub:[{id:1,nameSub:"Combustible", icon:faGasPump},{id:2,nameSub:"Mantenimiento", icon:faCarOn}]},
    {id:2,name:"Hogar",sub:[{id:1,nameSub:"Colegio", icon:faSchool},{id:2,nameSub:"Medicamentos", icon:faCapsules},{id:3,nameSub:"Ropa", icon:faShirt},{id:4,nameSub:"Supermercado", icon:faStore}]},
    {id:3,name:"Entretenimiento", sub:[{id:1,nameSub:"Cine", icon:faFilm},{id:2, nameSub:"Juegos", icon:faGamepad},{id:3,nameSub:"Restaurante",icon:faUtensils},{id:4,nameSub:"Compras", icon:faCartShopping},{id:5,nameSub:"Deportes",icon:faBicycle},{id:6,nameSub:"Vacaciones",icon:faPlaneDeparture},{id:7,nameSub:"Libros",icon:faBookOpen}]}
  
  ]

  ArrayCategoriasIngresos:any = [] = [
    {id:1,name:"Empleador", sub:[{id:1,nameSub:"Bono", icon:faMoneyBill},{id:2,nameSub:"Salario",icon:faMoneyBillTrendUp}]},
    {id:2,name:"Ventas", sub:[{id:1,nameSub:"Productos",icon:faCashRegister}]},
    {id:3,name:"Otros", sub:[{id:1,nameSub:"Otros",icon:faEllipsis}]}

  ]

  ArrayCheckBox:any = [] = [
    {id:1,name:'checkDiario',check:false,color:'primary'},
    {id:2,name:'checkSemanal',check:false,color:'success'},
    {id:3,name:'checkMensual',check:false,color:'danger'},
    {id:4,name:'checkAnual',check:false,color:'warning'},

  ]

  ArrayFrecuencia:any = [] = [

    {value: 'Diaria', viewValue: 'Diario'},
    {value: 'Semanal', viewValue: 'Semanal'},
    {value: 'Mensual', viewValue: 'Mensual'},
    {value: 'Anual', viewValue: 'Anual'},

  ]

  ArrayTipoTrans:any = [] = [

    {value: 'Efectivo', viewValue: 'Efectivo'},
    {value: 'Tarjeta', viewValue: 'Tarjeta'},
   
  ]

  ngOnInit() {

    console.log()
    
    // Se definen los valores que tendran por defecto los parametros de agregar transaccion. (Gasto)
    if(this.crud.ActiveModificarTransaccion == true){

      this.productosTransaccion();

      this.GetData = this.crud.GetDataModificar();

      // PENDIENTE COMPLETAR TODOS LOS DATOS (name,monto,categoria,etc)
      this.NameTransaccion = this.GetData.nombre
      this.MontoTransaccion = this.GetData.monto
      this.selectedDate = this.GetData.fecha;
      this.descripcion = this.GetData.notas;
      this.TipoTrans = this.GetData.tipo_transaccion
      this.NombreCat = this.GetData.categoria[0].nombre
      this.NombreSubCat = this.GetData.categoria[0].subCategoria[0].nombre


      console.log(this.GetData)
    }

    // Se definen los valores que tendran por defecto los parametros de agregar transaccion. (Gasto)
    this.OptionGasto();
    
    // Se Obtiene la fecha actual en la zona horaria local
    const currentDate = new Date();
    const offset = currentDate.getTimezoneOffset();
    currentDate.setMinutes(currentDate.getMinutes() - offset);
    
    // Formatea y asigna la fecha en el formato ISO 8601
    this.selectedDate = currentDate.toISOString().slice(0, 19);

    this.activatedRouter.paramMap.subscribe(paramMap =>{
      const id = paramMap.get('id');
      this.TipoTrans = id;
    })

    console.log(this.TipoTrans);

    if(this.TipoTrans == 'Ingresos'){
      this.OptionIngreso();
    }
    if(this.TipoTrans == 'Egresos'){
      this.OptionGasto();
    }

  }

  ionViewWillEnter(){
    

  }

  //Agregar Registro al CRUD
  AddTransaccion(){

    let producto:any

    if(this.MontoTransaccion == null || this.MontoTransaccion.length == 0){

      console.log('Falta completar el monto')
      this.ToastValidarInput(true);
    }else{

      if(this.crud.ActiveModificarTransaccion == false){

        this.crud.AgregarTransaccion(this.crud.transacciones.length+1,this.NameTransaccion,this.MontoTransaccion,
        'Pendiente',this.ConvertirFecha(this.selectedDate),this.descripcion,this.TipoTrans,[{id:1,nombre:this.selectedOptionTipoTran}],[{id:this.IdCat,nombre:this.NombreCat,subCategoria:[{id:this.IdSubCat,nombre:this.NombreSubCat, icon:this.IconCat}]}],producto)
          
      }else{
        console.log('Modificar Transaccion activado ! ')
        this.crud.ModificarTransaccion(this.GetData.id,this.NameTransaccion,this.MontoTransaccion,'Pendiente',this.ConvertirFecha(this.selectedDate),this.descripcion,this.TipoTrans,[{id:1,nombre:this.selectedOptionTipoTran}],[{id:this.IdCat,nombre:this.NombreCat,subCategoria:[{id:this.IdSubCat,nombre:this.NombreSubCat, icon:this.IconCat}]}])
      }
  
      this.GoHome();
    }
    
    

  }

  // Convierte la fecha a formato : 
  ConvertirFecha(date:any): string{

    const fecha = new Date(date);
    return fecha.toLocaleDateString('es',{ weekday:'short',day:'2-digit', month:'long', year:'numeric'})
    
  }

  // Cambios en el Tab
  onTabChange(ev:any){

    console.log(ev.tab.textLabel);

  }



  // Open Modal
  setOpenCategoria(isOpen: boolean) {
    this.isModalOpenCategoria = isOpen;
  }

  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])
    this.ResetData();
    this.crud.ActiveModificarTransaccion = false;

  }

  ChangeTransaccion(ev:any){

    console.log(ev.detail)
    
  }

  ChangeCategoria(dataCat:string, dataSubCat:string, changeIcon: any, id:any, idSub:any){ 

    // Cerrar Modal
    this.isModalOpenCategoria = false;

    // Asignar nombre categoria 
    this.NombreCat = dataCat

    // Asignar nombre SubCategoria
    this.NombreSubCat = dataSubCat

    // Asignar icono de categoria
    this.IconCat = changeIcon

    // Asignar id a la categoria
    this.IdCat = id

    // Asginar id a la subcategoria
    this.IdSubCat = idSub

  }

  OptionGasto(){

    this.IconTransaccion = faCircleMinus;
    this.colorToolbar = '#292E49'
  }

  OptionIngreso(){

    this.IconTransaccion = faCirclePlus;
    this.colorToolbar = '#1C2833'
  }

  ResetData(){

    //Clear Name
    this.NameTransaccion = ''
    //Clear Monto
    this.MontoTransaccion = null
    //Clear Categoria
    this.NombreCat = 'Categoria'
    this.NombreSubCat = 'Subcategoria'
    this.IconCat = faList
    // Clear Tipo Transaccion
    this.selectedOptionTipoTran = null
    // Clear Frecuencia
    this.selectedOptionFrecuencia = null

   

  }

  ChangeOptionTransaccion(data:any){

    if(data == 1){
      
      // Se asignan los datos iniciales del gasto
      this.OptionGasto();
      
      //Reset
      this.ResetData();
    }

    if(data == 2){
      
      // Se asignan los datos iniciales del ingreso
      this.OptionIngreso();
      
      //Reset
      this.ResetData();
    }

  }

  //CheckBox
  ChangeOption(ev:any){

    for(let item of this.ArrayCheckBox){
      if(item.name != ev.detail.value){
        item.check = false
      }
      
    }

  }

  EliminarTransaccion(){

    this.crud.EliminarTransaccion(this.GetData.id);
    this.ToastEliminarTransaccion(true);
    this.GoHome();

  }

  ToastEliminarTransaccion(isOpen: boolean) {
    this.isToastOpenEliminar = isOpen;
  }

  ToastValidarInput(isOpen:boolean) {
    this.isToastOpenValidarInput = isOpen;
  }



  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
        console.log('Accion cancelada');
      },
    },
    {
      text: 'OK',
      role: 'confirm',
      handler: () => {
        this.EliminarTransaccion();
        console.log('Transaccion eliminada');
      },
    },
  ];

  setResult(ev:any) {
    console.log(`Dismissed with role: ${ev.detail.role}`);
  }


  agruparProductos(id:any){


  }

  productosTransaccion(){

    for(let transaccion of this.crud.transacciones){
      for(const key in transaccion.producto){
        if(transaccion.producto.hasOwnProperty(key)){

          const idProducto = Number(key);

          const productoInventario = this.crudP.MostrarProducto(Number(key));

          if (!this.productosAgrupados[idProducto]) {
            // Si aún no existe un arreglo para este ID, créalo
            this.productosAgrupados[idProducto] = [];
          }
  
          this.productosAgrupados[idProducto].push(productoInventario);

          console.log(this.productosAgrupados)

        }

      }

    }

  }


}
