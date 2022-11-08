import { ICategoria } from './categoria';
import { IUsuario } from './usuario';
import { ITag } from './tag';
import { IEnlace } from './enlace';
import { ITraduccion } from './traduccion';

export interface IListaEnlaces {
    id?: number;
    nombre: string;
    usuario?: IUsuario;
    idUsuario?:number;
    categoria?: ICategoria;
    idCategoria?:number;
    enlaces?: IEnlace[];
    tags?: ITag[];
    traducciones?: ITraduccion[];
}
