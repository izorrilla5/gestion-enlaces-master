import { IDatosSeguridadResponse } from 'dominio/seguridad/datos-seguridad-response';
import { IEstadoCategorias } from './estado-categorias';
import { IEstadoEnlaces } from './estado-enlaces';
import { IEstadoListas } from './estado-listas';
import { IEstadoMedicos } from './estado-medicos';
import { IEstadoRol } from './estado-rol';
import { IEstadoTags } from './estado-tags';
import { IEstadoTipos } from './estado-tipos';
import { IEstadoPromesa } from './promesa/estado-promesa';
import { IEstadoUsuarios } from './usuarios-state';
import { IEstadoIdiomas } from './estado-idiomas';


export interface IEstadoAplicacion {
    datosSeguridad: IDatosSeguridadResponse,
    datosEnlaces: IEstadoEnlaces,
    datosUsuarios: IEstadoUsuarios,
    datosTipos: IEstadoTipos,
    datosCategorias: IEstadoCategorias,
    datosTags: IEstadoTags,
    datosMedicos: IEstadoMedicos
    datosEstadoPromesa: IEstadoPromesa,
    datosListas: IEstadoListas,
    datosRol: IEstadoRol,
    datosIdiomas: IEstadoIdiomas
}