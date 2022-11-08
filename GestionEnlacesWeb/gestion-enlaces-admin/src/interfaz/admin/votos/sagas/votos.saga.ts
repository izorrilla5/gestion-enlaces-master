import { takeLatest, takeEvery, put, cancelled } from 'redux-saga/effects'
import { AccionesDatosVotos } from '../acciones/types/votos.action.types';
import { IVoto } from 'dominio/voto';
import { appContext } from 'index';
import { VotoAccion } from 'dominio/votos/voto.action';
import { IdiomaEnum } from 'dominio/idioma-enum';
import { obtenerVotosCompletado } from '../acciones/creators/votos.action.creator';
import { getMasVotados, getUltimosEnlaces, search } from '../../enlaces/acciones/creators/enlaces.action.creator';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';


export function* watchVotoDetailRequest() {
    yield takeLatest(AccionesDatosVotos.ACTUALIZAR_DATOS_VOTOS, requestDatosVoto);
}

export function* watchVotolRequestCompleted() {
    yield takeEvery(AccionesDatosVotos.OBTENER_VOTOS_COMPLETADO, requestDatosVotoCompleted);
}


export function* requestDatosVoto(action: VotoAccion) {
    console.log('action', action);
    try {
        const datoVoto: IVoto = action.payload.datos;

        const response: any = yield appContext.servicioSincronizacion.guardarRating(datoVoto, "Error", undefined, IdiomaEnum.ES);
        //const datosSeguridadResponse: IDatosSeguridadResponse = response.data
        console.log('response', response);

        yield put(obtenerVotosCompletado(
            response.data
        ));
    } catch (error) {
        //TODO: gestionar error
        //yield put({ type: 'LOGIN_ERROR', error })
    } finally {
        if (yield cancelled()) {
            // ... put special cancellation handling code here
        }
    }
}


export function* requestDatosVotoCompleted(action: VotoAccion) {
    console.log('action', action);
    try {

        yield put(getUltimosEnlaces(getLoggedUserData().idIdiomaSeleccionado));
        yield put(getMasVotados(getLoggedUserData().idIdiomaSeleccionado));
        
		yield put(search({ titulo: '', url: '', votos: [] }, 1, getLoggedUserData().idIdiomaSeleccionado));
        //yield put(push("/AdminPublico"));

    } catch (error) {
        //TODO: gestionar ERROR
        //yield put(actualizarDatosSeguridad({ usuario: '', pwd: '' }));
    }
}



