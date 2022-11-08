import { put, call } from 'redux-saga/effects';
import i18n from "i18next";
import { actualizarEstadoPromesa, actualizarEstadoPromesaCompleted } from 'interfaz/app/acciones/creators/estado-promesa.action.creator';
import { RestApiCallParams } from "dominio/rest/rest-api-callparams";
import { usuarioInactivo } from 'interfaz/admin/usuarios/acciones/creators/usuarios.action.creator';


type IFuncionLlamada = (restApiCallParams: RestApiCallParams<any>) => Promise<any>;

export function* llamadaServer(funcionLlamada: IFuncionLlamada, mensajeCorrecto: string | undefined, mensajeError: string | undefined, restApiCallParams: RestApiCallParams<any>): any {
    try {

        //TODO: manejar códigos de error: 401, 500, etc
        yield put(actualizarEstadoPromesa({ promesaFinalizada: false, finalizadoCorrecto: false }));
        const respuesta = yield call(funcionLlamada, restApiCallParams);
        if (respuesta.status === 200 || respuesta.status === 201) {
            yield put(actualizarEstadoPromesa({ promesaFinalizada: true, finalizadoCorrecto: true }));
            if (mensajeCorrecto) {
            }
            yield put(actualizarEstadoPromesaCompleted())
            return respuesta;
        }
        else if (respuesta.status === 401) {
            yield put(actualizarEstadoPromesa({ promesaFinalizada: true, finalizadoCorrecto: true }));
        }
        else if (respuesta.status === 460) { // Usuario inactivo
            yield put(actualizarEstadoPromesa({ promesaFinalizada: false, finalizadoCorrecto: false })); // TODO: Esta es la forma más rápida para que no salgan mensajes de error que no corresponden
            yield put(usuarioInactivo());
        }
        else {
            yield put(actualizarEstadoPromesa({ promesaFinalizada: true, finalizadoCorrecto: false }));
            if (mensajeError) {
                console.log(JSON.stringify(mensajeError));
                throw i18n.t("translation:saga.llamada_server_saga.error"), i18n.t("translation:saga.llamada_server_saga.ocurrido_error") + { mensajeError };//+ respuesta.data);
            }
        }

    } catch (error) {
        yield put(actualizarEstadoPromesa({ promesaFinalizada: true, finalizadoCorrecto: false }));
        if (mensajeError) {
            console.log(JSON.stringify(mensajeError));
            throw i18n.t("translation:saga.llamada_server_saga.error"), i18n.t("translation:saga.llamada_server_saga.ocurrido_error") + { mensajeError };
        }
    }
}
