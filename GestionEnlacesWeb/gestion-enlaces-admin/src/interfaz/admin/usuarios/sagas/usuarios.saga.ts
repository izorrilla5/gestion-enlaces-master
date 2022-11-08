import { push } from 'connected-react-router';
import { EnlaceAccion } from 'dominio/enlaces/enlace.action';
import { IdiomaEnum } from 'dominio/idioma-enum';
import { IUsuario } from 'dominio/usuario';
import { appContext } from 'index';
import { cancelled, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { actualizarDatosUsuarioSeleccionado, obtenerDatosUsuarioCompleted, searchUser, searchUserCompleted, usuarioEliminado } from '../acciones/creators/usuarios.action.creator';
import { AccionesDatosUsuario } from '../acciones/types/usuarios.action.types';


export function* watchBuscarUsuario() {
    yield takeLatest(
        AccionesDatosUsuario.BUSCAR_USUARIO, requestBuscarUsuario
    );
}

export function* watchBuscarUsuarioCompleted() {
    yield takeEvery(
        AccionesDatosUsuario.BUSCAR_USUARIO_COMPLETED, requestBuscarUsuarioCompleted
    );
}

export function* watchUsuariosPageRequest() {
    yield takeLatest(AccionesDatosUsuario.NAVEGAR_A_USUARIOS, requestUsuariosPage);
}

export function* watchNuevoUsuarioRequest() {
    yield takeLatest(AccionesDatosUsuario.CREAR_NUEVO_USUARIO, requestNuevoUsuario);
}

export function* watchGuardarUsuario() {
    yield takeLatest(AccionesDatosUsuario.GUARDAR_USUARIO, requestGuardarUsuario);
}

export function* watchUsuarioDetailRequest() {
    yield takeLatest(AccionesDatosUsuario.OBTENER_DATOS_USUARIO, requestDatosUsuario);
}

export function* watchUsuarioDetailRequestCompleted() {
    yield takeLatest(AccionesDatosUsuario.OBTENER_DATOS_USUARIO_COMPLETED, requestDatosUsuarioCompleted);
}

export function* watchEliminarUsuario() {
    yield takeLatest(AccionesDatosUsuario.USUARIO_ELIMINAR, requestEliminarUsuario);
}

export function* watchUsuarioEliminado() {
    yield takeEvery(AccionesDatosUsuario.USUARIO_ELIMINADO, requestEliminarUsuarioCompleted
    );
}

export function* watchAboutPageRequest() {
    yield takeLatest(AccionesDatosUsuario.ABOUT_PAGE, requestAboutPage);
}


export function* watchCookiesPageRequest() {
    yield takeLatest(AccionesDatosUsuario.COOKIES_PAGE, requestCookiesPage);
}

export function* watchLegalPageRequest() {
    yield takeLatest(AccionesDatosUsuario.LEGAL_PAGE, requestLegalPage);
}

export function* watchContactoPageRequest() {
    yield takeLatest(AccionesDatosUsuario.CONTACTO_PAGE, requestContactoPage);
}

export function* requestBuscarUsuario(action: EnlaceAccion) {
    try {
        const datosUsuarios = action.payload;
        //const rolesBusqueda = action.payload.datos.rolesBusqueda;
        const page = action.payload.page || 1;
        const response: any = yield appContext.servicioSincronizacion.buscarUsuario(
            datosUsuarios,
            page,
            "Error",
            undefined,
            IdiomaEnum.ES
        );
        //const datosSeguridadResponse: IDatosSeguridadResponse = response.data

        yield put(searchUserCompleted(response.data));
    } catch (error) {
        console.log('errorrrr!', error);
        //TODO: gestionar error
        //yield put({ type: 'LOGIN_ERROR', error })
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

export function* requestBuscarUsuarioCompleted(action: EnlaceAccion) {
    try {
        const datosUsuarios = action.payload.datos;
        //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
        console.log("buscar usuarios completed", datosUsuarios);
        //yield put(push("/Usuarios"));
    } catch (error) {

        console.log('errorrrr2!', error);
        //TODO: gestionar error
        //yield put({ type: 'LOGIN_ERROR', error })
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

export function* requestUsuariosPage() {
    try {
        yield put(push("/Usuarios"));
    } catch (error) { }
}

export function* requestNuevoUsuario(action: EnlaceAccion) {
    try {
        yield put(actualizarDatosUsuarioSeleccionado(action.payload.datos))
        yield put(push("/UsuarioAltaEditar"));
    } catch (error) { }
}

export function* requestGuardarUsuario(action: any) {
    try {
        const datoUsuario: IUsuario = action.payload.datos;

        const response: any = yield appContext.servicioSincronizacion.guardarUsuario(
            datoUsuario,
            "Error",
            undefined,
            IdiomaEnum.ES
        );
        console.log("guardar usuario", response);
        //const datosSeguridadResponse: IDatosSeguridadResponse = response.data

        yield put(searchUser({ nombre: "", apellidos: "", email: "", pwd: "", rol: undefined, enlaces: [], listas: [], idIdiomaSeleccionado: undefined }, 1, action.payload.roles));
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

export function* requestDatosUsuario(action: EnlaceAccion) {
    try {
        const datoUsuario: IUsuario = action.payload.datos;
        const navegacionPerfil = action.payload.navegacionPerfil || false;

        const response: any = yield appContext.servicioSincronizacion.obtenerUsuario(
            datoUsuario,
            "Error",
            undefined,
            IdiomaEnum.ES
        );
        //const datosSeguridadResponse: IDatosSeguridadResponse = response.data

        yield put(obtenerDatosUsuarioCompleted(response.data, navegacionPerfil));
    } catch (error) {
        //TODO: gestionar error
        //yield put({ type: 'LOGIN_ERROR', error })
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

export function* requestDatosUsuarioCompleted(action: EnlaceAccion) {
    try {
        yield put(actualizarDatosUsuarioSeleccionado(action.payload.datos));
        yield put(push("/UsuarioAltaEditar"));
    } catch (error) {
        //TODO: gestionar ERROR
        //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
    }
}

export function* requestEliminarUsuario(action: any) {
    try {
        const datoLista = action.payload.datos;
        const response: any = yield appContext.servicioSincronizacion.eliminarUsuario(
            datoLista,
            "Error",
            undefined,
            IdiomaEnum.ES
        );
        //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
 
        yield put(searchUser({ nombre: "", apellidos: "", email: "", pwd: "", rol: undefined, enlaces: [], listas: [], idIdiomaSeleccionado: undefined }, 1, action.payload.roles));
        
        yield put(usuarioEliminado(response.data));
    } catch (error) {
        //TODO: gestionar error
        //yield put({ type: 'LOGIN_ERROR', error })
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}

export function* requestEliminarUsuarioCompleted(action: EnlaceAccion) {
    try {
        //TODO: revisar que hacer a la vuelta de eliminar enlace
        //yield put(actualizarDatosEnlaceSeleccionado());
       yield put(push("/Usuarios"));
    } catch (error) {
        //TODO: gestionar ERROR
        //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
    }
}

export function* requestAboutPage() {
    try {
        yield put(push("/AcercaDe"));
    } catch (error) { }
}


export function* requestCookiesPage() {
    try {
        yield put(push("/PoliticaCookies"));
    } catch (error) { }
}

export function* requestLegalPage() {
    try {
        yield put(push("/AvisoLegal"));
    } catch (error) { }
}

export function* requestContactoPage() {
    try {
        yield put(push("/Contacto"));
    } catch (error) { }
}



