import { createAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { EnlaceAccion } from "dominio/enlaces/enlace.action";
import { IdiomaEnum } from "dominio/idioma-enum";
import { IListaEnlaces } from "dominio/lista-enlaces";
import { appContext } from "index";
import { cancelled, put, takeEvery, takeLatest } from "redux-saga/effects";
import { actualizarDatosListasSeleccionado, guardarListaCompleted, obtenerDatosListaCompleted, searchList, searchListCompleted, searchListUserCompleted, searchMyListCompleted, searchMyListPopUpCompleted, searchMyList, searchListUserPageCompleted, listaEliminada, eliminarListaDeUsuario } from "../acciones/creators/listas.action.creator";
import { AccionesDatosListas } from "../acciones/types/listas.action.types";
import { IListaEnlacesFiltrada } from 'dominio/lista-enlaces-filtrada';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';

export function* watchListaDetailRequest() {
  yield takeLatest(AccionesDatosListas.OBTENER_DATOS_LISTA, requestDatosLista);
}

export function* watchListaDetailRequestCompleted() {
  yield takeEvery(
    AccionesDatosListas.OBTENER_DATOS_LISTA_COMPLETED,
    requestDatosListaCompleted
  );
}

export function* watchEliminarLista() {
  yield takeLatest(AccionesDatosListas.DATOS_ELIMINAR, requestEliminarLista);
}

export function* watchListaEliminado() {
  yield takeEvery(
    AccionesDatosListas.DATOS_ELIMINADOS,
    requestEliminarListaCompleted
  );
}

export function* watchCreateNuevaListaRequest() {
  yield takeLatest(AccionesDatosListas.CREAR_NUEVA_LISTA, requestNuevaLista);
}

export function* watchGuardarLista() {
  yield takeLatest(AccionesDatosListas.GUARDAR_LISTA, requestGuardarLista);
}

export function* watchGuardarListaCompleted() {
  yield takeEvery(
    AccionesDatosListas.GUARDAR_LISTAS_COMPLETED,
    requestGuardarListasCompleted
  );
}

export function* watchBuscarLista() {
  yield takeLatest(AccionesDatosListas.BUSCAR_LISTAS, requestBuscarLista);
}

export function* watchBuscarListaCompleted() {
  yield takeEvery(
    AccionesDatosListas.BUSCAR_LISTAS_COMPLETED,
    requestBuscarListasCompleted
  );
}

export function* watchBuscarMiLista() {
  yield takeLatest(AccionesDatosListas.BUSCAR_MIS_LISTAS, requestBuscarMiLista);
}

export function* watchBuscarMiListaCompleted() {
  yield takeEvery(
    AccionesDatosListas.BUSCAR_MIS_LISTAS_COMPLETED,
    requestBuscarMisListasCompleted
  );
}

export function* watchBuscarMiListaPopUp() {
  yield takeLatest(AccionesDatosListas.BUSCAR_MIS_LISTAS_POPUP, requestBuscarMiListaPopUp);
}

export function* watchBuscarMiListaPopUpCompleted() {
  yield takeEvery(
    AccionesDatosListas.BUSCAR_MIS_LISTAS_POPUP_COMPLETED,
    requestBuscarMisListasPopUpCompleted
  );
}


export function* watchBuscarListaUsuario() {
  yield takeLatest(
    AccionesDatosListas.BUSCAR_LISTA_USUARIO,
    requestBuscarListaUsuario
  );
}

export function* watchBuscarListaUsuarioCompleted() {
  yield takeEvery(
    AccionesDatosListas.BUSCAR_LISTA_USUARIO_COMPLETED,
    requestBuscarListaUsuarioCompleted
  );
}

export function* watchClonarLista() {
  yield takeLatest(AccionesDatosListas.CLONAR_LISTA, requestClonarLista);
}

export const actualizarDatoListaSeleccionada = createAction(
  AccionesDatosListas.ACTUALIZAR_DATOS_LISTA_SELECCIONADO,
  function prepare(listas: IListaEnlaces[]) {
    return {
      payload: {
        datos: listas,
      },
    };
  }
);

export function* watchBuscarListasUsuariosPage() {
  yield takeLatest(AccionesDatosListas.BUSCAR_LISTAS_USUARIOSPAGE, requestBuscarListasUsuariosPage);
}

export function* watchBuscarListasUsuariosPageCompleted() {
  yield takeEvery(
    AccionesDatosListas.BUSCAR_LISTAS_USUARIOSPAGE_COMPLETED,
    requestBuscarListasUsuariosPageCompleted
  );
}

export function* requestDatosLista(action: EnlaceAccion) {
  try {
    const datoLista: IListaEnlaces = action.payload.datos;
    /*
		datoEnlace.usuario = {
			idUsuario: 1, nombre: '',
			apellidos: 'string;',
			email: 'string',
			password: 'string',
			rol: {
				idRol: 1,
				nombre: ''
			},
			activo: true
		};*/
    const response: any = yield appContext.servicioSincronizacion.obtenerLista(
      datoLista,
      "Error",
      undefined,
      IdiomaEnum.ES
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data

    yield put(obtenerDatosListaCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestDatosListaCompleted(action: EnlaceAccion) {
  try {
    yield put(actualizarDatoListaSeleccionada(action.payload.datos));
    yield put(push("/ListaAltaEditar"));
  } catch (error) {
    //TODO: gestionar ERROR
    //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
  }
}

export function* requestBuscarLista(action: EnlaceAccion) {
  try {
    const datoLista = action.payload.datos;
    const page = action.payload.page || 1;
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.buscarListas(
      datoLista,
      page,
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(searchListCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarListasCompleted(action: EnlaceAccion) {
  try {
    const datosListas = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response BuscarListas Completed", datosListas);
    yield put(push("/Listas"));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarMiLista(action: EnlaceAccion) {
  try {
    const datoLista = action.payload.datos;
    const page = action.payload.page || 1;
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.buscarMisListas(
      datoLista,
      page,
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(searchMyListCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarMisListasCompleted(action: EnlaceAccion) {
  try {
    const datosListas = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response Buscar Mis Listas", datosListas);
    yield put(push("/Listas"));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarMiListaPopUp(action: EnlaceAccion) {
  try {
    const datoLista = action.payload.datos;
    const page = action.payload.page || 1;
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.buscarMisListasPopUp(
      datoLista,
      page,
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(searchMyListPopUpCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}


export function* requestBuscarMisListasPopUpCompleted(action: EnlaceAccion) {
  try {
    const datosListas = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response BuscarListas Pop Up", datosListas);
    yield put(push("/Admin"));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarListaUsuario(action: EnlaceAccion) {
  try {
    const datoLista = action.payload.datos;
    const response: any = yield appContext.servicioSincronizacion.buscarListasUsuario(
      datoLista,
      "Error",
      undefined,
      IdiomaEnum.ES
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data

    yield put(searchListUserCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarListaUsuarioCompleted(action: EnlaceAccion) {
  try {
    const datosListas = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response", datosListas);
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestEliminarLista(action: EnlaceAccion) {
  try {
    const datoLista = action.payload.datos;
    yield appContext.servicioSincronizacion.eliminarLista(
      datoLista,
      "Error",
      undefined,
      IdiomaEnum.ES
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    if(action.payload.pantallaOrigen == 1){
      yield put(searchList({ nombre: "" }, 1, getLoggedUserData().idIdiomaSeleccionado));

      const lista: IListaEnlacesFiltrada = Object.assign(
        {
          nombre: "",
          usuarioLogueado: datoLista.usuario,
        }
      ) as IListaEnlacesFiltrada;
      yield put(searchMyList(lista, 1, getLoggedUserData().idIdiomaSeleccionado));
    }
    yield put(listaEliminada(action.payload.datos, action.payload.pantallaOrigen || 1));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestEliminarListaCompleted(action: EnlaceAccion) {
  try {
    //TODO: revisar que hacer a la vuelta de eliminar enlace
    //yield put(actualizarDatosEnlaceSeleccionado());
    const origenEliminar = action.payload.pantallaOrigen || 1;
    if (origenEliminar === 1) {
      yield put(push("/Listas"));
    } else {      
      yield put(eliminarListaDeUsuario(action.payload.datos));

      //yield put(push("/UsuarioAltaEditar"));
    }
  } catch (error) {
    //TODO: gestionar ERROR
    //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
  }
}

export function* requestNuevaLista(action: EnlaceAccion) {
  try {
    yield put(actualizarDatosListasSeleccionado(action.payload.datos));
    yield put(push("/ListaAltaEditar"));
  } catch (error) {
    //TODO: gestionar ERROR
    //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
  }
}

export function* requestGuardarLista(action: EnlaceAccion) {
  try {
    const datosLista: IListaEnlaces = action.payload.datos;

    const response: any = yield appContext.servicioSincronizacion.guardarLista(
      datosLista,
      "Error",
      undefined,
      IdiomaEnum.ES
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response guardar lista saga", response);

    yield put(guardarListaCompleted(response.data));
    //yield put(push("/ListaAltaEditar"));
    /*
    if (!continuar){
      yield put(searchList({ nombre: "", enlaces: [] }));
    }*/
  } catch (error) {
    console.error(error);
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestGuardarListasCompleted(action: EnlaceAccion) {
  try {
    
    yield put(searchList({ nombre: "" }, 1, getLoggedUserData().idIdiomaSeleccionado));
    const lista: IListaEnlacesFiltrada = Object.assign(
      {
        nombre: "",
        usuarioLogueado: getLoggedUserData(),
      }
    ) as IListaEnlacesFiltrada;
    yield put(searchMyList(lista, 1, getLoggedUserData().idIdiomaSeleccionado));
     /*  yield put(push("/Listas")); */
    
  } catch (error) { }
}




export function* requestClonarLista(action: EnlaceAccion) {
  try {
    yield put(push("/ListaAltaEditar"));
  } catch (error) {

  }
}

export function* requestBuscarListasUsuariosPage(action: EnlaceAccion) {
  try {
    const datoLista = action.payload.datos;
    const page = action.payload.page || 1;
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.buscarListasUserPage(
      datoLista,
      page,
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(searchListUserPageCompleted(response.data));
    console.log("listas página usuarios", datoLista)
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarListasUsuariosPageCompleted(action: EnlaceAccion) {
  try {
    const datosListas = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response Buscar listas usuario completed", datosListas);
    yield put(push("/UsuarioAltaEditar"));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}