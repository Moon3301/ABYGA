import { CategoriasTransacciones } from "./categorias-transacciones"
import { TipoPago } from "./tipo-pago"
import { TipoTransaccion } from "./tipo-transaccion"
import { Producto } from "./producto"

export interface Transaccion {

    id: number
    nombre: string
    monto: number
    notificacion: boolean
    notas: string
    fecha: any
    tipo_transaccion: string
    tipo_pago: TipoPago
    categoria: CategoriasTransacciones[]
    producto: any
    tipo_movimiento: string
    
}
