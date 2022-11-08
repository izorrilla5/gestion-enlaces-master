import { IEnlace } from '../enlace';

export interface IEstadoEnlaces {
    enlaces: IEnlace[],
    currentPage: number,
    totalPageCount: number,
    enlaceSeleccionado?: IEnlace,
    enlaceBusqueda?: IEnlace,
    ultimosEnlaces: IEnlace[],
    masVotadosEnlaces: IEnlace[],
    enlacesPatrocinados: IEnlace[],
    navegacion?: number
}