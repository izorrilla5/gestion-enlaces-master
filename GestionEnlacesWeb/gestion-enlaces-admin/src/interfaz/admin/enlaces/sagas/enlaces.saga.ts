import { takeLatest, takeEvery, put, cancelled } from "redux-saga/effects";
import { AccionesDatosEnlaces } from "../acciones/types/enlaces.action.types";
import { push, goBack } from "connected-react-router";
import { appContext } from "index";
import { IdiomaEnum } from "dominio/idioma-enum";
import { EnlaceAccion } from "dominio/enlaces/enlace.action";
//import { IEnlace } from 'dominio/enlace';

import {
  obtenerDatosEnlaceCompleted,
  actualizarDatosEnlaceSeleccionado,
  datosEliminados,
  searchCompleted,
  getUltimosEnlacesCompleted,
  getMasVotadosCompleted,
  search, eliminarEnlaceDeUsuario, getUltimosEnlaces, getMasVotados, getEnlacesPatrocinadosCompleted
} from "../acciones/creators/enlaces.action.creator";
import { IEnlace } from "dominio/enlace";
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';

export function* watchEnlaceDetailRequest() {
  yield takeLatest(
    AccionesDatosEnlaces.OBTENER_DATOS_ENLACE,
    requestDatosEnlace
  );
}

export function* watchEnlaceDetailRequestCompleted() {
  yield takeEvery(
    AccionesDatosEnlaces.OBTENER_DATOS_ENLACE_COMPLETED,
    requestDatosEnlaceCompleted
  );
}

export function* watchEliminarEnlace() {
  yield takeLatest(AccionesDatosEnlaces.DATOS_ELIMINAR, requestEliminarEnlace);
}

export function* watchEnlaceEliminado() {
  yield takeEvery(
    AccionesDatosEnlaces.DATOS_ELIMINADOS,
    requestEliminarEnlaceCompleted
  );
}

export function* watchCreateNuevoEnlaceRequest() {
  yield takeLatest(AccionesDatosEnlaces.CREAR_NUEVO_ENLACE, requestNuevoEnlace);
}

export function* watchMainPageRequest() {
  yield takeLatest(AccionesDatosEnlaces.MAIN_PAGE, requestMainPage);
}

export function* watchListasPageRequest() {
  yield takeLatest(AccionesDatosEnlaces.LISTAS_PAGE, requestListasPage);
}

export function* watchGuardarEnlace() {
  yield takeLatest(AccionesDatosEnlaces.GUARDAR_ENLACE, requestGuardarEnlace);
}

export function* watchBuscarEnlace() {
  yield takeLatest(AccionesDatosEnlaces.BUSCAR_ENLACES, requestBuscarEnlace);
}

export function* watchBuscarEnlaceCompleted() {
  yield takeEvery(
    AccionesDatosEnlaces.BUSCAR_ENLACES_COMPLETED,
    requestBuscarEnlacesCompleted
  );
}

export function* watchObtenerUltimosEnlaces() {
  yield takeLatest(
    AccionesDatosEnlaces.OBTENER_ULTIMOS_ENLACES,
    requestObtenerUltimosEnlaces
  );
}

export function* watchObtenerUltimosEnlacesCompleted() {
  yield takeEvery(
    AccionesDatosEnlaces.OBTENER_ULTIMOS_ENLACES_COMPLETED,
    requestObtenerUltimosEnlacesCompleted
  );
}

export function* watchObtenerMasVotados() {
  yield takeLatest(
    AccionesDatosEnlaces.OBTENER_MAS_VOTADOS,
    requestObtenerMasVotados
  );
}

export function* watchObtenerMasVotadosCompleted() {
  yield takeEvery(
    AccionesDatosEnlaces.OBTENER_MAS_VOTADOS_COMPLETED,
    requestObtenerMasVotadosCompleted
  );
}

export function* watchObtenerEnlacesPatrocinados() {
  yield takeLatest(
    AccionesDatosEnlaces.OBTENER_PATROCINADOS,
    requestObtenerEnlacesPatrocinados
  );
}

export function* watchObtenerEnlacesPatrocinadosCompleted() {
  yield takeEvery(
    AccionesDatosEnlaces.OBTENER_PATROCINADOS_COMPLETED,
    requestObtenerEnlacesPatrocinadosCompleted
  );
}

export function* goBackEnlaces() {
  yield takeEvery(AccionesDatosEnlaces.VOLVER_ATRAS, goBackRequest);
}

export function* watchPublicPageRequest() {
  yield takeLatest(AccionesDatosEnlaces.PUBLIC_PAGE, requestPublicPage);
}

export function* requestDatosEnlace(action: EnlaceAccion) {
  try {
    const datoEnlace: IEnlace = action.payload.datos;

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
    const response: any = yield appContext.servicioSincronizacion.obtenerEnlace(
      datoEnlace,
      "Error",
      undefined,
      IdiomaEnum.ES
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data

    yield put(obtenerDatosEnlaceCompleted(response.data));
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

export function* watchBuscarEnlacesUsuario() {
  yield takeLatest(AccionesDatosEnlaces.BUSCAR_ENLACES_USUARIO, requestBuscarEnlacesUsuario);
}

export function* watchBuscarEnlacesUsuarioCompleted() {
  yield takeEvery(
    AccionesDatosEnlaces.BUSCAR_ENLACES_USUARIO_COMPLETED,
    requestBuscarEnlacesUsuarioCompleted
  );
}

export function* requestDatosEnlaceCompleted(action: EnlaceAccion) {
  try {
    yield put(actualizarDatosEnlaceSeleccionado(action.payload.datos));
    yield put(push("/EnlacesAltaEditar"));
  } catch (error) {
    //TODO: gestionar ERROR
    //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
  }
}

export function* requestEliminarEnlace(action: EnlaceAccion) {
  try {
    const datoEnlace = action.payload.datos;
    yield appContext.servicioSincronizacion.eliminarEnlace(
      datoEnlace,
      "Error",
      undefined,
      IdiomaEnum.ES
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data

    if(action.payload.pantallaOrigen == 1) {
      yield put(search({ titulo: "", url: "", votos: [], tags: [] }, undefined, getLoggedUserData().idIdiomaSeleccionado));
    }
    
    yield put(datosEliminados(datoEnlace, action.payload.pantallaOrigen || 1));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestEliminarEnlaceCompleted(action: EnlaceAccion) {
  try {
    //TODO: revisar que hacer a la vuelta de eliminar enlace
    //yield put(actualizarDatosEnlaceSeleccionado());
    yield put(getUltimosEnlaces(getLoggedUserData().idIdiomaSeleccionado));
    yield put(getMasVotados(getLoggedUserData().idIdiomaSeleccionado));
    const origenEliminar = action.payload.pantallaOrigen || 1;
    if (origenEliminar === 1) {
      yield put(push("/Admin"));
    } else {

      yield put(eliminarEnlaceDeUsuario(action.payload.datos));
    }
  } catch (error) {
    //TODO: gestionar ERROR
    //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
  }
}

export function* requestNuevoEnlace(action: EnlaceAccion) {
  try {
    yield put(actualizarDatosEnlaceSeleccionado(action.payload.datos));
    yield put(push("/EnlacesAltaEditar"));
  } catch (error) {
    //TODO: gestionar ERROR
    //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
  }
}

export function* requestMainPage(action: EnlaceAccion) {
  try {
    const pantallaOrigen = action.payload.pantallaOrigen || 1;
    if (pantallaOrigen === 1) {
      yield put(push("/Admin"));
    } else {
      yield put(push("/UsuarioAltaEditar"));
    }
  } catch (error) { }
}

export function* requestListasPage(action: EnlaceAccion) {
  try {
    const pantallaOrigen = action.payload.pantallaOrigen || 1;
    if (pantallaOrigen === 1) {
      yield put(push("/Listas"));
    } else {
      yield put(push("/UsuarioAltaEditar"));
    }
  } catch (error) { }
}

export function* requestGuardarEnlace(action: EnlaceAccion) {
  try {
    const datoEnlace: IEnlace = action.payload.datos;
    /* if (datoEnlace.idUsuario){
			datoEnlace.usuario = {
				idUsuario: datoEnlace.idUsuario,
				nombre: '',
				apellidos: 'string;',
				email: 'string',
				password: 'string',
				rol: {
					idRol: 1,
					nombre: ''
				},
				activo: true
			};
		} */
    yield appContext.servicioSincronizacion.guardarEnlace(
      datoEnlace,
      "Error",
      undefined,
      IdiomaEnum.ES
    );

    yield put(getUltimosEnlaces(getLoggedUserData().idIdiomaSeleccionado));
    yield put(getMasVotados(getLoggedUserData().idIdiomaSeleccionado));
    yield put(search({ titulo: "", url: "", votos: [], tags: [], listas: [] }, undefined, getLoggedUserData().idIdiomaSeleccionado));
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

export function* requestBuscarEnlace(action: EnlaceAccion) {
  try {
    const datoEnlace = action.payload.datos;
    const page = action.payload.page || 1;
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.buscarEnlaces(
      datoEnlace,
      page,
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(searchCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarEnlacesCompleted(action: EnlaceAccion) {
  try {
    const datosEnlaces = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log(datosEnlaces);
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

export function* requestObtenerUltimosEnlaces(action: EnlaceAccion) {
  try {
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.obtenerUltimosEnlaces(
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(getUltimosEnlacesCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestObtenerUltimosEnlacesCompleted(action: EnlaceAccion) {
  try {
    //yield put(push("/Admin"));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestObtenerMasVotados(action: EnlaceAccion) {
  try {
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.obtenerMasVotados(
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(getMasVotadosCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestObtenerMasVotadosCompleted(action: EnlaceAccion) {
  try {
    const datosEnlaces = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response", datosEnlaces);
    //yield put(push("/Admin"));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestObtenerEnlacesPatrocinados(action: EnlaceAccion) {
  try {
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.obtenerEnlacesPatrocinados(
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(getEnlacesPatrocinadosCompleted(response.data));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestObtenerEnlacesPatrocinadosCompleted(action: EnlaceAccion) {
  try {
    const datosEnlaces = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log("response", datosEnlaces);
    //yield put(push("/Admin"));
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* goBackRequest() {
  try {
    yield put(goBack());
  } catch (error) { }
}

export function* requestBuscarEnlacesUsuario(action: EnlaceAccion) {
  try {
    const datoEnlace = action.payload.datos;
    const page = action.payload.page || 1;
    const idIdioma = action.payload.idIdiomaUsuario || 1;
    const response: any = yield appContext.servicioSincronizacion.buscarEnlaces(
      datoEnlace,
      page,
      "Error",
      undefined,
      idIdioma
    );
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    yield put(searchCompleted(response.data));
    console.log("enlaces página usuarios", datoEnlace)
  } catch (error) {
    //TODO: gestionar error
    //yield put({ type: 'LOGIN_ERROR', error })
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestBuscarEnlacesUsuarioCompleted(action: EnlaceAccion) {
  try {
    const datosEnlaces = action.payload.datos;
    //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
    console.log(datosEnlaces);
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

export function* requestPublicPage() {
  try {
      yield put(push("/AdminPublico"));
  } catch (error) { }
}
