import Axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import { ICategoria } from 'dominio/categoria';
import { IEnlace } from 'dominio/enlace';
import { IDatosSeguridad } from 'dominio/estado/datos-seguridad';
import { IListaEnlaces } from 'dominio/lista-enlaces';
import { IDatosAdmin } from 'dominio/rest/datos-admin';
import { RestApiCallParams } from 'dominio/rest/rest-api-callparams';
import { RestApiRepo } from 'dominio/rest/rest-api.repo';
import { IDatosSeguridadResponse } from 'dominio/seguridad/datos-seguridad-response';
import { ITag } from 'dominio/tag';
import { ITipoEnlace } from 'dominio/tipo-enlace';
import { IUsuario } from 'dominio/usuario';
import { IVoto } from 'dominio/voto';
import { IListaEnlacesFiltrada } from 'dominio/lista-enlaces-filtrada';
import { IRol } from 'dominio/rol';
import { IIdioma } from 'dominio/idioma';
import { getLoggedUserData, getToken, setToken } from 'infraestructura/auth/auth-manager';
import { IEmailContacto } from 'dominio/email-contacto';

const BASE_URL = '/api';
const LOGIN_URL = BASE_URL + '/auth/login';
const REGISTER_URL = BASE_URL + '/usuario/register'
const ENLACE_URL = BASE_URL + '/enlace/';
const ENLACE_BY_ID_URL = ENLACE_URL + 'byid/';
const ENLACES_MAS_VOTADOS_URL = ENLACE_URL + 'mas-votados/';
const ENLACES_ULTIMOS_URL = ENLACE_URL + 'ultimos/';
const ENLACES_PATROCINADOS = ENLACE_URL + 'patrocinados/'
const CATEGORIA_URL = BASE_URL + '/categoria/';
const TAG_URL = BASE_URL + '/tag/';
const TIPO_URL = BASE_URL + '/tipo/';
const MEDICOS_URL = BASE_URL + '/usuario?filter=rol.id||eq||2';
const VOTO_URL = BASE_URL + '/voto/';
const LISTA_URL = BASE_URL + '/lista/';
const USUARIO_URL = BASE_URL + '/usuario/';
const REGISTRO_USUARIO_URL = BASE_URL + '/usuario/register';
const ROL_URL = BASE_URL + '/rol/';
const IDIOMA_URL = BASE_URL + '/idioma/';
const IDIOMA_PARAM = 'idIdioma=';
const REFRESH_TOKEN_URL = BASE_URL + '/auth/update-token';
const UPDATE_PASS = BASE_URL + '/usuario/update-pass'
const ROL_PARAM = 'rol=';
const ENVIAR_EMAIL_URL = BASE_URL + '/sendjoinmail';
const ENVIAR_EMAIL_CONTACTO_URL = BASE_URL + '/sendcontactmail';

export class RestApiJsonMock implements RestApiRepo {

  obtenerDatos = (): Promise<AxiosResponse<any>> => {
    return Axios.get<IDatosAdmin>('/stub/datos_servidor.json')
      .then(unidadFamiliar => unidadFamiliar)
      .catch(errorResponse => errorResponse);
  }

  login = (params: RestApiCallParams<IDatosSeguridad>): Promise<AxiosResponse<any>> => {
    return Axios.post<IDatosSeguridadResponse>(LOGIN_URL, { username: params.data?.usuario, password: params.data?.pwd })
      .then(response => {
        return response;
      })
      .catch(errorResponse => {
        return errorResponse.response;
      });
  }

  register = (params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>> => {
    console.log("Params: ", params);
    const newUser = {
      nombre: params.data?.nombre,
      apellidos: params.data?.apellidos,
      username: params.data?.username,
      email: params.data?.email,
      pwd: params.data?.pwd,
      activo: false,
      rol: 1,
      necesitaCambiarContrasena: 0,
      idIdiomaSeleccionado: 1,
    }
    return Axios.post<IUsuario>(REGISTER_URL, newUser)
      .then(response => {
        return response;
      })
      .catch(errorResponse => {
        return errorResponse.response;
      });
  }

  obtenerEnlace = (params: RestApiCallParams<number>): Promise<AxiosResponse<any>> => {
    return Axios.get<IEnlace>(ENLACE_BY_ID_URL + params.data, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerLista = (params: RestApiCallParams<number>): Promise<AxiosResponse<any>> => {
    return Axios.get<IListaEnlaces>(LISTA_URL + params.data, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  buscarListasUsuario = (params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>> => {

    return Axios.get<IListaEnlaces>('/api/lista?filter=idUsuario||eq||2', {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  eliminarEnlace = (params: RestApiCallParams<number>): Promise<AxiosResponse<any>> => {
    return Axios.delete<IEnlace>(ENLACE_URL + params.data, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  eliminarLista = (params: RestApiCallParams<number>): Promise<AxiosResponse<any>> => {
    return Axios.delete<IListaEnlaces>(LISTA_URL + params.data, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }


  guardarEnlace(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>> {
    const enlace =
    {
      id: params.data?.id,
      titulo: params.data?.titulo,
      url: params.data?.url,
      tipo: params.data?.tipo,
      idUsuario: params.data?.usuario?.id,
      categoria: params.data?.categoria,
      tags: params.data?.tags,
      listas: params.data?.listas,
      traducciones: params.data?.traducciones,
    };

    if (enlace.id) {
      return Axios.put<IEnlace>(ENLACE_URL + enlace.id, enlace, {
        headers: {
          'Authorization': `bearer ` + getToken()
        }
      } as AxiosRequestConfig)
        .then(response => response)
        .catch(errorResponse => errorResponse);
    } else {
      return Axios.post<IEnlace>(ENLACE_URL, enlace, {
        headers: {
          'Authorization': `bearer ` + getToken()
        }
      } as AxiosRequestConfig)
        .then(response => response)
        .catch(errorResponse => errorResponse);
    }
  }

  guardarLista(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>> {
    const lista =
    {
      id: params.data?.id,
      nombre: params.data?.nombre,
      idUsuario: params.data?.idUsuario,
      categoria: params.data?.categoria,
      enlaces: params.data?.enlaces,
      traducciones: params.data?.traducciones,
    };

    if (lista.id) {
      return Axios.put<IListaEnlaces>(LISTA_URL + lista.id, lista, {
        headers: {
          'Authorization': `bearer ` + getToken()
        }
      } as AxiosRequestConfig)
        .then(response => response)
        .catch(errorResponse => errorResponse);
    } else {
      return Axios.post<IListaEnlaces>(LISTA_URL, lista, {
        headers: {
          'Authorization': `bearer ` + getToken()
        }
      } as AxiosRequestConfig)
        .then(response => response)
        .catch(errorResponse => errorResponse);
    }
  }

  buscarEnlaces(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>> {

    let queryParamsBuilt = '';

    const elementosBusqueda = ["titulo", "categoria", "subcategoria", "usuario", "tipo", "tags"];

    const enlaceBusqueda = params.data;

    if (enlaceBusqueda) {
      elementosBusqueda.forEach(element => {
        const itemBusqueda = enlaceBusqueda[element];
        if (itemBusqueda) {

          let resultTags = '';
          if (element == 'tags') {
            if (itemBusqueda.length == 0) {
              return;
            }
            itemBusqueda.forEach(x => {
              resultTags === '' ? resultTags += x.id : resultTags += ',' + x.id
            })
          }

          if (!queryParamsBuilt) {
            queryParamsBuilt += '?';
          } else {
            queryParamsBuilt += '&';
          }

          if (element == 'usuario') {
            queryParamsBuilt += 'join=usuario&';
          }

          queryParamsBuilt += 'filter='
            + (element === 'categoria' ? 'categoria.idCategoriaPadre' : (element === 'tipo') ? element + '.nombre' : ((element === 'tags' || element === 'usuario') ? element + '.id' : element))
            + (element === 'titulo' ? '||$cont||' : (element === 'tags' ? '||$in||' : '||$eq||'))
            + (element === 'categoria' ? itemBusqueda.idCategoriaPadre :
              (element === 'usuario' ? itemBusqueda.id :
                (element === 'tags' ? resultTags
                  : typeof (itemBusqueda) === 'string' ? itemBusqueda : itemBusqueda.nombre)));

          if (element == 'categoria') {
            if (itemBusqueda.categoriasRelacionadas && itemBusqueda.categoriasRelacionadas.length > 0
              && itemBusqueda.categoriasRelacionadas[0] && itemBusqueda.categoriasRelacionadas[0] != null) {
              queryParamsBuilt += '&filter=categoria.id||$eq||' + itemBusqueda.categoriasRelacionadas[0].id;
            } else if (itemBusqueda.padre) {
              queryParamsBuilt += '&filter=categoria.id||$eq||' + itemBusqueda.id;
            }
          }
        }
      });
    }

    if (!queryParamsBuilt) {
      queryParamsBuilt += '?';
    } else {
      queryParamsBuilt += '&';
    }
    queryParamsBuilt += 'limit=10&page=' + params.page


    return Axios.get<IEnlace>(ENLACE_URL + queryParamsBuilt + '&' + IDIOMA_PARAM + params.idIdioma + '&' + ROL_PARAM + getLoggedUserData().rol.id, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  buscarListas(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>> {

    let queryParamsBuilt = '';

    const elementosBusqueda = ["nombre", "categoria", "subcategoria", "usuario"];

    const enlaceBusqueda = params.data;

    if (enlaceBusqueda) {
      elementosBusqueda.forEach(element => {
        const itemBusqueda = enlaceBusqueda[element];
        if (itemBusqueda) {

          let resultTags = '';

          if (!queryParamsBuilt) {
            queryParamsBuilt += '?';
          } else {
            queryParamsBuilt += '&';
          }


          if (element == 'usuario') {
            queryParamsBuilt += 'join=usuario&';
          }

          queryParamsBuilt += 'filter='
            + (element === 'categoria' ? 'categoria.idCategoriaPadre' : (element === 'tipo' || element === 'tags') ? element + '.nombre' : (element === 'usuario' ? element + '.id' : element))
            + (element === 'titulo' || element === 'nombre' ? '||$cont||' : (element === 'tags' ? '||$in||' : '||$eq||'))
            + (element === 'categoria' ? itemBusqueda.idCategoriaPadre :
              (element === 'usuario' ? itemBusqueda.id :
                (element === 'tags' ? resultTags
                  : typeof (itemBusqueda) === 'string' ? itemBusqueda : itemBusqueda.nombre)));

          if (element == 'categoria') {
            if (itemBusqueda.categoriasRelacionadas && itemBusqueda.categoriasRelacionadas.length > 0
              && itemBusqueda.categoriasRelacionadas[0] && itemBusqueda.categoriasRelacionadas[0] != null) {
              queryParamsBuilt += '&filter=categoria.id||$eq||' + itemBusqueda.categoriasRelacionadas[0].id;
            }
          }
        }
      });
    }

    if (!queryParamsBuilt) {
      queryParamsBuilt += '?';
    } else {
      queryParamsBuilt += '&';
    }
    queryParamsBuilt += 'limit=10&page=' + params.page

    return Axios.get<IListaEnlaces>(LISTA_URL + queryParamsBuilt + '&' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }


  buscarMisListas(params: RestApiCallParams<IListaEnlacesFiltrada>): Promise<AxiosResponse<any>> {

    let queryParamsBuilt = '';

    const elementosBusqueda = ["nombre", "categoria", "subcategoria", "usuarioLogueado"];

    const enlaceBusqueda = params.data;

    if (enlaceBusqueda) {
      elementosBusqueda.forEach(element => {
        const itemBusqueda = enlaceBusqueda[element];
        if (itemBusqueda) {

          let resultTags = '';

          if (!queryParamsBuilt) {
            queryParamsBuilt += '?';
          } else {
            queryParamsBuilt += '&';
          }

          if (element == 'usuarioLogueado') {
            queryParamsBuilt += 'filter=idUsuario||$eq||' + (itemBusqueda.sub || itemBusqueda.id) + '';
          } else {
            queryParamsBuilt += 'filter='
              + (element === 'categoria' ? 'categoria.idCategoriaPadre' : (element === 'tipo' || element === 'tags') ? element + '.nombre' : (element === 'usuario' ? element + '.id' : element))
              + (element === 'titulo' || element === 'nombre' ? '||$cont||' : (element === 'tags' ? '||$in||' : '||$eq||'))
              + (element === 'categoria' ? itemBusqueda.idCategoriaPadre :
                (element === 'usuario' ? itemBusqueda.id :
                  (element === 'tags' ? resultTags
                    : typeof (itemBusqueda) === 'string' ? itemBusqueda : itemBusqueda.nombre)));

            if (element == 'categoria') {
              if (itemBusqueda.categoriasRelacionadas && itemBusqueda.categoriasRelacionadas.length > 0
                && itemBusqueda.categoriasRelacionadas[0] && itemBusqueda.categoriasRelacionadas[0] != null) {
                queryParamsBuilt += '&filter=categoria.id||$eq||' + itemBusqueda.categoriasRelacionadas[0].id;
              }
            }
          }
        }
      });
    }

    if (!queryParamsBuilt) {
      queryParamsBuilt += '?';
    } else {
      queryParamsBuilt += '&';
    }
    queryParamsBuilt += 'limit=10&page=' + params.page


    return Axios.get<IListaEnlaces>(LISTA_URL + queryParamsBuilt + '&' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  buscarMisListasPopUp(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>> {

    let queryParamsBuilt = '';

    const elementosBusqueda = ["nombre", "categoria", "subcategoria", "usuario"];

    const enlaceBusqueda = params.data;

    if (enlaceBusqueda) {
      elementosBusqueda.forEach(element => {
        const itemBusqueda = enlaceBusqueda[element];
        if (itemBusqueda) {

          let resultTags = '';

          if (!queryParamsBuilt) {
            queryParamsBuilt += '?';
          } else {
            queryParamsBuilt += '&';
          }

          if (element == 'usuario') {
            queryParamsBuilt += 'filter=idUsuario||$eq||' + (itemBusqueda.sub || itemBusqueda.id) + '';
          } else {
            queryParamsBuilt += 'filter='
              + (element === 'categoria' ? 'categoria.idCategoriaPadre' : (element === 'usuario' || element === 'tipo' || element === 'tags') ? element + '.nombre' : element)
              + (element === 'titulo' || element === 'nombre' ? '||$cont||' : (element === 'tags' ? '||$in||' : '||$eq||'))
              + (element === 'categoria' ? itemBusqueda.idCategoriaPadre :
                (element === 'tags' ? resultTags
                  : typeof (itemBusqueda) === 'string' ? itemBusqueda : itemBusqueda.nombre));

            if (element == 'categoria') {
              if (itemBusqueda.categoriasRelacionadas && itemBusqueda.categoriasRelacionadas.length > 0
                && itemBusqueda.categoriasRelacionadas[0] && itemBusqueda.categoriasRelacionadas[0] != null) {
                queryParamsBuilt += '&filter=categoria.id||$eq||' + itemBusqueda.categoriasRelacionadas[0].id;
              }
            }
          }
        }
      });
    }

    if (!queryParamsBuilt) {
      queryParamsBuilt += '?';
    } else {
      queryParamsBuilt += '&';
    }
    queryParamsBuilt += 'limit=3&page=' + params.page

    console.log('lista pop up rest api')

    return Axios.get<IListaEnlaces>(LISTA_URL + queryParamsBuilt + '&' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }


  obtenerCategorias(params: RestApiCallParams<ICategoria>): Promise<AxiosResponse<any>> {

    return Axios.get<ICategoria>(CATEGORIA_URL + '?' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerTipos(params: RestApiCallParams<ITipoEnlace>): Promise<AxiosResponse<any>> {

    return Axios.get<ITipoEnlace>(TIPO_URL + '?' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerTags(params: RestApiCallParams<ITag>): Promise<AxiosResponse<any>> {
    return Axios.get<ITag>(TAG_URL + '?' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerMedicos(): Promise<AxiosResponse<any>> {
    return Axios.get<IUsuario>(MEDICOS_URL, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  guardarRating(params: RestApiCallParams<IVoto>): Promise<AxiosResponse<any>> {
    const voto =
    {
      idEnlace: params.data?.idEnlace,
      valor: params.data?.valor,
    };

    return Axios.post<IVoto>(VOTO_URL, voto, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerMasVotados(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>> {

    return Axios.get<IEnlace>(ENLACES_MAS_VOTADOS_URL + '?' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }


  obtenerUltimosEnlaces(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>> {

    return Axios.get<IEnlace>(ENLACES_ULTIMOS_URL + '?' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerEnlacesPatrocinados(params: RestApiCallParams<IEnlace>): Promise<AxiosResponse<any>> {
    return Axios.get<IEnlace>(ENLACES_PATROCINADOS + '?' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  buscarUsuario(params: RestApiCallParams<any>): Promise<AxiosResponse<any>> {

    let queryParamsBuilt = '?filter=';

    if (params.data.datos.nombre) {
      queryParamsBuilt += 'email||$cont||' + params.data.datos.nombre + '&nombre||$cont||' + params.data.datos.nombre + '&apellidos||$cont||' + params.data.datos.nombre
      if (!queryParamsBuilt) {
        queryParamsBuilt += '?filter=';
      } else {
        queryParamsBuilt += '&filter=';
      }
    }

    let rolesAFiltrar = (params.data.rolesBusqueda && params.data.rolesBusqueda.length > 0) ? params.data.rolesBusqueda.map(a => a.id) : -1;
    queryParamsBuilt += 'rol.id||in||' + rolesAFiltrar.toString();

    if (!queryParamsBuilt) {
      queryParamsBuilt += '?';
    } else {
      queryParamsBuilt += '&';
    }

    queryParamsBuilt += 'limit=10&page=' + params.page

    return Axios.get<IUsuario>(USUARIO_URL + queryParamsBuilt, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerRoles(params: RestApiCallParams<IRol>): Promise<AxiosResponse<any>> {

    return Axios.get<IRol>(ROL_URL + '?' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  guardarUsuario(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>> {
    if (params.data!.id) {
      return Axios.patch<IUsuario>(USUARIO_URL + params.data!.id, params.data, {
        headers: {
          'Authorization': `bearer ` + getToken()
        }
      } as AxiosRequestConfig)
        .then(response => response)
        .catch(errorResponse => errorResponse);
    } else {
      return Axios.post<IUsuario>(USUARIO_URL, params.data, {
        headers: {
          'Authorization': `bearer ` + getToken()
        }
      } as AxiosRequestConfig)
        .then(response => response)
        .catch(errorResponse => errorResponse);
    }
  }

  registrarUsuario(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>> {
    console.log(params.data);
    return Axios.post<IUsuario>(REGISTRO_USUARIO_URL, params.data)
      .then(response => response)
      .catch(errorResposnse => errorResposnse);
  }

  obtenerUsuario = (params: RestApiCallParams<number>): Promise<AxiosResponse<any>> => {
    return Axios.get<IUsuario>(USUARIO_URL + params.data, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  buscarListasUserPage(params: RestApiCallParams<IListaEnlaces>): Promise<AxiosResponse<any>> {

    let queryParamsBuilt = '';

    const elementosBusqueda = ["nombre", "categoria", "subcategoria", "usuario"];

    const enlaceBusqueda = params.data;

    if (enlaceBusqueda) {
      elementosBusqueda.forEach(element => {
        const itemBusqueda = enlaceBusqueda[element];
        if (itemBusqueda) {

          let resultTags = '';

          if (!queryParamsBuilt) {
            queryParamsBuilt += '?';
          } else {
            queryParamsBuilt += '&';
          }

          queryParamsBuilt += 'filter='
            + (element === 'categoria' ? 'categoria.idCategoriaPadre' : (element === 'usuario' || element === 'tipo' || element === 'tags') ? element + '.nombre' : element)
            + (element === 'titulo' || element === 'nombre' ? '||$cont||' : (element === 'tags' ? '||$in||' : '||$eq||'))
            + (element === 'categoria' ? itemBusqueda.idCategoriaPadre :
              (element === 'tags' ? resultTags
                : typeof (itemBusqueda) === 'string' ? itemBusqueda : itemBusqueda.nombre));

          if (element == 'categoria') {
            if (itemBusqueda.categoriasRelacionadas && itemBusqueda.categoriasRelacionadas.length > 0
              && itemBusqueda.categoriasRelacionadas[0] && itemBusqueda.categoriasRelacionadas[0] != null) {
              queryParamsBuilt += '&filter=categoria.id||$eq||' + itemBusqueda.categoriasRelacionadas[0].id;
            }
          }
        }
      });
    }

    if (!queryParamsBuilt) {
      queryParamsBuilt += '?';
    } else {
      queryParamsBuilt += '&';
    }
    queryParamsBuilt += 'limit=10&page=' + params.page

    return Axios.get<IListaEnlaces>(LISTA_URL + queryParamsBuilt + '&' + IDIOMA_PARAM + params.idIdioma, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  obtenerIdiomas(): Promise<AxiosResponse<any>> {

    return Axios.get<IIdioma>(IDIOMA_URL, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  eliminarUsuario = (params: RestApiCallParams<number>): Promise<AxiosResponse<any>> => {
    return Axios.delete<IUsuario>(USUARIO_URL + params.data, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }


  refrescarToken = () => {
    const token = getToken();
    if (token) {
      Axios.post<any>(REFRESH_TOKEN_URL, { token })
        .then(response => { setToken(response.data.access_token) })
        .catch(errorResponse => errorResponse);
    }
  }

  actualizarPass(params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>> {

    return Axios.put<IUsuario>(UPDATE_PASS, params.data, {
      headers: {
        'Authorization': `bearer ` + getToken()
      }
    } as AxiosRequestConfig)
      .then(response => response)
      .catch(errorResponse => errorResponse);
  }

  sendMail = (params: RestApiCallParams<IUsuario>): Promise<AxiosResponse<any>> => {
    return Axios.post<IDatosSeguridadResponse>(ENVIAR_EMAIL_URL,
      {
        nombre: params.data?.nombre,
        apellidos: params.data?.apellidos,
        provincia: params.data?.provincia?.nombre,
        numerocolegiado: params.data?.colegiado,
        email: params.data?.email,
        username: params.data?.username
      }).then(response => {
        return response;
      }).catch(errorResponse => {
        return errorResponse.response;
      });
  }

  sendContact = (params: RestApiCallParams<IEmailContacto>): Promise<AxiosResponse<any>> => {
    return Axios.post<IDatosSeguridadResponse>(ENVIAR_EMAIL_CONTACTO_URL, params.data).then(response => {
      return response;
    }).catch(errorResponse => {
      return errorResponse.response;
    });
  }
  /*
    private getAuthorizationHeader(): AxiosRequestConfig {
      const accessToken = getToken();
      if (!accessToken) {
        return {} as AxiosRequestConfig;
      }
      return {
        headers: {
          'Authorization': `bearer ${accessToken}`
        }
      } as AxiosRequestConfig;
    }
  
    private authHeader(): AxiosRequestConfig | undefined {
      return {
        headers: {
          'Authorization': `bearer ` + getToken()
        }
      };
    }
  */
}


