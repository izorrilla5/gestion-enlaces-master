import { createAction } from '@reduxjs/toolkit';
import { IRol } from 'dominio/rol';
import { AccionesDatosRoles } from '../types/roles.action.types';

export const actualizarDatosRoles = createAction(AccionesDatosRoles.ACTUALIZAR_DATOS_ROLES, function prepare(roles: IRol[]) {
    return {
        payload: {
            datos: roles
        }
    }
})

export const obtenerRolesCompletado = createAction(AccionesDatosRoles.OBTENER_ROLES_COMPLETADO, function prepare(roles: IRol[]) {
    return {
        payload: {
            datos: roles
        }
    }
})