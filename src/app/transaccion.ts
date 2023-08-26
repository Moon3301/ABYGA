import { CategoriasTransacciones } from "./categorias-transacciones"
import { TipoPago } from "./tipo-pago"
import { TipoTransaccion } from "./tipo-transaccion"

export interface Transaccion {

    id: number
    nombre: string
    monto: number
    estado: string
    notas: string
    fecha: any
    tipo_transaccion: string
    tipo_pago: TipoPago
    categoria: CategoriasTransacciones[]
    
}
