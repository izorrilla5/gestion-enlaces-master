import { IEnlace } from "dominio/enlace";
import { IDatosSeguridad } from "dominio/estado/datos-seguridad";
import { IdiomaEnum } from "dominio/idioma-enum";
import { IListaEnlaces } from "dominio/lista-enlaces";
import { ParamsGenericos } from "dominio/rest/params-genericos-rest";
import { RestApiCallParams } from "dominio/rest/rest-api-callparams";
import { RestApiRepo } from "dominio/rest/rest-api.repo";
import { IVoto } from "dominio/voto";
import { llamadaServer } from "interfaz/app/sagas/llamada-server.saga";
import { IRol } from 'dominio/rol';
import { IUsuario } from 'dominio/usuario';
import { ICategoria } from 'dominio/categoria';
import { ITipoEnlace } from 'dominio/tipo-enlace';
import { ITag } from 'dominio/tag';
import { IEmailContacto } from "dominio/email-contacto";

export class ServicioSincronizacion {
  constructor(public restApi: RestApiRepo) { }

  public obtenerDatosServer(
    datosSeguridad: IDatosSeguridad,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const genericParams: ParamsGenericos = this.obtenerParametrosGenericos(
      idioma
    );
    const callParams: RestApiCallParams<any> = {
      datosSeguridad,
      data: {
        ...genericParams,
      },
    };
    return llamadaServer(
      this.restApi.obtenerDatos,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public login(
    datosSeguridad: IDatosSeguridad,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<IDatosSeguridad> = {
      datosSeguridad,
      data: {
        ...datosSeguridad,
      },
    };
    return llamadaServer(
      this.restApi.login,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public register(
    nuevoUser: IUsuario,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: any = {
      nuevoUser,
      data: {
        ...nuevoUser,
      },
    };
    return llamadaServer(
      this.restApi.register,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerEnlace(
    enlace: IEnlace,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<number> = {
      datosSeguridad: undefined,
      data: enlace.id,
    };
    return llamadaServer(
      this.restApi.obtenerEnlace,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerLista(
    lista: IListaEnlaces,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<number> = {
      datosSeguridad: undefined,
      data: lista.id,
    };
    return llamadaServer(
      this.restApi.obtenerLista,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public buscarListasUsuario(
    lista: IListaEnlaces,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<number> = {
      datosSeguridad: undefined,
      data: lista.id,
    };
    return llamadaServer(
      this.restApi.buscarListasUsuario,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public eliminarEnlace(
    enlace: IEnlace,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<number> = {
      datosSeguridad: undefined,
      data: enlace.id,
    };
    return llamadaServer(
      this.restApi.eliminarEnlace,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public eliminarLista(
    lista: IListaEnlaces,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<number> = {
      datosSeguridad: undefined,
      data: lista.id,
    };
    return llamadaServer(
      this.restApi.eliminarLista,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  private obtenerParametrosGenericos(idioma: IdiomaEnum): ParamsGenericos {
    return {
      idioma: idioma.toLocaleUpperCase(),
    };
  }

  public guardarEnlace(
    enlace: IEnlace,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    console.log("guardarEnlace", enlace);
    const callParams: RestApiCallParams<IEnlace> = {
      datosSeguridad: undefined,
      data: enlace,
    };
    return llamadaServer(
      this.restApi.guardarEnlace,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public guardarLista(
    lista: IListaEnlaces,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    console.log("guardarLista", lista);
    const callParams: RestApiCallParams<IListaEnlaces> = {
      datosSeguridad: undefined,
      data: lista,
    };
    return llamadaServer(
      this.restApi.guardarLista,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public buscarEnlaces(
    enlace: IEnlace,
    page: number,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IEnlace> = {
      datosSeguridad: undefined,
      data: enlace,
      page: page,
      idIdioma
    };
    return llamadaServer(
      this.restApi.buscarEnlaces,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public buscarListas(
    lista: IListaEnlaces,
    page: number,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IListaEnlaces> = {
      datosSeguridad: undefined,
      data: lista,
      page: page,
      idIdioma
    };
    return llamadaServer(
      this.restApi.buscarListas,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public buscarMisListas(
    lista: IListaEnlaces,
    page: number,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IListaEnlaces> = {
      datosSeguridad: undefined,
      data: lista,
      page: page,
      idIdioma
    };
    return llamadaServer(
      this.restApi.buscarMisListas,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public buscarMisListasPopUp(
    lista: IListaEnlaces,
    page: number,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IListaEnlaces> = {
      datosSeguridad: undefined,
      data: lista,
      page: page,
      idIdioma
    };
    return llamadaServer(
      this.restApi.buscarMisListasPopUp,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerCategorias(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<ICategoria> = {
      datosSeguridad: undefined,
      idIdioma
    };
    return llamadaServer(
      this.restApi.obtenerCategorias,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerTipos(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<ITipoEnlace> = {
      datosSeguridad: undefined,
      idIdioma
    };

    return llamadaServer(
      this.restApi.obtenerTipos,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerTags(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<ITag> = {
      datosSeguridad: undefined,
      idIdioma
    };

    return llamadaServer(
      this.restApi.obtenerTags,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerMedicos(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<IEnlace> = {
      datosSeguridad: undefined,
    };

    return llamadaServer(
      this.restApi.obtenerMedicos,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public guardarRating(
    voto: IVoto,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    console.log("guardarRating", voto);
    const callParams: RestApiCallParams<IVoto> = {
      datosSeguridad: undefined,
      data: voto,
    };
    return llamadaServer(
      this.restApi.guardarRating,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerUltimosEnlaces(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IEnlace> = {
      datosSeguridad: undefined,
      idIdioma
    };

    return llamadaServer(
      this.restApi.obtenerUltimosEnlaces,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerMasVotados(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IEnlace> = {
      datosSeguridad: undefined,
      idIdioma
    };

    return llamadaServer(
      this.restApi.obtenerMasVotados,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerEnlacesPatrocinados(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IEnlace> = {
      datosSeguridad: undefined,
      idIdioma
    };

    return llamadaServer(
      this.restApi.obtenerEnlacesPatrocinados,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public buscarUsuario(
    usuario: any,
    page: number,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<any> = {
      datosSeguridad: undefined,
      data: usuario,
      page: page,
    };
    return llamadaServer(
      this.restApi.buscarUsuario,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerRoles(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IRol> = {
      datosSeguridad: undefined,
      idIdioma
    };

    return llamadaServer(
      this.restApi.obtenerRoles,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public guardarUsuario(
    usuario: IUsuario,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    console.log("guardar Usuario sincronización", usuario);
    const callParams: RestApiCallParams<IUsuario> = {
      datosSeguridad: undefined,
      data: usuario,
    };
    return llamadaServer(
      this.restApi.guardarUsuario,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerUsuario(
    usuario: IUsuario,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<number> = {
      datosSeguridad: undefined,
      data: usuario.id,
    };
    return llamadaServer(
      this.restApi.obtenerUsuario,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public buscarListasUserPage(
    lista: IListaEnlaces,
    page: number,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idIdioma: number
  ) {
    const callParams: RestApiCallParams<IListaEnlaces> = {
      datosSeguridad: undefined,
      data: lista,
      page: page,
      idIdioma
    };
    return llamadaServer(
      this.restApi.buscarListasUserPage,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public obtenerIdiomas(
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<IRol> = {
      datosSeguridad: undefined,
    };

    return llamadaServer(
      this.restApi.obtenerIdiomas,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public eliminarUsuario(
    usuario: IUsuario,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<number> = {
      datosSeguridad: undefined,
      data: usuario.id,
    };
    return llamadaServer(
      this.restApi.eliminarUsuario,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }

  public refrescarToken() {
    const callParams: RestApiCallParams<number> = {
    };
    return llamadaServer(
      this.restApi.refrescarToken,
      undefined,
      undefined,
      callParams
    );
  }

  public actualizarPass(
    usuario: any,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    console.log("actualizar contraseña sincronización", usuario);
    const callParams: RestApiCallParams<IUsuario> = {
      datosSeguridad: undefined,
      data: usuario,
    };
    return llamadaServer(
      this.restApi.actualizarPass,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }


  public enviarEmail(
    usuario: any,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<IUsuario> = {
      datosSeguridad: undefined,
      data: usuario,
    };
    return llamadaServer(
      this.restApi.sendMail,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }


  public enviarEmailContacto(
    emailContacto: IEmailContacto,
    mensajeCorrecto: string | undefined,
    mensajeError: string | undefined,
    idioma: IdiomaEnum
  ) {
    const callParams: RestApiCallParams<IEmailContacto> = {
      datosSeguridad: undefined,
      data: emailContacto,
    };
    return llamadaServer(
      this.restApi.sendContact,
      mensajeCorrecto,
      mensajeError,
      callParams
    );
  }
}