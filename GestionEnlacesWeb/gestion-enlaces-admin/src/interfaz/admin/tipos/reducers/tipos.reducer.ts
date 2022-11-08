import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import initialState from 'configuracion/store/initial-state';
import { AccionesDatosTipos } from '../acciones/types/tipos.action.types';
import { IEstadoTipos } from 'dominio/estado/estado-tipos';


const tiposReducer: Reducer<IEstadoTipos, Action<string>> = createReducer(initialState.datosTipos, {
    [AccionesDatosTipos.ACTUALIZAR_DATOS_TIPOS]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosTipos.OBTENER_TIPOS_COMPLETADO]: (state: any, action: any) => {
        state.tipos = action.payload.datos;
        return state;
    },
})



export { tiposReducer };
