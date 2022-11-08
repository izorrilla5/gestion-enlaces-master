import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import initialState from 'configuracion/store/initial-state';
import { AccionesDatosMedicos} from '../acciones/types/medicos.action.types';
import { IEstadoMedicos } from 'dominio/estado/estado-medicos';

const medicosReducer: Reducer<IEstadoMedicos, Action<string>> = createReducer(initialState.datosMedicos, {
    [AccionesDatosMedicos.ACTUALIZAR_DATOS_MEDICOS]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosMedicos.OBTENER_MEDICOS_COMPLETADO]: (state: any, action: any) => {
        state.medicos = action.payload.datos;
        return state;
    },
})



export { medicosReducer };