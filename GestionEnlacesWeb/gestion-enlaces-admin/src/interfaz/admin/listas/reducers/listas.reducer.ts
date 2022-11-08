import { Reducer } from "react";
import { createReducer, Action } from "@reduxjs/toolkit";
import initialState from "configuracion/store/initial-state";
import { AccionesDatosListas } from "../acciones/types/listas.action.types";
import { IEstadoListas } from "dominio/estado/estado-listas";

const listasReducer: Reducer<IEstadoListas, Action<string>> = createReducer(
  initialState.datosListas,
  {
    [AccionesDatosListas.ACTUALIZAR_DATOS_LISTAS]: (
      state: any,
      action: any
    ) => {
      return { ...state.listas, ...action.payload.datos };
    },

    [AccionesDatosListas.OBTENER_DATOS_LISTA]: (state: any, action: any) => {
      //TODO: ver que hacer con lo que viene en datos...
      state.listaSeleccionada = action.payload.datos;
      state.navegacion = action.payload.pantallaOrigen;
      return state;
    },
    [AccionesDatosListas.ACTUALIZAR_DATOS_LISTA_SELECCIONADO]: (
      state: any,
      action: any
    ) => {
      //TODO: ver que hacer con lo que viene en datos...
      state.listaSeleccionada = action.payload.datos;
      return state;
    },

    [AccionesDatosListas.BUSCAR_LISTAS]: (state: any, action: any) => {
      state.listaBusqueda = action.payload.datos;
      return state;
    },
    [AccionesDatosListas.BUSCAR_LISTAS_COMPLETED]: (
      state: any,
      action: any
    ) => {
      state.listas = action.payload.datos;
      state.currentPageListas = action.payload.page;
      state.totalPageCountListas = action.payload.pageCount;
      return state;
    },

    [AccionesDatosListas.BUSCAR_MIS_LISTAS]: (state: any, action: any) => {
      state.listaBusqueda = action.payload.datos;
      return state;
    },
    [AccionesDatosListas.BUSCAR_MIS_LISTAS_COMPLETED]: (
      state: any,
      action: any
    ) => {
      state.misListas = action.payload.datos;
      state.currentPageMisListas = action.payload.page;
      state.totalPageCountMisListas = action.payload.pageCount;
      return state;
    },
    [AccionesDatosListas.BUSCAR_MIS_LISTAS_POPUP]: (state: any, action: any) => {
      state.listaBusqueda = action.payload.datos;
      return state;
    },
    [AccionesDatosListas.BUSCAR_MIS_LISTAS_POPUP_COMPLETED]: (
      state: any,
      action: any
    ) => {
      state.misListas = action.payload.datos;
      state.currentPageMisListas = action.payload.page;
      state.totalPageCountMisListas = action.payload.pageCount;
      state.listaBusqueda = {
        nombre: '',

      }
      return state;
    },

    [AccionesDatosListas.BUSCAR_LISTA_USUARIO]: (state: any, action: any) => {
      return state;
    },
    [AccionesDatosListas.BUSCAR_LISTA_USUARIO_COMPLETED]: (
      state: any,
      action: any
    ) => {
      state.listasUsuario = action.payload.datos;
      return state;
    },

    [AccionesDatosListas.CREAR_NUEVA_LISTA]: (state: any, action: any) => {
      //TODO: ver que hacer con lo que viene en datos...
      state.navegacion = action.payload.pantallaOrigen;
      state.listaSeleccionada = undefined;
      return state;
    },

    [AccionesDatosListas.GUARDAR_LISTA]: (state: any, action: any) => {
      state.navegacion = action.payload.pantallaOrigen;
      state.listaSeleccionada = action.payload.datos;

      /*
        state.enlaceSeleccionado.usuario =  {
			idUsuario: 1, nombre: '',
			apellidos: 'string;',
			email: 'string',
			password: 'string',
			rol: {
				idRol: 1,
				nombre: ''
			},
			activo: true
		};*/
      return state;
    },

    [AccionesDatosListas.GUARDAR_LISTAS_COMPLETED]: (
      state: any,
      action: any
    ) => {
      state.listaSeleccionada = {
        nombre: "",
        categoria: undefined,
      };
      return state;
    },

    [AccionesDatosListas.CLONAR_LISTA]: (state: any, action: any) => {
      state.listaSeleccionada = action.payload.datos;
      return state;
    },

    [AccionesDatosListas.BUSCAR_LISTAS_USUARIOSPAGE]: (state: any, action: any) => {
      state.listaBusqueda = action.payload.datos;
      return state;
    },
    [AccionesDatosListas.BUSCAR_LISTAS_USUARIOSPAGE_COMPLETED]: (
      state: any,
      action: any
    ) => {
      state.misListas = action.payload.datos;
      state.currentPageMisListas = action.payload.page;
      state.totalPageCountMisListas = action.payload.pageCount;
      return state;
    },
    [AccionesDatosListas.LIMPIAR_BUSQUEDA]: (state: any, action: any) => {
        state.listaBusqueda = {
          nombre: '',
        }
        return state;
    },
    [AccionesDatosListas.ELIMINAR_LISTA_DE_USUARIO]: (state: any, action: any) => {
        return {
          ...state,
          misListas: Object.assign([], state.misListas.filter((item) => item.id !== action.payload.datos.id))
        }
    }
  }
);

export { listasReducer };
