import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { CrudTransaccionesService } from '../crud-transacciones.service';
import { AlertController } from '@ionic/angular';

import { faGasPump, faCarOn, faSchool, faBuildingColumns, faCapsules, faShirt, faStore, faFilm, faGamepad, faUtensils,
  faCartShopping, faBicycle, faPlaneDeparture, faBookOpen, faDroplet, faLightbulb, faWifi, faFireFlameSimple,
  faCircleMinus, faCirclePlus, faCalendarDays, faFileSignature, faMoneyBillTrendUp, faMoneyBill, 
  faEllipsis, faClock, faList,faBarcode, faImage, faMagnifyingGlass, faCalculator, faMoneyBill1Wave,
  faWandMagic, faCamera, faCubesStacked, faBroom, faBreadSlice, faPumpSoap} from '@fortawesome/free-solid-svg-icons';
  
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';

import { Barcode, BarcodeFormat, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

import { CrudProductosService } from '../crud-productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.page.html',
  styleUrls: ['./agregar-producto.page.scss'],
})
export class AgregarProductoPage implements OnInit {

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
  faCamera = faCamera
  faCubesStacked = faCubesStacked
  faBroom = faBroom
  faBreadSlice = faBreadSlice
  faPumpSoap = faPumpSoap

  // Almacenamiento Camera

  currentPhoto: string = '';

  // 
  codigoBarras:any
  nombreProducto:any
  precioProducto:any
  costoProducto:any
  cantidadProducto:any
  UnidadMedida:any = 'Unidad'
  fechActual:any
  estado:any

  // Abrir, Cerrar Modal
  isModalOpenCategoria = false;

  // Categoria

  idCategoria:any

  nombreCategoria:any = "Categoria"

  iconCategoria:any = faList

  ArrayCategoriaProducto:any = [] = [

    {id:1, nombre:'Alimentos y bebidas',icon:faCubesStacked},
    {id:2, nombre:'Productos limpieza',icon:faBroom},
    {id:3, nombre:'Panaderia y pasteleria',icon:faBreadSlice},
    {id:4, nombre:'Higiene personal',icon: faPumpSoap},
    //COMPLETAR...

  ]

  isSupported = false;
  barcodes: Barcode[] = [];

  public code: string = "";

  // Button alert stock
  public alertButtons = ['OK'];

  
  public alertInputs = [

    {
      type: 'number',
      placeholder: 'Stock',
      min: 1,
      max: 100000,
      
    }
  ];

  //Modificar
  GetData:any

  constructor(private router:Router, private crudP:CrudProductosService,private activatedRouter: ActivatedRoute,private alertController: AlertController  ) { }

  ngOnInit() {

    if(this.crudP.ActiveModificarProducto == true){
      this.GetData = this.crudP.GetDataModificar();

      // PENDIENTE COMPLETAR TODOS LOS DATOS (name,monto,categoria,etc)
      this.code = this.GetData.id;
      this.nombreProducto = this.GetData.nombre;
      this.precioProducto = this.GetData.precio;
      this.costoProducto = this.GetData.costo;
      this.cantidadProducto = this.GetData.stock;
      this.UnidadMedida = this.GetData.unidadMedida;

      this.ChangeCategoria(this.GetData.categoria[0].id,this.GetData.categoria[0].nombre,this.GetData.categoria[0].icon)
      
      this.currentPhoto = this.GetData.imagen;

      console.log(this.GetData)
    }


    // Verifica que la plataforma es compatible con el Scanner
    
    try{
      BarcodeScanner.isSupported().then((result) => {
        this.isSupported = result.supported;
      });
    }catch(error){

      console.log('Plataforma no compatible con scanner. Codigo: '+error);
    }
    

  }

  setResult(ev:any){

    this.cantidadProducto = ev.detail.data.values[0];

    console.log(ev.detail.data.values[0])

  }

  async scan(): Promise<void> {
    
    const { barcodes } = await BarcodeScanner.scan();

    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async scanCode() {
    // Check camera permission

    await BarcodeScanner.requestPermissions();

    // Check if the Google ML Kit barcode scanner is available
    await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable().then(async (data) => {
        if (data.available) {
            // Start the barcode scanner
            await this.startScanner().then(async (barcodes) => {
                this.code = barcodes[0].rawValue;
                this.scan();
            });
        } else {
            // Install the Google ML Kit barcode scanner
            await BarcodeScanner.installGoogleBarcodeScannerModule().then(async () => {
                await this.startScanner().then(async (barcodes) => {
                    this.code = barcodes[0].rawValue;
                    this.scan();
                });
            });
        }
    });
  }

  MakeCode(){
    
    const randomCode = this.generateRandomBarcode();

    this.code = randomCode;
  }

  generateRandomBarcode() {
    // Aquí puedes implementar la lógica para generar un código de barras aleatorio.
    // Puedes usar Math.random() o cualquier otra estrategia que prefieras.
    // Por ejemplo, generaremos un código de 12 dígitos al azar.
    const characters = '0123456789';
    const codeLength = 12;
    let randomCode = '';

    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }

    return randomCode;
  }

  async startScanner() {
    const { barcodes } = await BarcodeScanner.scan({
        formats: [BarcodeFormat.QrCode, BarcodeFormat.Ean13, ]
    });
    return barcodes;
  }


  public async NewPhoto(){

    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
      
    })

    if (fotoCapturada.webPath) {
      
      this.currentPhoto = fotoCapturada.webPath
    }

  }

  public async GetPhoto(){

    const fotoCapturada = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
      quality: 100
      
    })

    if (fotoCapturada.webPath) {
      this.currentPhoto = fotoCapturada.webPath
    }

  }

  AddProducto(){

    if(this.crudP.ActiveModificarProducto == false){

      const fechActual = new Date();

      this.crudP.agregarProducto(Number(this.code),this.nombreProducto,this.precioProducto,this.costoProducto,
      this.cantidadProducto,this.UnidadMedida,this.fechActual,fechActual,this.currentPhoto,true,'',
      [{id:this.idCategoria,nombre:this.nombreCategoria,icon:this.iconCategoria}])

    }else{

      const fechaActual = new Date();

      const registro  = this.crudP.GetDataModificar();
      const registroFecha = registro.fechaCreacion
      
      if(registro.cantidadProducto <= 0){
        this.estado = false;
      }else{
        this.estado = true;
      }

      this.crudP.modificarProducto(this.code,this.nombreProducto,this.precioProducto,this.costoProducto,
      this.cantidadProducto,this.UnidadMedida,registroFecha,fechaActual,this.currentPhoto,this.estado,'',
      [{id:this.idCategoria,nombre:this.nombreCategoria,icon:this.iconCategoria}])

    }

    this.GoHome();
    
  }

  GoHome(){
    
    // Retroceder a page 'Home'
    this.router.navigate(['home'])
    this.crudP.ActiveModificarProducto = false;
    this.ResetData();

  }

  setOpenCategoria(isOpen: boolean) {
    this.isModalOpenCategoria = isOpen;
  }

  ChangeCategoria(id:any,name:any, icon:any){

    this.isModalOpenCategoria = false;

    this.nombreCategoria = name;

    this.iconCategoria = icon

    this.idCategoria = id;

  }

  ResetData(){

    this.nombreCategoria = 'Categoria'
    this.iconCategoria = faList;
    this.idCategoria = null;


    this.currentPhoto = ''
    this.code = ''
    this.codigoBarras = ''
    this.nombreProducto = ''
    this.precioProducto = 0
    this.cantidadProducto = 0

  }

}
