import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudProductosService } from '../crud-productos.service';
import { CrudTransaccionesService } from '../crud-transacciones.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {

  percent = 69;

  totalIngresos:any = 0
  totalEgresos:any = 0
  totalVentas:any = 0
  totalGanancias:any = 0

  totalGastoFijos:any = 0
  totalGastosVariables:any = 0
  totalGastosTotales:any = 0

  totalProductosVendidos:any = 0
  totalVentasFaltantes:any = 0;

  constructor(public router:Router, public crudP:CrudProductosService, public crudT:CrudTransaccionesService) { }

  ngOnInit() {
  }

  increase(): void {
    this.percent = this.percent + 10;
    if (this.percent > 100) {
      this.percent = 100;
    }
  }

  decline(): void {
    this.percent = this.percent - 10;
    if (this.percent < 0) {
      this.percent = 0;
    }
  }

  calcularPuntoEquilibrio(){

    // Porcentaje ventas faltantes
    const percent = (this.totalIngresos * 100) / this.totalEgresos

    this.percent = +percent.toFixed(1);

    // total ventas faltantes
    this.totalVentasFaltantes = this.totalEgresos - this.totalIngresos
  }

  GoHome(){
    this.router.navigate(['home'])
  }

  reporteMontoDiario(){

    // Ingresos y egresos
    const ingresoTotalDiario = this.crudT.obtenerMontoTotalPorDia('Ingresos');
    const egresoTotalDiario = this.crudT.obtenerMontoTotalPorDia('Egresos');

    // Ventas
    const ventaTotalDiaria = this.crudT.obtenerMontoTotalVentasProductosPorDia();

    // Ganancias
    const gananciaTotalDiaria = this.crudT.obtenerGananciasDiarias();

    // Gastos fijos

    const totalGastosFijosDiarios = this.crudT.obtenerGastosFijos('Diario');

    // Gastos variables

    const totalGastosVariables = this.crudT.obtenerGastosVariables('Diario');

    // Productos vendidos

    const totalProductosVendidos = this.crudT.obtenerCantidadProductoVendidos('Diario');

    // Obtener fechan de hoy
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const fechaHoy = `${year}-${month}-${day}`; // Obtener la fecha actual en formato "YYYY-MM-DD"

    // Transacciones
    const ingresoHoy = ingresoTotalDiario[fechaHoy] || 0;
    const egresoHoy = egresoTotalDiario[fechaHoy] || 0;

    // Ventas
    const ventaHoy = ventaTotalDiaria[fechaHoy] || 0;

    //Ganancias
    const gananciasHoy = gananciaTotalDiaria[fechaHoy] || 0;

    //Gastos Fijos

    const gastosFijosHoy = totalGastosFijosDiarios[fechaHoy] || 0;

    //Gastos variables

    const gastosVariablesHoy = totalGastosVariables[fechaHoy] || 0;

    // Productos vendidos

    const productosVendidosHoy = totalProductosVendidos[fechaHoy] || 0;

    console.log('Ingresos de hoy:', ingresoHoy);
    console.log('Egresos de hoy:', egresoHoy);
    console.log('Ventas de hoy: ', ventaHoy);
    console.log('Ganancias de hoy', gananciasHoy);
    console.log('Gastos Fijos de hoy', gastosFijosHoy)
    console.log('Gastos variables de hoy', gastosVariablesHoy)
    console.log('Productos Vendidos de hoy', productosVendidosHoy)
    
    // Total Ingresos y egresos
    this.totalIngresos = ingresoHoy;
    this.totalEgresos = egresoHoy;

    // Total Ventas
    this.totalVentas = ventaHoy;

    // Total Ganancias
    this.totalGanancias = gananciasHoy;

    // Total gastos fijos
    this.totalGastoFijos = gastosFijosHoy;

    // Total gastos variables

    this.totalGastosVariables = gastosVariablesHoy;

    //

    this.calcularPuntoEquilibrio();

    // Total productos vendidos

    this.totalProductosVendidos = productosVendidosHoy

  }

  reporteMontoSemanal(){

    const ingresoTotalSemanal = this.crudT.obtenerMontoTotalPorSemana('Ingresos');
    const egresoTotalSemanal = this.crudT.obtenerMontoTotalPorSemana('Egresos');
    const ventaTotalSemanal = this.crudT.obtenerMontoTotalVentasProductosPorSemana();
    const gananciaTotalSemanal = this.crudT.obtenerGananciasSemanales();

    const totalGastosFijosDiarios = this.crudT.obtenerGastosFijos('Semanal');
    const totalGatosVariablesDiarios = this.crudT.obtenerGastosVariables('Semanal');

    const totalProductosVendidos = this.crudT.obtenerCantidadProductoVendidos('Semanal');

    const now = new Date();
    const week = this.getWeekNumber(now);
    const year = now.getFullYear();
    const semanaActual = `${week}/${year}`;

    const ingresoSemana = ingresoTotalSemanal[semanaActual] || 0;
    const egresoSemana = egresoTotalSemanal[semanaActual] || 0;
    const ventaSemanal = ventaTotalSemanal[semanaActual] || 0;
    const gananciaSemanal = gananciaTotalSemanal[semanaActual] || 0;
    const gastosFijosSemanal = totalGastosFijosDiarios[semanaActual] || 0;
    const gastosVariablesSemanal = totalGatosVariablesDiarios[semanaActual] || 0;
    const productosVendidosSemanal = totalProductosVendidos[semanaActual] || 0;

    console.log('Ingresos de la semana:', ingresoSemana);
    console.log('Egresos de la semana:', egresoSemana);
    console.log('Ventas de la semana:', ventaSemanal);
    console.log('Ganancias de la semana:', gananciaSemanal);
    console.log('Gastos fijos de la semana:', gastosFijosSemanal);
    console.log('Gastos Variables de la semana:', gastosVariablesSemanal);
    console.log('Productos vendidos:', productosVendidosSemanal)


    this.totalIngresos = ingresoSemana;
    this.totalEgresos = egresoSemana;
    this.totalVentas = ventaSemanal;
    this.totalGanancias = gananciaSemanal;
    this.totalGastoFijos = gastosFijosSemanal;
    this.totalGastosVariables = gastosVariablesSemanal;
    this.totalProductosVendidos = productosVendidosSemanal;

    this.calcularPuntoEquilibrio();
  }

  reporteMontoMensual(){

    const ingresoTotalMensual = this.crudT.obtenerMontoTotalPorMes('Ingresos');
    const egresoTotalMensual = this.crudT.obtenerMontoTotalPorMes('Egresos');
    const ventaTotalMensual = this.crudT.obtenerMontoTotalVentasProductosPorMes();
    const gananciaTotalMensual = this.crudT.obtenerGananciasMensuales();

    const gastoFijosMensual = this.crudT.obtenerGastosFijos('Mensual');
    const gastoVariablesMensual = this.crudT.obtenerGastosVariables('Mensual');

    const totalProductosVendidos = this.crudT.obtenerCantidadProductoVendidos('Mensual');

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const mesActual = `${year}-${month}`;

    const ingresoMes = ingresoTotalMensual[mesActual] || 0;
    const egresoMes = egresoTotalMensual[mesActual] || 0;
    const ventaMes = ventaTotalMensual[mesActual] || 0;
    const gananciaMes = gananciaTotalMensual[mesActual] || 0;

    const gastoFijoMes = gastoFijosMensual[mesActual] || 0;
    const gastoVariableMes = gastoVariablesMensual[mesActual] || 0;

    const productosVendidosMes = totalProductosVendidos[mesActual] || 0;

    console.log('Ingresos del mes:', ingresoMes);
    console.log('Egresos del mes:', egresoMes);
    console.log('Venta del mes:', ventaMes);
    console.log('Ganancia del mes:', gananciaMes);
    console.log('Gasto fijo mes', gastoFijoMes)
    console.log('Gasto variable mes', gastoVariableMes)
    console.log('Productos vendidos:', productosVendidosMes)

    this.totalIngresos = ingresoMes;
    this.totalEgresos = egresoMes;
    this.totalVentas = ventaMes;
    this.totalGanancias = gananciaMes;
    this.totalGastoFijos = gastoFijoMes;
    this.totalGastosVariables = gastoVariableMes;
    this.totalProductosVendidos = productosVendidosMes

    this.calcularPuntoEquilibrio();
  }

  reporteMontoAnual(){

    const ingresoTotalAnual = this.crudT.obtenerMontoTotalPorAnio('Ingresos');
    const egresoTotalAnual = this.crudT.obtenerMontoTotalPorAnio('Egresos');
    const ventaTotalAnual = this.crudT.obtenerMontoTotalVentasProductosPorAnio();
    const gananciaTotalAnual = this.crudT.obtenerGananciasAnuales();

    const gastoFijoTotalAnual = this.crudT.obtenerGastosFijos('Anual');
    const gastoVariableTotalAnual = this.crudT.obtenerGastosVariables('Anual');

    const totalProductosVendidos = this.crudT.obtenerCantidadProductoVendidos('Anual');

    const now = new Date();
    const anioActual = now.getFullYear().toString();

    const ingresoAnual = ingresoTotalAnual[anioActual] || 0;
    const egresoAnual = egresoTotalAnual[anioActual] || 0;
    const ventaAnual = ventaTotalAnual[anioActual] || 0;
    const gananciaAnual = gananciaTotalAnual[anioActual] || 0;
    const gastoFijoAnual = gastoFijoTotalAnual[anioActual] || 0;
    const gastoVariableAnual = gastoVariableTotalAnual[anioActual] || 0;
    const productosVendidosAnual = totalProductosVendidos[anioActual] || 0;

    console.log('Ingresos del año:', ingresoAnual);
    console.log('Egresos del año:', egresoAnual);
    console.log('Venta del año:', ventaAnual);
    console.log('Ganancia del año:', gananciaAnual);
    console.log('Gasto fijo del año:', gastoFijoAnual);
    console.log('Gasto variable del ano: ', gastoVariableAnual)
    console.log('Productos vendidos del ano:',productosVendidosAnual)

    this.totalIngresos = ingresoAnual;
    this.totalEgresos = egresoAnual;
    this.totalVentas = ventaAnual;
    this.totalGanancias = gananciaAnual;
    this.totalGastoFijos = gastoFijoAnual;
    this.totalGastosVariables = gastoVariableAnual;
    this.totalProductosVendidos = productosVendidosAnual;

    this.calcularPuntoEquilibrio();
  }

  getWeekNumber(date: Date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

}
