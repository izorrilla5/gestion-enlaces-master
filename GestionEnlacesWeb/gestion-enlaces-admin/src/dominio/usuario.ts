import { IListaEnlaces } from "./lista-enlaces";
import { IEnlace } from './enlace';
import { IRol } from './rol';
import { Provincia } from 'interfaz/admin/paginas/UsuariosAltaEditar';

export interface IUsuario {
    id?: number;
    nombre: string;
    apellidos?: string;
    email?: string;
    username?: string;
    pwd?: string;
    rol?: IRol;
    colegiado?: string;
    provincia?:Provincia;
    activo?: boolean;
    listas?: IListaEnlaces[];
    enlaces?: IEnlace[];
    idIdiomaSeleccionado?: number;
    necesitaCambiarContrasena?: boolean;
}
