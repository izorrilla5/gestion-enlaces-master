import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import { AccionesDatosUsuario } from '../acciones/types/usuarios.action.types';
import { IEstadoUsuarios } from 'dominio/estado/usuarios-state';
import initialState from 'configuracion/store/initial-state';

const usuariosReducer: Reducer<IEstadoUsuarios, Action<string>> = createReducer(initialState.datosUsuarios, {
    [AccionesDatosUsuario.ACTUALIZAR_DATOS_USUARIOS]: (state: any, action: any) => {
        return { ...state, ...action.payload.datos };
    },

    [AccionesDatosUsuario.BUSCAR_USUARIO]: (state: any, action: any) => {
        state.usuarioBusqueda = action.payload.datos;
        state.rolesBusqueda = action.payload.rolesBusqueda;
        return state;
    },

    [AccionesDatosUsuario.BUSCAR_USUARIO_COMPLETED]: (
        state: any,
        action: any
    ) => {
        state.usuarios = action.payload.datos;
        state.currentPageUsuarios = action.payload.page;
        state.totalPageCountUsuarios = action.payload.pageCount;
        return state;
    },

    [AccionesDatosUsuario.NAVEGAR_A_USUARIOS]: (state: any, action: any) => {
        return state;
    },

    [AccionesDatosUsuario.CREAR_NUEVO_USUARIO]: (state: any, action: any) => {
        state.usuarioSeleccionado = undefined;
        return state;
    },

    [AccionesDatosUsuario.GUARDAR_USUARIO]: (state: any, action: any) => {
        state.usuarioSeleccionado = action.payload.datos;
        return state;
    },

    [AccionesDatosUsuario.OBTENER_DATOS_USUARIO]: (state: any, action: any) => {
        //TODO: ver que hacer con lo que viene en datos...
        state.usuarioSeleccionado = action.payload.datos;
        state.navegacionPerfil = action.payload.navegacionPerfil;
        return state;
    },

    [AccionesDatosUsuario.ACTUALIZAR_DATOS_USUARIO_SELECCIONADO]: (state: any, action: any) => {
        //TODO: ver que hacer con lo que viene en datos...
        state.usuarioSeleccionado = action.payload.datos;
        return state;
    },

    [AccionesDatosUsuario.ABOUT_PAGE]: (state: any, action: any) => {
        return state;
    },

    [AccionesDatosUsuario.COOKIES_PAGE]: (state: any, action: any) => {
        return state;
    },
    [AccionesDatosUsuario.LEGAL_PAGE]: (state: any, action: any) => {
        return state;
    },
    [AccionesDatosUsuario.CONTACTO_PAGE]: (state: any, action: any) => {
        return state;
    },
    [AccionesDatosUsuario.USUARIO_INACTIVO]: (state: any, action: any) => {
        state.usuarioInactivo = true;
        return state;
    },
    [AccionesDatosUsuario.USUARIO_INACTIVO_RESET]: (state: any, action: any) => {
        state.usuarioInactivo = false;
        return state;
    },
})


export { usuariosReducer };
