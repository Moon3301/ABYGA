import { SubCategoria } from "./sub-categoria"

export interface CategoriasTransacciones {

    id:number
    nombre: string
    subCategoria: SubCategoria[]
    
}
