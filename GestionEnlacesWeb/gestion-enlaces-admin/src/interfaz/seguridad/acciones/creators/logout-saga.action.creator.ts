
import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosSeguridad } from '../types/seguridad.action.types';

export const logoutRequest = createAction(AccionesDatosSeguridad.SAGA_LOGOUT_REQUEST)

export const logoutRequestCompleted = createAction(AccionesDatosSeguridad.SAGA_LOGOUT_REQUEST_COMPLETED)
