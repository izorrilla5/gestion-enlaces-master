import { IEstadoPromesa } from 'dominio/estado/promesa/estado-promesa';
import { AccionesEstadoPromesa } from '../types/estado-promesa.action.type';
import { createAction } from '@reduxjs/toolkit';

export const actualizarEstadoPromesa = createAction(AccionesEstadoPromesa.ACTUALIZAR_ESTADO_PROMESA, function prepare(estadoPromesa: IEstadoPromesa) {
  return {
    payload: {
      estadoPromesa
    }
  }
})

export const actualizarEstadoPromesaCompleted = createAction(AccionesEstadoPromesa.ACTUALIZAR_ESTADO_PROMESA_COMPLETED)
