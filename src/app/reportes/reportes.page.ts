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

  GoHome(){
    this.router.navigate(['home'])
  }

  reporteMontoDiario(){

    const ingresoTotalDiario = this.crudT.obtenerMontoTotalPorDia('Ingresos');
    const egresoTotalDiario = this.crudT.obtenerMontoTotalPorDia('Egresos');

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const fechaHoy = `${year}-${month}-${day}`; // Obtener la fecha actual en formato "YYYY-MM-DD"

    const ingresoHoy = ingresoTotalDiario[fechaHoy] || 0;
    const egresoHoy = egresoTotalDiario[fechaHoy] || 0;

    console.log('Ingresos de hoy:', ingresoHoy);
    console.log('Egresos de hoy:', egresoHoy);
    console.log('Fecha Hoy componente: '+ fechaHoy)
    this.totalVentas = this.crudT.obtenerMontoProductosVendidosPorDia(now)

    this.totalIngresos = ingresoHoy
    this.totalEgresos = egresoHoy

    console.log(this.totalVentas)
  }

  reporteMontoSemanal(){

    const ingresoTotalSemanal = this.crudT.obtenerMontoTotalPorSemana('Ingresos');
    const egresoTotalSemanal = this.crudT.obtenerMontoTotalPorSemana('Egresos');

    const now = new Date();
    const week = this.getWeekNumber(now);
    const year = now.getFullYear();
    const semanaActual = `${week}/${year}`;

    const ingresoSemana = ingresoTotalSemanal[semanaActual] || 0;
    const egresoSemana = egresoTotalSemanal[semanaActual] || 0;

    console.log('Ingresos de la semana:', ingresoSemana);
    console.log('Egresos de la semana:', egresoSemana);

    this.totalIngresos = ingresoSemana
    this.totalEgresos = egresoSemana

  }

  reporteMontoMensual(){

    const ingresoTotalMensual = this.crudT.obtenerMontoTotalPorMes('Ingresos');
    const egresoTotalMensual = this.crudT.obtenerMontoTotalPorMes('Egresos');

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const mesActual = `${year}-${month}`;

    const ingresoMes = ingresoTotalMensual[mesActual] || 0;
    const egresoMes = egresoTotalMensual[mesActual] || 0;

    console.log('Ingresos del mes:', ingresoMes);
    console.log('Egresos del mes:', egresoMes);

    this.totalIngresos = ingresoMes
    this.totalEgresos = egresoMes

  }

  reporteMontoAnual(){

    const ingresoTotalAnual = this.crudT.obtenerMontoTotalPorAnio('Ingresos');
    const egresoTotalAnual = this.crudT.obtenerMontoTotalPorAnio('Egresos');

    const now = new Date();
    const anioActual = now.getFullYear().toString();

    const ingresoAnual = ingresoTotalAnual[anioActual] || 0;
    const egresoAnual = egresoTotalAnual[anioActual] || 0;

    console.log('Ingresos del año:', ingresoAnual);
    console.log('Egresos del año:', egresoAnual);

    this.totalIngresos = ingresoAnual
    this.totalEgresos = egresoAnual

  }

  getWeekNumber(date: Date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  }

}
