import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosTags } from '../types/tags.action.types';
import { ITag } from 'dominio/tag';



export const actualizarDatosTags = createAction(AccionesDatosTags.ACTUALIZAR_DATOS_TAGS, function prepare(tags: ITag[]) {
    return {
        payload: {
            datos: tags
        }
    }
})

export const obtenerTagsCompletado = createAction(AccionesDatosTags.OBTENER_TAGS_COMPLETADO, function prepare(tags: ITag[]) {
    return {
        payload: {
            datos: tags
        }
    }
})

