import { Negocio } from "./negocio"

export interface Usuario {

    id:number
    nombre:string
    apellido:string
    correo:string
    clave:string
    foto:string
    Telefono:number
    negocio:Negocio[]

}
