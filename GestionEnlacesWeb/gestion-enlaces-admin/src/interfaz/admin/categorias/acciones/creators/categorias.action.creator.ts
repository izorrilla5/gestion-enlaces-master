import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosCategorias } from '../types/categorias.action.types';
import { ICategoria } from 'dominio/categoria';

export const actualizarDatosCategorias = createAction(AccionesDatosCategorias.ACTUALIZAR_DATOS_CATEGORIAS, function prepare(categorias: ICategoria[]) {
    return {
        payload: {
            datos: categorias
        }
    }
})

export const obtenerCategoriasCompletado = createAction(AccionesDatosCategorias.OBTENER_CATEGORIAS_COMPLETADO, function prepare(categorias: ICategoria[]) {
    return {
        payload: {
            datos: categorias
        }
    }
})
