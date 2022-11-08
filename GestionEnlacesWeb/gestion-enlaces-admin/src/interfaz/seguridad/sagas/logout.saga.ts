import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import { actualizarDatosSeguridad } from '../acciones/creators/seguridad.action.creator';
import { AccionesDatosSeguridad } from '../acciones/types/seguridad.action.types';
import { AccionLogin } from 'dominio/seguridad/login.action';
import { push } from 'connected-react-router';
import { logoutRequestCompleted } from '../acciones/creators/logout-saga.action.creator';
import { removeToken } from 'infraestructura/auth/auth-manager';
import { limpiarBusquedaEnlace } from 'interfaz/admin/enlaces/acciones/creators/enlaces.action.creator';
import { limpiarBusquedaListas } from 'interfaz/admin/listas/acciones/creators/listas.action.creator';

export function* watchLogoutRequest() {
  yield takeLatest(AccionesDatosSeguridad.SAGA_LOGOUT_REQUEST, requestLogout);
}

export function* watchLogoutCompleted() {
  yield takeEvery(AccionesDatosSeguridad.SAGA_LOGOUT_REQUEST_COMPLETED, requestLogoutCompleted);
}

export function* requestLogout(action: AccionLogin) {
  yield put(logoutRequestCompleted());
}

export function* requestLogoutCompleted(action: AccionLogin) {
  try {
    removeToken();
    yield put(limpiarBusquedaEnlace());
    yield put(limpiarBusquedaListas());
    yield put(actualizarDatosSeguridad({ access_token: '',  error : '' }));
    yield put(push("/"));
  } catch (error) {
    yield put(actualizarDatosSeguridad({ access_token: '', error : error }));
  }
}

