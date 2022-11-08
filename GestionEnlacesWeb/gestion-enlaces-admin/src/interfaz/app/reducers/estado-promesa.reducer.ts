import { Reducer } from 'redux';
import initialState from 'configuracion/store/initial-state';
import { IEstadoPromesa } from 'dominio/estado/promesa/estado-promesa';
import { AccionesEstadoPromesa } from '../acciones/types/estado-promesa.action.type';
import { createReducer } from '@reduxjs/toolkit';

const estadoPromesaReducer: Reducer<IEstadoPromesa> = createReducer(initialState.datosEstadoPromesa, {
    [AccionesEstadoPromesa.ACTUALIZAR_ESTADO_PROMESA]: (state, action) => {
        return { ...state, promesaFinalizada: action.payload.estadoPromesa.promesaFinalizada, finalizadoCorrecto: action.payload.estadoPromesa.finalizadoCorrecto }
    },
    [AccionesEstadoPromesa.ACTUALIZAR_ESTADO_PROMESA_COMPLETED]: (state, action) => {
        return state
    },
})

export { estadoPromesaReducer };
