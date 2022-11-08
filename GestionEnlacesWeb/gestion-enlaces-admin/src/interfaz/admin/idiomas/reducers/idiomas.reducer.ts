import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import initialState from 'configuracion/store/initial-state';
import { AccionesDatosIdiomas } from '../acciones/types/idiomas.action.types';
import { IEstadoIdiomas } from 'dominio/estado/estado-idiomas';


const idiomasReducer: Reducer<IEstadoIdiomas, Action<string>> = createReducer(initialState.datosIdiomas, {
    [AccionesDatosIdiomas.ACTUALIZAR_DATOS_IDIOMAS]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosIdiomas.OBTENER_IDIOMAS_COMPLETADO]: (state: any, action: any) => {
        state.idiomas = action.payload.datos;
        return state;
    },
})



export { idiomasReducer };