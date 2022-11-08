import { Reducer } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import { AccionesDatosSeguridad } from '../acciones/types/seguridad.action.types';
import initialState from 'configuracion/store/initial-state';
import { IDatosSeguridadResponse } from 'dominio/seguridad/datos-seguridad-response';

const seguridadReducer: Reducer<IDatosSeguridadResponse> = createReducer(initialState.datosSeguridad, {
    [AccionesDatosSeguridad.ACTUALIZAR_DATOS_SEGURIDAD]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },
    [AccionesDatosSeguridad.CAMBIAR_IDIOMA_USUARIO]: (state: any, action: any) => {
        //state.usuarioLogueado.idIdiomaSeleccionado = action.payload.datos.usuario.idIdiomaSeleccionado;
        return state;
    }
})


export { seguridadReducer };
