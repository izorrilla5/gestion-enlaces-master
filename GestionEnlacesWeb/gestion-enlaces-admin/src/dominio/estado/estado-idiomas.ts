import { IIdioma } from 'dominio/idioma';

export interface IEstadoIdiomas {
    idiomas: IIdioma[],
    idiomaBusqueda?: IIdioma,
    idiomaSeleccionado?: IIdioma
}