import { IEstadoCategorias } from '../estado/estado-categorias';
import { IEstadoUsuarios } from '../estado/usuarios-state';
import { IEstadoEnlaces } from '../estado/estado-enlaces';

export interface IDatosAdmin extends IEstadoCategorias, IEstadoEnlaces, IEstadoUsuarios {
}