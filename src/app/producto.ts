import { CategoriasProductos } from "./categorias-productos"

export interface Producto {

    id: number
    nombre: string
    precio: number
    costo:number
    stock: number
    unidadMedida:string
    fechaCreacion: string
    fechaModificacion:string
    imagen:string
    estado: Boolean
    descripcion:string
    categoria: CategoriasProductos[]

}
