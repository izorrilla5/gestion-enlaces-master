import { createAction } from '@reduxjs/toolkit';
import { IIdioma } from 'dominio/idioma';
import { AccionesDatosIdiomas } from '../types/idiomas.action.types';

export const actualizarDatosIdiomas = createAction(AccionesDatosIdiomas.ACTUALIZAR_DATOS_IDIOMAS, function prepare(idiomas: IIdioma[]) {
    return {
        payload: {
            datos: idiomas
        }
    }
})

export const obtenerIdiomasCompletado = createAction(AccionesDatosIdiomas.OBTENER_IDIOMAS_COMPLETADO, function prepare(idiomas: IIdioma[]) {
    console.log('obtener idiomas completado', idiomas);
    return {
        payload: {
            datos: idiomas
        }
    }
})