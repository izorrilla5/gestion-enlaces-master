import { AxiosResponse } from 'axios';
import { RestApiCallParams } from './rest-api-callparams';
import { IDatosSeguridad } from 'dominio/estado/datos-seguridad';
import { IEnlace } from 'dominio/enlace';
import { IVoto } from 'dominio/voto';
import { IListaEnlaces } from 'dominio/lista-enlaces';
import { IUsuario } from 'dominio/usuario';
import { ICategoria } from 'dominio/categoria';
import { ITipoEnlace } from 'dominio/tipo-enlace';
import { ITag } from 'dominio/tag';
import { IRol } from 'dominio/rol';
import { IEmailContacto } from 'dominio/email-contacto';
export interface RestApiRepo {
    obtenerDatos(): Promise<AxiosResponse<any>>;
    login(params: RestApiCallParams<IDatosSeguridad>): Promise<AxiosResponse<any>>;
    register(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>>;
    obtenerEnlace(params: RestApiCallParams<number>): Promise<AxiosResponse<any>>;
    obtenerLista(params: RestApiCallParams<number>): Promise<AxiosResponse<any>>;
    eliminarEnlace(params: RestApiCallParams<number>): Promise<AxiosResponse<any>>;
    eliminarLista(params: RestApiCallParams<number>): Promise<AxiosResponse<any>>;
    guardarEnlace(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>>;
    guardarLista(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>>;
    buscarEnlaces(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>>;
    buscarListas(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>>;
    buscarMisListas(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>>;
    buscarMisListasPopUp(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>>;
    obtenerCategorias(params: RestApiCallParams<ICategoria>): Promise<AxiosResponse<any>>;
    obtenerTipos(params: RestApiCallParams<ITipoEnlace>): Promise<AxiosResponse<any>>;
    obtenerTags(params: RestApiCallParams<ITag>): Promise<AxiosResponse<any>>;
    obtenerMedicos(): Promise<AxiosResponse<any>>;
    guardarRating(params: RestApiCallParams<IVoto>): Promise<AxiosResponse<any>>;
    obtenerMasVotados(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>>;
    obtenerUltimosEnlaces(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>>;
    obtenerEnlacesPatrocinados(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>>;
    buscarListasUsuario(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>>;
    buscarUsuario(params: RestApiCallParams<any>): Promise<AxiosResponse<any>>;
    obtenerRoles(params: RestApiCallParams<IRol>): Promise<AxiosResponse<any>>;
    guardarUsuario(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>>;
    registrarUsuario(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>>;
    obtenerUsuario(params: RestApiCallParams<number>): Promise<AxiosResponse<any>>;
    buscarListasUserPage(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>>;
    obtenerIdiomas(): Promise<AxiosResponse<any>>;
    eliminarUsuario(params: RestApiCallParams<number>): Promise<AxiosResponse<any>>;
    refrescarToken();
    actualizarPass(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>>;
    sendMail(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>>;
    sendContact(params: RestApiCallParams<IEmailContacto>): Promise<AxiosResponse<any>>;
}