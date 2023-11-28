import { CategoriasTransacciones } from "./categorias-transacciones"
import { Usuario } from "./usuario"

export interface Transaccion {

    id: number
    nombre: string
    monto: number
    notificacion: boolean
    notas: string
    fecha: any
    tipo_transaccion: string
    tipo_pago: string
    categoria: CategoriasTransacciones[]
    producto: any
    tipo_movimiento: string
    usuario:Usuario

    
}
