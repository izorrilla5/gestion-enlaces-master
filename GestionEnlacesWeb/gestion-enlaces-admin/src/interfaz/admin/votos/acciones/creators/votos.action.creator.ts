import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosVotos } from '../types/votos.action.types';
import { IVoto } from 'dominio/voto';



export const actualizarDatosVotos = createAction(AccionesDatosVotos.ACTUALIZAR_DATOS_VOTOS, function prepare(voto: IVoto) {
    return {
        payload: {
            datos: voto
        }
    }
})

export const obtenerVotosCompletado = createAction(AccionesDatosVotos.OBTENER_VOTOS_COMPLETADO, function prepare(voto: IVoto) {
    return {
        payload: {
            datos: voto
        }
    }
})
