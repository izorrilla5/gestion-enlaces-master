import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosMedicos } from '../types/medicos.action.types';
import { IMedico } from 'dominio/medico';



export const actualizarDatosMedicos = createAction(AccionesDatosMedicos.ACTUALIZAR_DATOS_MEDICOS, function prepare(medicos: IMedico[]) {
    return {
        payload: {
            datos: medicos
        }
    }
})

export const obtenerMedicosCompletado = createAction(AccionesDatosMedicos.OBTENER_MEDICOS_COMPLETADO, function prepare(medicos: IMedico[]) {
    return {
        payload: {
            datos: medicos
        }
    }
})


