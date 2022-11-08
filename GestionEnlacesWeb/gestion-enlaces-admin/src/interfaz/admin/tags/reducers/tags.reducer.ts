import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import { AccionesDatosTags } from '../acciones/types/tags.action.types';
import { IEstadoTags } from '../../../../dominio/estado/estado-tags';
import initialState from '../../../../configuracion/store/initial-state';




const tagsReducer: Reducer<IEstadoTags, Action<string>> = createReducer(initialState.datosTags, {
    [AccionesDatosTags.ACTUALIZAR_DATOS_TAGS]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosTags.OBTENER_TAGS_COMPLETADO]: (state: any, action: any) => {
        state.tags = action.payload.datos;
        return state;
    },
})



export { tagsReducer };
