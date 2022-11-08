import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosTipos } from '../types/tipos.action.types';
import { ITipoEnlace } from 'dominio/tipo-enlace';

export const actualizarDatosTipos = createAction(AccionesDatosTipos.ACTUALIZAR_DATOS_TIPOS, function prepare(tipos: ITipoEnlace[]) {
    return {
        payload: {
            datos: tipos
        }
    }
})

export const obtenerTiposCompletado = createAction(AccionesDatosTipos.OBTENER_TIPOS_COMPLETADO, function prepare(tipos: ITipoEnlace[]) {
    return {
        payload: {
            datos: tipos
        }
    }
})

