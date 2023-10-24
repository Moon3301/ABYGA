import { Injectable } from '@angular/core';
import { Transaccion } from './transaccion';
import { TipoTransaccion } from './tipo-transaccion';
import { TipoPago } from './tipo-pago';
import { CategoriasTransacciones } from './categorias-transacciones';

import { Storage } from '@ionic/storage-angular';
import { CrudProductosService } from './crud-productos.service';
import { Producto } from './producto';


@Injectable({
  providedIn: 'root'
})
export class CrudTransaccionesService {

  public transacciones: Transaccion[] = [];

  transaccionesAgrupadas: { [fecha: string]: Transaccion[] } = {};

  totalIngresosPorFecha: { [fecha: string]: number } = {};
  totalGastosPorFecha: { [fecha: string]: number } = {};

  totalNetoPorFecha: { [fecha: string]: number } = {};

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
    }
  }

  //

  async AgregarTransaccion(id:number,nombre:string,monto:number,estado:any,fecha:any, notas:string,tipo_transaccion:any,tipo_pago:any, categoria:any, producto:any){

    

    if (this.transacciones.find(x => x.id === id)) {return};

    // Local
    this.transacciones.push({id,nombre,monto,estado,notas,fecha,tipo_transaccion,tipo_pago,categoria,producto})
    
    this.guardarListasEnStorage();

    this.message = 'Transaccion creada con exito!'
    this.setOpenToast(true);

    this.agruparTransacciones(id);
    
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

  async ModificarTransaccion(id:number,nombre:string,monto:number,estado:any,fecha:any, notas:string,tipo_transaccion:any,tipo_pago:any, categoria:any){

    const index = this.transacciones.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    this.transacciones[index].nombre = nombre;
    this.transacciones[index].monto = monto;
    this.transacciones[index].estado = estado;
    this.transacciones[index].fecha = fecha;
    this.transacciones[index].notas = notas;
    this.transacciones[index].tipo_transaccion = tipo_transaccion;
    this.transacciones[index].tipo_pago = tipo_pago;
    this.transacciones[index].categoria = categoria;

    this.guardarListasEnStorage();

    this.message = 'Transaccion modificada!'
    this.setOpenToast(true);

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

}