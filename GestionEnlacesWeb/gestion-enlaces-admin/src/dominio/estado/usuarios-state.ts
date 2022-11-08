import { IUsuario } from '../usuario';
import { IRol } from 'dominio/rol';


export interface IEstadoUsuarios {
    usuarios: IUsuario[],
    usuarioBusqueda?: IUsuario,
    usuarioSeleccionado?: IUsuario,
    currentPageUsuarios: number,
    totalPageCountUsuarios: number,
    rolesBusqueda: IRol[]
    navegacionPerfil: boolean;
    usuarioInactivo: boolean;
}