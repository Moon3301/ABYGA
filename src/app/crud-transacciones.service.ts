import { Injectable } from '@angular/core';
import { Transaccion } from './transaccion';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class CrudTransaccionesService {

  public transacciones: Transaccion[] = [];

  transaccionesAgrupadas: { [fecha: string]: Transaccion[] } = {};

  totalIngresosPorFecha: { [fecha: string]: number } = {};
  totalGastosPorFecha: { [fecha: string]: number } = {};

  totalNetoPorFecha: { [fecha: string]: number } = {};

  public totalNetoDia: { [fecha: string]: { totalIngresos: number, totalEgresos: number  } } = {

    'lun': { totalIngresos: 0, totalEgresos:0 },
    'mar': { totalIngresos: 0, totalEgresos:0 },
    'mié': { totalIngresos: 0, totalEgresos:0 },
    'jue': { totalIngresos: 0, totalEgresos:0 },
    'vie': { totalIngresos: 0, totalEgresos:0 },
    'sáb': { totalIngresos: 0, totalEgresos:0 },
    'dom': { totalIngresos: 0, totalEgresos:0 },
  };

  ActiveModificarTransaccion:any = false;
  DataTransaccion:any

  // Toast

  isToastOpen:any = false;
  message:any

  constructor(private storage: Storage) {

    this.initStorage();

    this.cargarListasDesdeStorage();
    
  }

  async initStorage(){
    await this.storage.create();
  }

  // Storage
  async guardarListasEnStorage() {
    const listasParaGuardar = {
      transacciones: this.transacciones,
      transaccionesAgrupadas: this.transaccionesAgrupadas,
      totalIngresosPorFecha: this.totalIngresosPorFecha,
      totalGastosPorFecha: this.totalGastosPorFecha,
      totalNetoPorFecha: this.totalNetoPorFecha,
      totalNetoDia: this.totalNetoDia
    };

    await this.storage.set('listaTransacciones', listasParaGuardar);
  }

  async cargarListasDesdeStorage() {
    const listasGuardadas = await this.storage.get('listaTransacciones');

    if (listasGuardadas) {
      this.transacciones = listasGuardadas.transacciones;
      this.transaccionesAgrupadas = listasGuardadas.transaccionesAgrupadas;
      this.totalIngresosPorFecha = listasGuardadas.totalIngresosPorFecha;
      this.totalGastosPorFecha = listasGuardadas.totalGastosPorFecha;
      this.totalNetoPorFecha = listasGuardadas.totalNetoPorFecha;
      this.totalNetoDia = listasGuardadas.totalNetoDia
    }
  }

  async eliminarListasEnStorage() {

    await this.storage.remove('listaTransacciones');

    this.transacciones = []
    this.transaccionesAgrupadas = {}
    this.totalIngresosPorFecha = {}
    this.totalGastosPorFecha = {}
    this.totalNetoPorFecha = {}

    this.totalNetoDia = {
      'lun': { totalIngresos: 0, totalEgresos:0 },
      'mar': { totalIngresos: 0, totalEgresos:0 },
      'mié': { totalIngresos: 0, totalEgresos:0 },
      'jue': { totalIngresos: 0, totalEgresos:0 },
      'vie': { totalIngresos: 0, totalEgresos:0 },
      'sáb': { totalIngresos: 0, totalEgresos:0 },
      'dom': { totalIngresos: 0, totalEgresos:0 },
    }

  }

  //

  async AgregarTransaccion(id:number,nombre:string,monto:number,estado:any,fecha:any, notas:string,tipo_transaccion:any,tipo_pago:any, categoria:any, producto:any, tipo_movimiento:any){

    if (this.transacciones.find(x => x.id === id)) {return};

    // Local
    this.transacciones.push({id,nombre,monto,estado,notas,fecha,tipo_transaccion,tipo_pago,categoria,producto, tipo_movimiento})
    
    this.guardarListasEnStorage();

    this.message = 'Transaccion creada con exito!'
    this.setOpenToast(true);

    this.agruparTransacciones(id);


    // Actualizar total por dia
    const fechaTrans = fecha.slice(0, 3);

    if(tipo_transaccion == 'Ingresos'){
      this.totalNetoDia[fechaTrans].totalIngresos += monto
      
    }

    if(tipo_transaccion == 'Egresos'){
      this.totalNetoDia[fechaTrans].totalEgresos += monto
    }

    console.log(this.totalNetoDia)

  }

  

  // local
  agruparTransacciones(id:any) {

    this.transacciones.forEach(transacciones => {
      
      if (!this.transaccionesAgrupadas[transacciones.fecha]) {
        this.transaccionesAgrupadas[transacciones.fecha] = [];
      }
      console.log(this.transaccionesAgrupadas)
      console.log(transacciones)

      if(!this.transaccionesAgrupadas[transacciones.fecha].some( element => element.id === id)){

        this.transaccionesAgrupadas[transacciones.fecha].push(transacciones);
        this.transaccionesAgrupadas[transacciones.fecha] = [... new Set(this.transaccionesAgrupadas[transacciones.fecha])]

      }

    });

    // Obtener las fechas únicas y ordenarlas de la más nueva a la más antigua
    
    for(let fecha of this.getFechasAgrupadas()){
      
      const fechaFormateada = fecha.toString().split('T')[0]; // Formatear la fecha como "yyyy-mm-dd"
      
      this.totalIngresosPorFecha[fecha] = this.calcularMontoTotal(this.transaccionesAgrupadas[fecha], 'Ingresos')
      this.totalGastosPorFecha[fecha] = this.calcularMontoTotal(this.transaccionesAgrupadas[fecha], 'Egresos')
    }

    Object.keys(this.totalIngresosPorFecha).forEach(fecha => {
      this.totalNetoPorFecha[fecha] = (this.totalIngresosPorFecha[fecha] || 0) - (this.totalGastosPorFecha[fecha] || 0);
    });

    // Obtener las fechas únicas y ordenarlas de la más nueva a la más antigua
    const fechasOrdenadas = this.getFechasAgrupadas()
    .map(fecha => new Date(fecha))
    .sort((a, b) => b.getTime() - a.getTime());

    // Calcular los totales para cada fecha ordenada
    for (const fecha of fechasOrdenadas) {
      const fechaFormateada = this.ConvertirFecha(fecha); // Utilizar tu función para formatear la fecha
      this.totalIngresosPorFecha[fechaFormateada] = this.calcularMontoTotal(this.transaccionesAgrupadas[fechaFormateada], 'Ingresos');
      this.totalGastosPorFecha[fechaFormateada] = this.calcularMontoTotal(this.transaccionesAgrupadas[fechaFormateada], 'Egresos');
    }

    // Calcular el total neto para cada fecha ordenada
    fechasOrdenadas.forEach(fecha => {
      const fechaFormateada = this.ConvertirFecha(fecha); // Utilizar tu función para formatear la fecha
      this.totalNetoPorFecha[fechaFormateada] = (this.totalIngresosPorFecha[fechaFormateada] || 0) - (this.totalGastosPorFecha[fechaFormateada] || 0);
    });

    this.guardarListasEnStorage();

  }

  getFechasAgrupadas(): string[] {
    return Object.keys(this.transaccionesAgrupadas);
  }

  calcularMontoTotal(transacciones: Transaccion[], tipo: 'Ingresos' | 'Egresos'): number {

    if (!transacciones) {
      return 0; // Retorna 0 (o el valor predeterminado que desees) si no hay transacciones
    }
    
    return transacciones
      .filter(transaccion => transaccion.tipo_transaccion === tipo)
      .reduce((total, transaccion) => total + transaccion.monto, 0);
  }

  async ModificarTransaccion(id:number,nombre:string,monto:number,estado:any,fecha:any, notas:string,tipo_transaccion:any,tipo_pago:any, categoria:any, tipo_movimiento:any){

    const index = this.transacciones.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    // Eliminar la transaccion de la lista del grafico
    const fechaTrans = fecha.slice(0, 3);
    console.log('monto registrado: '+this.transacciones[index].monto)

    if(this.transacciones[index].tipo_transaccion == 'Ingresos'){
      this.totalNetoDia[fechaTrans].totalIngresos -= this.transacciones[index].monto
    }

    if(this.transacciones[index].tipo_transaccion == 'Egresos'){
      this.totalNetoDia[fechaTrans].totalEgresos -= this.transacciones[index].monto
    }

    // Modificar las transaccion con los nuevo datos
    this.transacciones[index].nombre = nombre;
    this.transacciones[index].monto = monto;
    this.transacciones[index].estado = estado;
    this.transacciones[index].fecha = fecha;
    this.transacciones[index].notas = notas;
    this.transacciones[index].tipo_transaccion = tipo_transaccion;
    this.transacciones[index].tipo_pago = tipo_pago;
    this.transacciones[index].categoria = categoria;
    this.transacciones[index].tipo_movimiento = tipo_movimiento;

    // Agregar el nuevo monto
    console.log('Nuevo monto: '+monto)
    if(this.transacciones[index].tipo_transaccion == 'Ingresos'){
      this.totalNetoDia[fechaTrans].totalIngresos += monto
    }

    if(this.transacciones[index].tipo_transaccion == 'Egresos'){
      this.totalNetoDia[fechaTrans].totalEgresos += monto
    }

    // Guardar registro en Storage
    this.guardarListasEnStorage();

    // Toast alert
    this.message = 'Transaccion modificada!'
    this.setOpenToast(true);

    // Agrupar las transacciones por dia
    this.agruparTransacciones(id);

  }

  MostrarTransaccion(id:number) {
    const transaccionEncontrada = this.transacciones.find(x => x.id === id);

    if (!transaccionEncontrada) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    console.log(transaccionEncontrada);

    return transaccionEncontrada;
  }

  async ListarTransacciones() {
    if (this.transacciones.length === 0) {
        console.log("No hay transacciones para mostrar.");
        return;
    }

    console.log("Lista de transacciones:");
    this.transacciones.forEach(transacciones => {
        console.log(transacciones);
    });
  }

  async EliminarTransaccion(id:number) {

    const index = this.transacciones.findIndex(x => x.id === id);

    if (index === -1) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    // Encuentra la fecha asociada a la transacción
    const fechaTransaccion = this.transacciones[index].fecha;

    // Encuentra el monto y el tipo de la transacción que se eliminará
    const montoTransaccion = this.transacciones[index].monto;
    const tipoTransaccion = this.transacciones[index].tipo_transaccion;

    // Actualiza el totalNetoPorFecha teniendo en cuenta el tipo de transacción
    if (this.totalNetoPorFecha[fechaTransaccion] !== undefined) {
        if (tipoTransaccion === 'Ingresos') {
            this.totalNetoPorFecha[fechaTransaccion] -= montoTransaccion;
        } else if (tipoTransaccion === 'Egresos') {
            this.totalNetoPorFecha[fechaTransaccion] += montoTransaccion;
        }
    }

    // Actualiza las listas totalIngresosPorFecha y totalGastosPorFecha
    if (tipoTransaccion === 'Ingresos') {
        if (this.totalIngresosPorFecha[fechaTransaccion] !== undefined) {
            this.totalIngresosPorFecha[fechaTransaccion] -= montoTransaccion;
        }
    } else if (tipoTransaccion === 'Egresos') {
        if (this.totalGastosPorFecha[fechaTransaccion] !== undefined) {
            this.totalGastosPorFecha[fechaTransaccion] -= montoTransaccion;
        }
    }

    // Elimina la transacción de la lista de transacciones agrupadas
    const transaccionAgrupadaIndex = this.transaccionesAgrupadas[fechaTransaccion].findIndex(t => t.id === id);
    if (transaccionAgrupadaIndex !== -1) {
        this.transaccionesAgrupadas[fechaTransaccion].splice(transaccionAgrupadaIndex, 1);
    }

    // Actualizar total por dia (Datos grafico: Descontar total por transacciones)
    const fechaTrans = fechaTransaccion.slice(0, 3);

    if(this.transacciones[index].tipo_transaccion == 'Ingresos'){
      this.totalNetoDia[fechaTrans].totalIngresos -= this.transacciones[index].monto
      
    }

    if(this.transacciones[index].tipo_transaccion == 'Egresos'){
      this.totalNetoDia[fechaTrans].totalEgresos -= this.transacciones[index].monto
    }

    // Elimina la transacción de la lista principal
    this.transacciones.splice(index, 1);

    console.log('Transacción eliminada: ' + id);

    this.guardarListasEnStorage();

    this.message = 'Transaccion eliminada!'
    this.setOpenToast(true);
  }

  GetModificarTransaccion(id:any){

    this.DataTransaccion = this.MostrarTransaccion(id);

  }

  GetDataModificar(){
    return this.DataTransaccion
  }

  ConvertirFecha(date:any): string{

    const fecha = new Date(date);
    return fecha.toLocaleDateString('es',{ weekday:'short',day:'2-digit', month:'long', year:'numeric'})
    
  }

  setOpenToast(isOpen: boolean) {
    this.isToastOpen = isOpen;
    
  }

  // Suponiendo que tienes una función para organizar las transacciones por días de la semana
  organizarTransaccionesPorDiaSemana() {
    
    const diasSemana = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

    // Inicializar un objeto para almacenar los totales por día de la semana
    const totalesPorDiaSemana: { [dia: string]: number } = {};

    // Iterar sobre las fechas de las transacciones y sumar los montos por día de la semana
    for (const fecha in this.transaccionesAgrupadas) {
      const transaccionesDelDia = this.transaccionesAgrupadas[fecha];
      const fechaObj = new Date(fecha);

      if (!isNaN(fechaObj.getTime())) {
        const diaSemana = diasSemana[fechaObj.getDay()];
        const totalDia = transaccionesDelDia.reduce((total, transaccion) => total + transaccion.monto, 0);

        if (totalesPorDiaSemana[diaSemana]) {
          totalesPorDiaSemana[diaSemana] += totalDia;
        } else {
          totalesPorDiaSemana[diaSemana] = totalDia;
        }
      }
    }

    console.log(totalesPorDiaSemana);
  }

  //
  obtenerMontoTotalPorDia(tipoTransaccion:any) {

    const montoPorDia: { [key: string]: number } = {};

    this.transacciones.forEach((transaccion) => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const dia = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD

      //Obtener monto de transacciones por dia
      if(transaccion.tipo_transaccion == tipoTransaccion){

        if (!montoPorDia[dia]) {
          montoPorDia[dia] = 0;
        }
        montoPorDia[dia] += transaccion.monto;

      }
        
    });
    
    return montoPorDia;
  }

  obtenerMontoTotalPorSemana( tipoTransaccion:any) {
      const montosPorSemana: { [key: string]: number } = {};

      this.transacciones.forEach((transaccion) => {

        if(transaccion.tipo_transaccion == tipoTransaccion){

          const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
          const semana = `${this.getWeekNumber(fecha)}/${fecha.getFullYear()}`;

          if (!montosPorSemana[semana]) {
              montosPorSemana[semana] = 0;
          }
          montosPorSemana[semana] += transaccion.monto;
        }

      });

      return montosPorSemana;
  }

  obtenerMontoTotalPorMes(tipoTransaccion:any) {
      const montosPorMes: { [key: string]: number } = {};

      this.transacciones.forEach((transaccion) => {

        if(transaccion.tipo_transaccion == tipoTransaccion){

          const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
          const mes = fecha.toISOString().slice(0, 7); // Formato YYYY-MM

          if (!montosPorMes[mes]) {
              montosPorMes[mes] = 0;
          }
          montosPorMes[mes] += transaccion.monto;

        }
          
      });

      return montosPorMes;
  }

  obtenerMontoTotalPorAnio(tipoTransaccion:any) {
      const montosPorAnio: { [key: string]: number } = {};

      this.transacciones.forEach((transaccion) => {

        if(transaccion.tipo_transaccion == tipoTransaccion){

          const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
          const anio = fecha.getFullYear().toString();

          if (!montosPorAnio[anio]) {
              montosPorAnio[anio] = 0;
          }
          montosPorAnio[anio] += transaccion.monto;

        }
          
      });

      return montosPorAnio;
  }

  getWeekNumber(date: Date) {
      const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const dayNum = d.getUTCDay() || 7;
      d.setUTCDate(d.getUTCDate() + 4 - dayNum);
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

  parsearFechaConFormatoEspecifico(fechaString: string): Date {
    const meses = [
        "enero", "febrero", "marzo", "abril", "mayo", "junio",
        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];

    const partes = fechaString.split(", "); // Separar la cadena por la coma y el espacio
    const fechaArray = partes[1].split(" de "); // Separar la segunda parte por el "de"

    const dia = parseInt(fechaArray[0], 10); // Obtener el día como número
    const mes = meses.indexOf(fechaArray[1]); // Obtener el mes como índice del array
    const anio = parseInt(fechaArray[2], 10); // Obtener el año como número

    return new Date(anio, mes, dia);
  }

  obtenerMontoTotalVentasProductosPorDia() {
    const ventasPorDia: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {
      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const dia = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD

      if (!ventasPorDia[dia]) {
        ventasPorDia[dia] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
              
            if (producto.total) {
              ventasPorDia[dia] += producto.total;
            }

            console.log(producto)
          }
        }
      }
    });

    console.log('Monto total por día de ventas de productos: ' + JSON.stringify(ventasPorDia));
    return ventasPorDia;
  }

  obtenerMontoTotalVentasProductosPorSemana() {

    const ventasPorSemana: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const semana = `${this.getWeekNumber(fecha)}/${fecha.getFullYear()}`;

      if (!ventasPorSemana[semana]) {
        ventasPorSemana[semana] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
                
            if (producto.total) {
              ventasPorSemana[semana] += producto.total;
            }

            console.log(producto)
          }
        }
      }

    });

    console.log('Monto total por semana de ventas de productos: ' + JSON.stringify(ventasPorSemana));
    return ventasPorSemana;
        
  }

  obtenerMontoTotalVentasProductosPorMes() {

    const ventasPorMes: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const mes = fecha.toISOString().slice(0, 7); // Formato YYYY-MM

      if (!ventasPorMes[mes]) {
        ventasPorMes[mes] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
                
            if (producto.total) {
              ventasPorMes[mes] += producto.total;
            }

            console.log(producto)
          }
        }
      }

    });

    console.log('Monto total por mes de ventas de productos: ' + JSON.stringify(ventasPorMes));
    return ventasPorMes;
        
  }

  obtenerMontoTotalVentasProductosPorAnio() {

    const ventasPorAnio: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const anio = fecha.getFullYear().toString();

      if (!ventasPorAnio[anio]) {
        ventasPorAnio[anio] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
                
            if (producto.total) {
              ventasPorAnio[anio] += producto.total;
            }

            console.log(producto)
          }
        }
      }

    });

    console.log('Monto total por mes de ventas de productos: ' + JSON.stringify(ventasPorAnio));
    return ventasPorAnio;
        
  }

  obtenerGananciasDiarias(){

    const gananciasDiarias: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);

      const dia = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD

      if (!gananciasDiarias[dia]) {
        gananciasDiarias[dia] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
            console.log('Ganancia por producto: ',producto.ganancia)
            if(producto.ganancia){
              gananciasDiarias[dia] += producto.ganancia;
            }
          }
        }
      }
    });

    console.log('Ganancias diarias: '+ gananciasDiarias)
    return gananciasDiarias;
  }

  obtenerGananciasSemanales(){

    const gananciasSemanales: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const semana = `${this.getWeekNumber(fecha)}/${fecha.getFullYear()}`;

      if (!gananciasSemanales[semana]) {
        gananciasSemanales[semana] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
            console.log('Ganancia por producto: ',producto.ganancia)
            if(producto.ganancia){
              gananciasSemanales[semana] += producto.ganancia;
            }
          }
        }
      }
    });

    console.log('Ganancias semanales: '+ gananciasSemanales)
    return gananciasSemanales;

  }

  obtenerGananciasMensuales(){

    const gananciasMensuales: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const mes = fecha.toISOString().slice(0, 7); // Formato YYYY-MM

      if (!gananciasMensuales[mes]) {
        gananciasMensuales[mes] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
            console.log('Ganancia por producto: ',producto.ganancia)
            if(producto.ganancia){
              gananciasMensuales[mes] += producto.ganancia;
            }

          }
        }
      }
    });

    console.log('Ganancias mensuales: '+ gananciasMensuales)
    return gananciasMensuales;

  }

  obtenerGananciasAnuales(){

    const gananciasAnuales: { [key: string]: number } = {};

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);
      const anio = fecha.getFullYear().toString();

      if (!gananciasAnuales[anio]) {
        gananciasAnuales[anio] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
            console.log('Ganancia por producto: ',producto.ganancia)
            if(producto.ganancia){
              gananciasAnuales[anio] += producto.ganancia;
            }
          }
        }
      }

    });

    console.log('Ganancias Anuales: '+ gananciasAnuales)
    return gananciasAnuales;

  }

  obtenerGastosFijos(tipo_frecuencia:any){

    const GastosFijosTotales: { [key: string]: number } = {};

    let tipoFecha = ''

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);

      if(tipo_frecuencia == 'Diario'){
        tipoFecha = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Semanal'){
        tipoFecha = `${this.getWeekNumber(fecha)}/${fecha.getFullYear()}`; // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Mensual'){
        tipoFecha = fecha.toISOString().slice(0, 7); // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Anual'){
        tipoFecha = fecha.getFullYear().toString(); // Formato YYYY-MM-DD
      }

      if (!GastosFijosTotales[tipoFecha]) {
        GastosFijosTotales[tipoFecha] = 0;
      }

      if(transaccion.tipo_transaccion == 'Egresos' && transaccion.tipo_movimiento === 'Egresos Fijos'){

        GastosFijosTotales[tipoFecha] += transaccion.monto;
        
      }

    });

    return GastosFijosTotales;

  }

  obtenerGastosVariables(tipo_frecuencia:any){

    const GastosVariablesTotales: { [key: string]: number } = {};

    let tipoFecha = ''

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);

      if(tipo_frecuencia == 'Diario'){
        tipoFecha = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Semanal'){
        tipoFecha = `${this.getWeekNumber(fecha)}/${fecha.getFullYear()}`; // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Mensual'){
        tipoFecha = fecha.toISOString().slice(0, 7); // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Anual'){
        tipoFecha = fecha.getFullYear().toString(); // Formato YYYY-MM-DD
      }

      if (!GastosVariablesTotales[tipoFecha]) {
        GastosVariablesTotales[tipoFecha] = 0;
      }

      if(transaccion.tipo_transaccion == 'Egresos' && transaccion.tipo_movimiento === 'Egresos Variables'){

        GastosVariablesTotales[tipoFecha] += transaccion.monto;
        
      }

    });

    return GastosVariablesTotales;

  }

  obtenerCantidadProductoVendidos(tipo_frecuencia:any){

    const totalProductosVendidos: { [key: string]: number } = {};

    let tipoFecha = ''

    this.transacciones.forEach(transaccion => {

      const fecha = this.parsearFechaConFormatoEspecifico(transaccion.fecha);

      if(tipo_frecuencia == 'Diario'){
        tipoFecha = fecha.toISOString().slice(0, 10); // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Semanal'){
        tipoFecha = `${this.getWeekNumber(fecha)}/${fecha.getFullYear()}`; // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Mensual'){
        tipoFecha = fecha.toISOString().slice(0, 7); // Formato YYYY-MM-DD
      }
      if(tipo_frecuencia == 'Anual'){
        tipoFecha = fecha.getFullYear().toString(); // Formato YYYY-MM-DD
      }

      if (!totalProductosVendidos[tipoFecha]) {
        totalProductosVendidos[tipoFecha] = 0;
      }

      if (transaccion.producto) {
        for (const key in transaccion.producto) {
          if (transaccion.producto.hasOwnProperty(key)) {
            const producto = transaccion.producto[key];
            console.log('Ganancia por producto: ',producto.ganancia)
            if(producto.cantidad){
              
              totalProductosVendidos[tipoFecha] += producto.cantidad

            }
          }
        }
      }

    });

    return totalProductosVendidos;
    
  }

}