import { Injectable } from '@angular/core';
import { Transaccion } from './transaccion';
import { TipoTransaccion } from './tipo-transaccion';
import { TipoPago } from './tipo-pago';
import { CategoriasTransacciones } from './categorias-transacciones';

@Injectable({
  providedIn: 'root'
})
export class CrudTransaccionesService {

  public transaccion: Transaccion[] = [];

  transaccionesAgrupadas: { [fecha: string]: Transaccion[] } = {};

  totalIngresosPorFecha: { [fecha: string]: number } = {};
  totalGastosPorFecha: { [fecha: string]: number } = {};

  totalNetoPorFecha: { [fecha: string]: number } = {};

  public listaIngresos = []
  public listaGastos = []



  constructor() { }

  agruparTransacciones(id:any) {

    this.transaccion.forEach(transaccion => {
      
      if (!this.transaccionesAgrupadas[transaccion.fecha]) {
        this.transaccionesAgrupadas[transaccion.fecha] = [];
      }
      console.log(this.transaccionesAgrupadas)
      console.log(transaccion)

      if(!this.transaccionesAgrupadas[transaccion.fecha].some( element => element.id === id)){

        this.transaccionesAgrupadas[transaccion.fecha].push(transaccion);
        this.transaccionesAgrupadas[transaccion.fecha] = [... new Set(this.transaccionesAgrupadas[transaccion.fecha])]

      }

    });

    for(let fecha of this.getFechasAgrupadas()){
      this.totalIngresosPorFecha[fecha] = this.calcularMontoTotal(this.transaccionesAgrupadas[fecha], 'Ingresos')
      this.totalGastosPorFecha[fecha] = this.calcularMontoTotal(this.transaccionesAgrupadas[fecha], 'Gastos')
    }

    Object.keys(this.totalIngresosPorFecha).forEach(fecha => {
      this.totalNetoPorFecha[fecha] = (this.totalIngresosPorFecha[fecha] || 0) - (this.totalGastosPorFecha[fecha] || 0);
    });

  }

  getFechasAgrupadas(): string[] {
    return Object.keys(this.transaccionesAgrupadas);
  }

  calcularMontoTotal(transacciones: Transaccion[], tipo: 'Ingresos' | 'Gastos'): number {
    return transacciones
      .filter(transaccion => transaccion.tipo_transaccion === tipo)
      .reduce((total, transaccion) => total + transaccion.monto, 0);
  }



  
  async AgregarTransaccion(id:number,nombre:string,monto:number,estado:any,fecha:any, notas:string,tipo_transaccion:any,tipo_pago:any, categoria:any){

    if (this.transaccion.find(x => x.id === id)) {return};

    this.transaccion.push({id,nombre,monto,estado,notas,fecha,tipo_transaccion,tipo_pago,categoria})

    this.agruparTransacciones(id);
    
  }

  async ModificarTransaccion(id:number,nombre:string,monto:number,estado:any,fecha:any, notas:string,tipo_transaccion:any,tipo_pago:any, categoria:any){

    const index = this.transaccion.findIndex(x => x.id === id);

    if (index === -1) {
      throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    this.transaccion[index] = {

      id,
      nombre,
      monto,
      estado,
      fecha,
      notas,
      tipo_transaccion,
      tipo_pago,
      categoria

    }

  }

  async MostrarTransaccion(id:number) {
    const transaccionEncontrada = this.transaccion.find(x => x.id === id);

    if (!transaccionEncontrada) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    console.log(transaccionEncontrada);
  }

  async ListarTransacciones() {
    if (this.transaccion.length === 0) {
        console.log("No hay transacciones para mostrar.");
        return;
    }

    console.log("Lista de transacciones:");
    this.transaccion.forEach(transaccion => {
        console.log(transaccion);
    });
  }

  async EliminarTransaccion(id:number) {
    const index = this.transaccion.findIndex(x => x.id === id);

    if (index === -1) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    this.transaccion.splice(index, 1);
}

}
