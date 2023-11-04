import { Usuario } from "./usuario"

export interface Venta {

    ticket:number
    fecha:any
    usuario:Usuario
    productosAgrupados: { [id: string]: { nombre: string; cantidad: number; stock:number; valorUnitario: number; ganancia:number; total: number; img:any } }

}
