import { createAction } from "@reduxjs/toolkit";
import { AccionesDatosEnlaces } from "../types/enlaces.action.types";
import { IEnlace } from "dominio/enlace";

export const datosEliminar = createAction(
  AccionesDatosEnlaces.DATOS_ELIMINAR,
  function prepare(enlace: IEnlace, pantallaOrigen: number) {
    return {
      payload: {
        datos: enlace,
        pantallaOrigen
      },
    };
  }
);

export const datosEliminados = createAction(
  AccionesDatosEnlaces.DATOS_ELIMINADOS,
  function prepare(enlace: IEnlace, pantallaOrigen: number) {
    return {
      payload: {
        datos: enlace,
        pantallaOrigen
      },
    };
  }
);

export const obtenerDatosEnlace = createAction(
  AccionesDatosEnlaces.OBTENER_DATOS_ENLACE,
  function prepare(enlace: IEnlace, pantallaOrigen: number) {
    return {
      payload: {
        datos: enlace,
        pantallaOrigen
      },
    };
  }
);

export const obtenerDatosEnlaceCompleted = createAction(
  AccionesDatosEnlaces.OBTENER_DATOS_ENLACE_COMPLETED,
  function prepare(enlace: IEnlace) {
    return {
      payload: {
        datos: enlace
      },
    };
  }
);

export const actualizarDatosEnlaces = createAction(
  AccionesDatosEnlaces.ACTUALIZAR_DATOS_ENLACES,
  function prepare(enlaces: IEnlace[]) {
    return {
      payload: {
        datos: enlaces,
      },
    };
  }
);

export const actualizarDatosEnlaceSeleccionado = createAction(
  AccionesDatosEnlaces.ACTUALIZAR_DATOS_ENLACE_SELECCIONADO,
  function prepare(enlaces: IEnlace[]) {
    return {
      payload: {
        datos: enlaces,
      },
    };
  }
);

export const crearNuevoEnlace = createAction(
  AccionesDatosEnlaces.CREAR_NUEVO_ENLACE,
  function prepare(enlace: IEnlace, pantallaOrigen: number) {
    return {
      payload: {
        datos: enlace,
        pantallaOrigen
      },
    };
  }
);

export const mainPage = createAction(
  AccionesDatosEnlaces.MAIN_PAGE,
  function prepare(navegacion: number) {
    return {
      payload: {
        pantallaOrigen: navegacion
      },
    };
  }
);

export const listasPage = createAction(
  AccionesDatosEnlaces.LISTAS_PAGE,
  function prepare(navegacion: number) {
    return {
      payload: {
        pantallaOrigen: navegacion
      },
    };
  }
);

export const guardarEnlace = createAction(
  AccionesDatosEnlaces.GUARDAR_ENLACE,
  function prepare(enlace: IEnlace) {
    return {
      payload: {
        datos: enlace,
      },
    };
  }
);

export const search = createAction(
  AccionesDatosEnlaces.BUSCAR_ENLACES,
  function prepare(enlace: IEnlace, page?: number, idIdiomaUsuario?: number) {
    return {
      payload: {
        datos: enlace,
        page: page || 1,
        idIdiomaUsuario: idIdiomaUsuario || 1,
      },
    };
  }
);

export const searchCompleted = createAction(
  AccionesDatosEnlaces.BUSCAR_ENLACES_COMPLETED,
  function prepare(enlaces: any) {
    return {
      payload: {
        datos: enlaces.data,
        page: enlaces.page,
        pageCount: enlaces.pageCount,
      },
    };
  }
);



export const getUltimosEnlaces = createAction(
  AccionesDatosEnlaces.OBTENER_ULTIMOS_ENLACES,
  function prepare(idIdiomaUsuario?: number) {
    return {
      payload: {
        idIdiomaUsuario: idIdiomaUsuario || 1
      },
    };
  }
);

export const getUltimosEnlacesCompleted = createAction(
  AccionesDatosEnlaces.OBTENER_ULTIMOS_ENLACES_COMPLETED,
  function prepare(enlaces: IEnlace[]) {
    return {
      payload: {
        datos: enlaces
      },
    };
  }
);

export const getMasVotados = createAction(
  AccionesDatosEnlaces.OBTENER_MAS_VOTADOS,
  function prepare(idIdiomaUsuario?: number) {
    return {
      payload: {
        idIdiomaUsuario: idIdiomaUsuario || 1
      },
    };
  }
);

export const getMasVotadosCompleted = createAction(
  AccionesDatosEnlaces.OBTENER_MAS_VOTADOS_COMPLETED,
  function prepare(enlaces: IEnlace[]) {
    return {
      payload: {
        datos: enlaces,
      },
    };
  }
);

export const getEnlacesPatrocinados = createAction(
  AccionesDatosEnlaces.OBTENER_PATROCINADOS,
  function prepare(idIdiomaUsuario?: number){
    return {
      payload: {
        idIdiomaUsuario: idIdiomaUsuario || 1
      }
    }
  }
);

export const getEnlacesPatrocinadosCompleted = createAction(
  AccionesDatosEnlaces.OBTENER_PATROCINADOS_COMPLETED,
  function prepare(enlaces: IEnlace[]) {
    return {
      payload: {
        datos: enlaces
      }
    }
  }
);

export const volverAtras = createAction(
  AccionesDatosEnlaces.VOLVER_ATRAS,
  function prepare() {
    return {
      payload: {},
    };
  }
);

export const searchLinksUserPage = createAction(
  AccionesDatosEnlaces.BUSCAR_ENLACES_USUARIO,
  function prepare(enlace: IEnlace, page?: number, idIdiomaUsuario?: number) {
    return {
      payload: {
        datos: enlace,
        page: page || 1,
        idIdiomaUsuario: idIdiomaUsuario || 1,
      },
    };
  }
);

export const searchLinksUserPageCompleted = createAction(
  AccionesDatosEnlaces.BUSCAR_ENLACES_USUARIO_COMPLETED,
  function prepare(enlaces: any) {
    return {
      payload: {
        datos: enlaces.data,
        page: enlaces.page,
        pageCount: enlaces.pageCount,
      },
    };
  }
);


export const limpiarBusquedaEnlace = createAction(
  AccionesDatosEnlaces.LIMPIAR_BUSQUEDA,
  function prepare() {
    return {
      payload: {},
    };
  }
);

export const eliminarEnlaceDeUsuario = createAction(
  AccionesDatosEnlaces.ELIMINAR_ENLACE_DE_USUARIO,
  function prepare(enlace: IEnlace) {
    return {
      payload: {
        datos: enlace
      },
    };
  }
);

export const mainPublicPage = createAction(
  AccionesDatosEnlaces.PUBLIC_PAGE,
  function prepare() {
    return {
      payload: {},
  };
  }
);



