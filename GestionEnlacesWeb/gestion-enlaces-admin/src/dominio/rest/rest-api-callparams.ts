import { IDatosSeguridad } from 'dominio/estado/datos-seguridad';

export interface RestApiCallParams<T> {
    datosSeguridad?: IDatosSeguridad;
    data?: T;
    page?: number;
    idIdioma?: number;
    necesitaCambiarContrasena?: boolean;
}
