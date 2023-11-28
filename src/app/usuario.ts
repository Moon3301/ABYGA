import { Negocio } from "./negocio"

export interface Usuario {

    id:any
    nombreUsuario:any
    correo:any
    clave:any
    telefono:any
    login:boolean
    negocio: Negocio
    
}
