import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import initialState from 'configuracion/store/initial-state';
import { AccionesDatosRoles } from '../acciones/types/roles.action.types';
import { IEstadoRol } from 'dominio/estado/estado-rol';


const rolesReducer: Reducer<IEstadoRol, Action<string>> = createReducer(initialState.datosRol, {
    [AccionesDatosRoles.ACTUALIZAR_DATOS_ROLES]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosRoles.OBTENER_ROLES_COMPLETADO]: (state: any, action: any) => {
        state.roles = action.payload.datos;
        return state;
    },
})



export { rolesReducer };