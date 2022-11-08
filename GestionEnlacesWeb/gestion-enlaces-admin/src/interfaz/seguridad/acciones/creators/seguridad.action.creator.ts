import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosSeguridad } from '../types/seguridad.action.types';
import { IDatosSeguridadResponse } from 'dominio/seguridad/datos-seguridad-response';
import { IUsuario } from 'dominio/usuario';

export const actualizarDatosSeguridad = createAction(AccionesDatosSeguridad.ACTUALIZAR_DATOS_SEGURIDAD, function prepare(datos: IDatosSeguridadResponse) {
    return {
        payload: {
            datos: datos
        }
    }
})

export const cambiarIdIdiomaUsuario = createAction(AccionesDatosSeguridad.CAMBIAR_IDIOMA_USUARIO, function prepare(accessToken: string, usuario: IUsuario) {
    return {
        payload: {
            datos: {accessToken, usuario},
        },
    };
});
