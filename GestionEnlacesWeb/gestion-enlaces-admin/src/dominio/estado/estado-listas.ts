import { IListaEnlaces } from "dominio/lista-enlaces";
import { IListaEnlacesFiltrada } from 'dominio/lista-enlaces-filtrada';

export interface IEstadoListas {
  listas: IListaEnlaces[];
  misListas: IListaEnlaces[];
  listaBusqueda?: IListaEnlacesFiltrada;
  listasUsuario: IListaEnlaces[];
  listaSeleccionada?: IListaEnlaces;
  currentPageListas: number,
  currentPageMisListas: number,
  totalPageCountListas: number,
  totalPageCountMisListas: number,
  navegacion?: number
}

