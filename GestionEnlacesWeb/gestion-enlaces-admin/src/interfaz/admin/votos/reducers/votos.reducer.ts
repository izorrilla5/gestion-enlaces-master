import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import initialState from 'configuracion/store/initial-state';
import { AccionesDatosVotos } from '../acciones/types/votos.action.types';
import { IEstadoTipos } from 'dominio/estado/estado-tipos';


const tiposReducer: Reducer<IEstadoTipos, Action<string>> = createReducer(initialState.datosTipos, {
    [AccionesDatosVotos.ACTUALIZAR_DATOS_VOTOS]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosVotos.OBTENER_VOTOS_COMPLETADO]: (state: any, action: any) => {
        state.tipos = action.payload.datos;
        return state;
    },
})



export { tiposReducer };