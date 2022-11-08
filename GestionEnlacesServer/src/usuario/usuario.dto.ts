import { Rol } from "src/rol/rol.entity";

export class UsuarioDto {
    readonly nombre: string;
    readonly apellidos: string;
    readonly email: string;
    pwd: string;
    codigoConfirmacion: string;
    activo: boolean;
    readonly idIdiomaSeleccionado: number;
    readonly rol: Rol;
    readonly necesitaCambiarContraena: boolean;
    readonly username: string;
    readonly colegiado?: string;
    readonly idProvincia?: number; 
}