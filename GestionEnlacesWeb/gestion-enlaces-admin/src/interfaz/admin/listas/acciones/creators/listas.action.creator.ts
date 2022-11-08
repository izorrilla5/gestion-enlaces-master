import { createAction } from "@reduxjs/toolkit";
import { IListaEnlaces } from "dominio/lista-enlaces";
import { IListaEnlacesFiltrada } from 'dominio/lista-enlaces-filtrada';
import { AccionesDatosListas } from "../types/listas.action.types";

export const obtenerDatosLista = createAction(
  AccionesDatosListas.OBTENER_DATOS_LISTA,
  function prepare(lista: IListaEnlaces, pantallaOrigen: number) {
    return {
      payload: {
        datos: lista,
        pantallaOrigen
      },
    };
  }
);

export const obtenerDatosListaCompleted = createAction(
  AccionesDatosListas.OBTENER_DATOS_LISTA_COMPLETED,
  function prepare(lista: IListaEnlaces) {
    return {
      payload: {
        datos: lista
      },
    };
  }
);

export const actualizarDatosListas = createAction(
  AccionesDatosListas.ACTUALIZAR_DATOS_LISTAS,
  function prepare(lista: IListaEnlaces[]) {
    return {
      payload: {
        datos: lista,
      },
    };
  }
);

export const actualizarDatosListasSeleccionado = createAction(
  AccionesDatosListas.ACTUALIZAR_DATOS_LISTA_SELECCIONADO,
  function prepare(lista: IListaEnlaces[]) {
    return {
      payload: {
        datos: lista,
      },
    };
  }
);

export const searchList = createAction(
  AccionesDatosListas.BUSCAR_LISTAS,
  function prepare(lista: IListaEnlaces, page?: number, idIdiomaUsuario?: number) {
    return {
      payload: {
        datos: lista,
        page: page || 1,
        idIdiomaUsuario: idIdiomaUsuario || 1,
      },
    };
  }
);

export const searchListCompleted = createAction(
  AccionesDatosListas.BUSCAR_LISTAS_COMPLETED,
  function prepare(lista: any) {
    return {
      payload: {
        datos: lista.data,
        page: lista.page,
        pageCount: lista.pageCount,
      },
    };
  }
);

export const searchMyList = createAction(
  AccionesDatosListas.BUSCAR_MIS_LISTAS,
  function prepare(lista: IListaEnlacesFiltrada, page?: number, idIdiomaUsuario?: number) {
    return {
      payload: {
        datos: lista,
        page: page || 1,
        idIdiomaUsuario: idIdiomaUsuario || 1,
      },
    };
  }
);

export const searchMyListCompleted = createAction(
  AccionesDatosListas.BUSCAR_MIS_LISTAS_COMPLETED,
  function prepare(misListas: any) {
    return {
      payload: {
        datos: misListas.data,
        page: misListas.page,
        pageCount: misListas.pageCount,
      },
    };
  }
);

export const searchMyListPopUp = createAction(
  AccionesDatosListas.BUSCAR_MIS_LISTAS_POPUP,
  function prepare(misListas: IListaEnlaces, page?: number, idIdiomaUsuario?: number) {
    return {
      payload: {
        datos: misListas,
        page: page || 1,
        idIdiomaUsuario: idIdiomaUsuario || 1,
      },
    };
  }
);

export const searchMyListPopUpCompleted = createAction(
  AccionesDatosListas.BUSCAR_MIS_LISTAS_POPUP_COMPLETED,
  function prepare(misListas: any) {
    return {
      payload: {
        datos: misListas.data,
        page: misListas.page,
        pageCount: misListas.pageCount,
      },
    };
  }
);

export const searchListUser = createAction(
  AccionesDatosListas.BUSCAR_LISTA_USUARIO,
  function prepare(lista: IListaEnlaces) {
    return {
      payload: {
        datos: lista,
      },
    };
  }
);

export const searchListUserCompleted = createAction(
  AccionesDatosListas.BUSCAR_LISTA_USUARIO_COMPLETED,
  function prepare(lista: IListaEnlaces) {
    return {
      payload: {
        datos: lista,
      },
    };
  }
);

export const listaEliminar = createAction(
  AccionesDatosListas.DATOS_ELIMINAR,
  function prepare(lista: IListaEnlaces, pantallaOrigen: number) {
    return {
      payload: {
        datos: lista,
        pantallaOrigen
      },
    };
  }
);

export const listaEliminada = createAction(
  AccionesDatosListas.DATOS_ELIMINADOS,
  function prepare(lista: IListaEnlaces, pantallaOrigen: number) {
    return {
      payload: {
        datos: lista,
        pantallaOrigen
      },
    };
  }
);

export const crearNuevaLista = createAction(
  AccionesDatosListas.CREAR_NUEVA_LISTA,
  function prepare(lista: IListaEnlaces, pantallaOrigen: number) {
    return {
      payload: {
        datos: lista,
        pantallaOrigen
      },
    };
  }
);

export const guardarLista = createAction(
  AccionesDatosListas.GUARDAR_LISTA,
  function prepare(lista: IListaEnlaces) {
    return {
      payload: {
        datos: lista
      },
    };
  }
);

export const guardarListaCompleted = createAction(
  AccionesDatosListas.GUARDAR_LISTAS_COMPLETED,
  function prepare(lista: IListaEnlaces) {
    return {
      payload: {
        datos: lista,
      },
    };
  }
);

export const clonarLista = createAction(
  AccionesDatosListas.CLONAR_LISTA,
  function prepare(lista: IListaEnlaces) {
    return {
      payload: {
        datos: lista,
      },
    };
  }
);

export const searchListUserPage = createAction(
  AccionesDatosListas.BUSCAR_LISTAS_USUARIOSPAGE,
  function prepare(lista: IListaEnlacesFiltrada, page?: number, idIdiomaUsuario?: number) {
    return {
      payload: {
        datos: lista,
        page: page || 1,
        idIdiomaUsuario: idIdiomaUsuario || 1,
      },
    };
  }
);

export const searchListUserPageCompleted = createAction(
  AccionesDatosListas.BUSCAR_LISTAS_USUARIOSPAGE_COMPLETED,
  function prepare(misListas: any) {
    return {
      payload: {
        datos: misListas.data,
        page: misListas.page,
        pageCount: misListas.pageCount,
      },
    };
  }
);

export const limpiarBusquedaListas = createAction(
  AccionesDatosListas.LIMPIAR_BUSQUEDA,
  function prepare() {
    return {
      payload: {
      },
    };
  }
);

export const eliminarListaDeUsuario = createAction(
  AccionesDatosListas.ELIMINAR_LISTA_DE_USUARIO,
  function prepare(lista: IListaEnlaces) {
    return {
      payload: {
        datos: lista
      },
    };
  }
);
