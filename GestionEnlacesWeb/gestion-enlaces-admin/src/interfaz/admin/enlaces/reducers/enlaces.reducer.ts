import { Reducer } from 'react';
import { createReducer, Action } from '@reduxjs/toolkit';
import { AccionesDatosEnlaces } from '../acciones/types/enlaces.action.types';
import { IEstadoEnlaces } from 'dominio/estado/estado-enlaces';
import initialState from 'configuracion/store/initial-state';

const enlacesReducer: Reducer<IEstadoEnlaces, Action<string>> = createReducer(initialState.datosEnlaces, {
    [AccionesDatosEnlaces.ACTUALIZAR_DATOS_ENLACES]: (state: any, action: any) => {
        return { ...state.enlaces, ...action.payload.datos };
    },
    [AccionesDatosEnlaces.OBTENER_DATOS_ENLACE]: (state: any, action: any) => {
        //TODO: ver que hacer con lo que viene en datos...
        state.enlaceSeleccionado = action.payload.datos;
        state.navegacion = action.payload.pantallaOrigen;
        return state;
    },
    [AccionesDatosEnlaces.ACTUALIZAR_DATOS_ENLACE_SELECCIONADO]: (state: any, action: any) => {
        //TODO: ver que hacer con lo que viene en datos...
        state.enlaceSeleccionado = action.payload.datos;
        return state;
    },
    [AccionesDatosEnlaces.CREAR_NUEVO_ENLACE]: (state: any, action: any) => {
        //TODO: ver que hacer con lo que viene en datos...
        state.navegacion = action.payload.pantallaOrigen;
        state.enlaceSeleccionado = undefined;
        return state;
    },
    [AccionesDatosEnlaces.MAIN_PAGE]: (state: any, action: any) => {
        return state;
    },

    [AccionesDatosEnlaces.LISTAS_PAGE]: (state: any, action: any) => {
        return state;
    },

    [AccionesDatosEnlaces.GUARDAR_ENLACE]: (state: any, action: any) => {
        state.enlaceSeleccionado = action.payload.datos;
        return state;
    },

    [AccionesDatosEnlaces.BUSCAR_ENLACES]: (state: any, action: any) => {
        state.enlaceBusqueda = action.payload.datos;
        return state;
    },
    [AccionesDatosEnlaces.BUSCAR_ENLACES_COMPLETED]: (state: any, action: any) => {
        state.enlaces = action.payload.datos;
        state.currentPage = action.payload.page;
        state.totalPageCount = action.payload.pageCount;
        return state;
    },
    [AccionesDatosEnlaces.OBTENER_ULTIMOS_ENLACES]: (state: any, action: any) => {
        return state;
    },
    [AccionesDatosEnlaces.OBTENER_ULTIMOS_ENLACES_COMPLETED]: (state: any, action: any) => {
        state.ultimosEnlaces = action.payload.datos;
        return state;
    },
    [AccionesDatosEnlaces.OBTENER_MAS_VOTADOS]: (state: any, action: any) => {
        return state;
    },
    [AccionesDatosEnlaces.OBTENER_MAS_VOTADOS_COMPLETED]: (state: any, action: any) => {
        state.masVotadosEnlaces = action.payload.datos;
        return state;
    },
    [AccionesDatosEnlaces.OBTENER_PATROCINADOS]: (state: any, action: any) => {
        return state;
    },
    [AccionesDatosEnlaces.OBTENER_PATROCINADOS_COMPLETED]: (state: any, action: any) => {
        state.enlacesPatrocinados = action.payload.datos;
        return state;
    },
    [AccionesDatosEnlaces.BUSCAR_ENLACES_USUARIO]: (state: any, action: any) => {
        state.enlaceBusqueda = action.payload.datos;
        return state;
    },
    [AccionesDatosEnlaces.BUSCAR_ENLACES_USUARIO_COMPLETED]: (state: any, action: any) => {
        state.enlaces = action.payload.datos;
        state.currentPage = action.payload.page;
        state.totalPageCount = action.payload.pageCount;
        return state;
    },
    [AccionesDatosEnlaces.LIMPIAR_BUSQUEDA]: (state: any, action: any) => {
        state.enlaceBusqueda = { titulo: "", url: "", votos: [], tags: [] };
        return state;
    },
    [AccionesDatosEnlaces.ELIMINAR_ENLACE_DE_USUARIO]: (state: any, action: any) => {
        return {
          ...state,
          enlaces: Object.assign([], state.enlaces.filter((item) => item.id !== action.payload.datos.id))
        }
    },
    [AccionesDatosEnlaces.PUBLIC_PAGE]: (state: any, action: any) => {
        return state;
    },

})

export { enlacesReducer };
