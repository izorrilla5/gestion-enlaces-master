import { takeLatest, takeEvery, put, cancelled } from 'redux-saga/effects'
import { actualizarDatosSeguridad } from '../acciones/creators/seguridad.action.creator';
import { loginCompleted } from '../acciones/creators/login-saga.action.creator';
import { AccionesDatosSeguridad } from '../acciones/types/seguridad.action.types';
import { AccionLogin } from '../../../dominio/seguridad/login.action';
import { push } from 'connected-react-router';
import { IDatosSeguridadResponse } from 'dominio/seguridad/datos-seguridad-response';
import { IDatosSeguridad } from 'dominio/estado/datos-seguridad';
import { appContext } from 'index';
import { IdiomaEnum } from 'dominio/idioma-enum';
import { obtenerCategoriasCompletado } from 'interfaz/admin/categorias/acciones/creators/categorias.action.creator';
import { obtenerTiposCompletado } from 'interfaz/admin/tipos/acciones/creators/tipos.action.creator';
import { obtenerTagsCompletado } from 'interfaz/admin/tags/acciones/creators/tags.action.creator';
import { obtenerMedicosCompletado } from 'interfaz/admin/medicos/acciones/creators/medicos.action.creator';
import { obtenerRolesCompletado } from 'interfaz/admin/roles/acciones/creators/roles.action.creators';
import { obtenerIdiomasCompletado } from 'interfaz/admin/idiomas/acciones/creators/idiomas.action.creators';
import { IUsuario } from 'dominio/usuario';
import { setToken, getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { setIdiomas, setMedicos, setCategorias, setTipos, setTags, setRoles } from 'infraestructura/auth/app-data-manager';

export function* watchLoginRequest() {
  yield takeLatest(AccionesDatosSeguridad.SAGA_LOGIN_REQUEST, requestLogin);
}

export function* watchLoginCompleted() {
  yield takeEvery(AccionesDatosSeguridad.SAGA_LOGIN_REQUEST_COMPLETED, requestLoginCompleted);
}

export function* watchRegisterRequest() {
  yield takeLatest(AccionesDatosSeguridad.SAGA_REGISTER_REQUEST, requestRegister);
}

export function* watchIdiomaCambiado() {
  yield takeLatest(AccionesDatosSeguridad.CAMBIAR_IDIOMA_USUARIO, requestIdiomaCambiado);
}

export function* watchUpdatePass() {
  yield takeLatest(AccionesDatosSeguridad.SAGA_UPDATE_PASS, requestUpdatePass);
}

export function* watchSendMail() {
  yield takeLatest(AccionesDatosSeguridad.SEND_MAIL, requestSendMail);
}

export function* watchSendMailContacto() {
  yield takeLatest(AccionesDatosSeguridad.SEND_MAIL_CONTACTO, requestSendMailContacto);
}

export function* watchLoginPageRequest() {
  yield takeLatest(AccionesDatosSeguridad.LOGIN_PAGE, requestLoginPage);
}

export function* watchRegisterPageRequest() {
  yield takeLatest(AccionesDatosSeguridad.REGISTER_PAGE, requestRegisterPage);
}

export function* requestLogin(action: AccionLogin) {
  console.log('action', action);
  try {
    const datosSeguridad: IDatosSeguridad = { usuario: action.payload.usuario, pwd: action.payload.pwd };
    const response: any = yield appContext.servicioSincronizacion.login(datosSeguridad, "Error", "Error personalizado", IdiomaEnum.ES);
    const datosSeguridadResponse: IDatosSeguridadResponse = response.data;

    yield put(loginCompleted({
      usuario: datosSeguridadResponse.access_token,
      pwd: ''
    }));
  } catch (error) {
    console.log(error);
    yield put({ type: 'LOGIN_ERROR', error })

    yield put(actualizarDatosSeguridad({ access_token: '', error: 'LOGIN_ERROR' }));
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestRegister(action: any) {
  console.log('La acción: ', action);
  console.log('El payload del registro: ', action.payload);

  try {
    const nuevoUser: IUsuario = {
      nombre: action.payload.usuario.nombre,
      apellidos: action.payload.usuario.apellidos,
      username: action.payload.usuario.username,
      email: action.payload.usuario.email,
      pwd: action.payload.usuario.pwd,
    };
    yield appContext.servicioSincronizacion.register(nuevoUser, "Error", undefined, IdiomaEnum.ES);

  } catch (error) {
    console.log("Error: ", error);
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }
}

export function* requestUpdatePass(action: any) {
  console.log('action', action);
  try {

    let usuarioUpdate = action.payload.usuarioUpdate;
    usuarioUpdate.id = usuarioUpdate.sub;

    const response: any = yield appContext.servicioSincronizacion.actualizarPass(
      action.payload.usuarioUpdate,
      "Error",
      undefined,
      IdiomaEnum.ES
    );

    const datosSeguridadResponse: IDatosSeguridadResponse = response.data;

    yield put(loginCompleted({
      usuario: datosSeguridadResponse.access_token,
      pwd: ''
    }));

  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error })

    yield put(actualizarDatosSeguridad({ access_token: '', error: 'LOGIN_ERROR' }));
  } finally {
    if (yield cancelled()) {
      // ... put special cancellation handling code here
    }
  }

}



export function* requestLoginCompleted(action: AccionLogin) {
  try {
    setToken(action.payload.usuario);
    yield put(actualizarDatosSeguridad({ access_token: action.payload.usuario, error: '' }));

    const responseIdiomas: any = yield appContext.servicioSincronizacion.obtenerIdiomas("Error", undefined, IdiomaEnum.ES);
    setIdiomas(responseIdiomas.data);
    yield put(obtenerIdiomasCompletado(
      responseIdiomas.data
    ));

    const responseMedicos: any = yield appContext.servicioSincronizacion.obtenerMedicos("Error", undefined, IdiomaEnum.ES);
    setMedicos(responseMedicos.data);
    yield put(obtenerMedicosCompletado(
      responseMedicos.data
    ));

    const responseCategorias: any = yield appContext.servicioSincronizacion.obtenerCategorias("Error", undefined, getLoggedUserData().idIdiomaSeleccionado);
    setCategorias(responseCategorias.data);
    yield put(obtenerCategoriasCompletado(
      responseCategorias.data
    ));

    const responseTipos: any = yield appContext.servicioSincronizacion.obtenerTipos("Error", undefined, getLoggedUserData().idIdiomaSeleccionado);
    setTipos(responseTipos.data);
    yield put(obtenerTiposCompletado(
      responseTipos.data
    ));

    const responseTags: any = yield appContext.servicioSincronizacion.obtenerTags("Error", undefined, getLoggedUserData().idIdiomaSeleccionado);
    setTags(responseTags.data);
    yield put(obtenerTagsCompletado(
      responseTags.data
    ));

    const responseRoles: any = yield appContext.servicioSincronizacion.obtenerRoles("Error", undefined, getLoggedUserData().idIdiomaSeleccionado);
    setRoles(responseRoles.data);
    yield put(obtenerRolesCompletado(
      responseRoles.data
    ));

    if (!getLoggedUserData().necesitaCambiarContrasena) {
      if (getLoggedUserData().rol.id === 1) {
        yield put(push("/AdminPublico"));
      } else {
        yield put(push("/Admin"));
      }
    }
  } catch (error) {
    yield put(actualizarDatosSeguridad({ access_token: '', error: error }));
  }
}


export function* requestIdiomaCambiado(action: any) {
  try {
    const datoUsuario: IUsuario = action.payload.datos.usuario;

    yield appContext.servicioSincronizacion.guardarUsuario(
      datoUsuario,
      "Error",
      undefined,
      IdiomaEnum.ES
    );

    const response: any = yield appContext.servicioSincronizacion.refrescarToken();
    console.log(response);

    const responseCategorias: any = yield appContext.servicioSincronizacion.obtenerCategorias("Error", undefined, datoUsuario.idIdiomaSeleccionado!);
    console.log(responseCategorias);
    setCategorias(responseCategorias.data);
    yield put(obtenerCategoriasCompletado(
      responseCategorias.data
    ));

    const responseTipos: any = yield appContext.servicioSincronizacion.obtenerTipos("Error", undefined, datoUsuario.idIdiomaSeleccionado!);
    setTipos(responseTipos.data);
    yield put(obtenerTiposCompletado(
      responseTipos.data
    ));

    const responseTags: any = yield appContext.servicioSincronizacion.obtenerTags("Error", undefined, datoUsuario.idIdiomaSeleccionado!);
    setTags(responseTags.data);
    yield put(obtenerTagsCompletado(
      responseTags.data
    ));

    const responseRoles: any = yield appContext.servicioSincronizacion.obtenerRoles("Error", undefined, datoUsuario.idIdiomaSeleccionado!);
    setRoles(responseRoles.data);
    yield put(obtenerRolesCompletado(
      responseRoles.data
    ));

    //HACK: para refrescar idioma al vuelo
    yield put(push("/"));
    if (getLoggedUserData().rol.id === 1) {
      yield put(push("/AdminPublico"));
    } else {
      yield put(push("/Admin"));
    }

  } catch (error) {
    console.log('error', error);
  }
}

export function* requestSendMail(action: any) {
  console.log('action', action);
  try {
    let usuario = action.payload.usuario;
    console.log("Login saga", usuario);
    yield appContext.servicioSincronizacion.enviarEmail(
      usuario,
      "Error",
      undefined,
      IdiomaEnum.ES
    );

  } catch (error) {
    yield put({ type: 'SEND_EMAIL_ERROR', error })
  } finally {
    if (yield cancelled()) {
    }
  }
}

export function* requestSendMailContacto(action: any) {
  console.log('action', action);
  try {
    let emailContacto = action.payload.emailContacto;
    yield appContext.servicioSincronizacion.enviarEmailContacto(
      emailContacto,
      "Error",
      undefined,
      IdiomaEnum.ES
    );

  } catch (error) {
    yield put({ type: 'SEND_EMAIL_ERROR', error })
  } finally {
    if (yield cancelled()) {
    }
  }
}

export function* requestLoginPage() {
  try {
    yield put(push("/Login"));
  } catch (error) { }
}

export function* requestRegisterPage() {
  try {
    yield put(push("/Login?registerDialog=true"));
  } catch (error) { }
}