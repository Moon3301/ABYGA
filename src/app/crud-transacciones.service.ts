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

  ActiveModificarTransaccion:any = false;
  DataTransaccion:any

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

    this.transaccion[index].nombre = nombre;
    this.transaccion[index].monto = monto;
    this.transaccion[index].estado = estado;
    this.transaccion[index].fecha = fecha;
    this.transaccion[index].notas = notas;
    this.transaccion[index].tipo_transaccion = tipo_transaccion;
    this.transaccion[index].tipo_pago = tipo_pago;
    this.transaccion[index].categoria = categoria;

    this.agruparTransacciones(id);

  }

  MostrarTransaccion(id:number) {
    const transaccionEncontrada = this.transaccion.find(x => x.id === id);

    if (!transaccionEncontrada) {
        throw new Error(`No se encontró una transacción con ID ${id}`);
    }

    console.log(transaccionEncontrada);

    return transaccionEncontrada;
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

}