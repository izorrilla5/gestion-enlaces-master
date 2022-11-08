import { IListaEnlaces } from './lista-enlaces';
import { IUsuario } from './usuario';

export interface IListaEnlacesFiltrada extends IListaEnlaces {
    usuarioLogueado?:IUsuario;
}