import { IEstadoPromesa } from 'dominio/estado/promesa/estado-promesa';

export interface  IAccionEstadoPromesa {
  type: string;
  payload: IEstadoPromesa;
}
