import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import { IEstadoCategorias } from 'dominio/estado/estado-categorias';
import initialState from 'configuracion/store/initial-state';
import { AccionesDatosCategorias } from '../acciones/types/categorias.action.types';

const categoriasReducer: Reducer<IEstadoCategorias, Action<string>> = createReducer(initialState.datosCategorias, {
    [AccionesDatosCategorias.ACTUALIZAR_DATOS_CATEGORIAS]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosCategorias.OBTENER_CATEGORIAS_COMPLETADO]: (state: any, action: any) => {
        state.categorias = action.payload.datos;
        return state;
    },
})



export { categoriasReducer };
