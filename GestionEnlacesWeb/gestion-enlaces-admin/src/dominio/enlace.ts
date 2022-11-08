import { ICategoria } from './categoria';
import { IUsuario } from './usuario';
import { ITipoEnlace } from './tipo-enlace';
import { ITag } from './tag';
import { IVoto } from './voto';
import { IListaEnlaces } from './lista-enlaces';
import { ITraduccion } from './traduccion';

export interface IEnlace {
    id?: number;
    titulo: string;
    url: string;
    categoria?: ICategoria;
    idUsuario?: number;
    usuario?: IUsuario;
    tipo?: ITipoEnlace;
    tags?: ITag[];
    votos?: IVoto[];
    mediaVotos?: number;
    listas?: IListaEnlaces[];
    traducciones?: ITraduccion[];
    patrocinado?: boolean
}
