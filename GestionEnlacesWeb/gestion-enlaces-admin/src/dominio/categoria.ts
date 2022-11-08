import { ITraduccion } from './traduccion';

export interface ICategoria {
    id: number;
    nombre: string;
    idCategoriaPadre: number;
    padre: ICategoria;
    categoriasRelacionadas?: ICategoria[];
    traducciones?: ITraduccion[];
}
