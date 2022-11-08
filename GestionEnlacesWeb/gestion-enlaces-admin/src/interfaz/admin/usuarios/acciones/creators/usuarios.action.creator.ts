import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosUsuario } from '../types/usuarios.action.types';
import { IUsuario } from 'dominio/usuario';
import { IRol } from 'dominio/rol';

export const actualizarDatosUsuarios = createAction(AccionesDatosUsuario.ACTUALIZAR_DATOS_USUARIOS, function prepare(usuarios: IUsuario[]) {
    return {
        payload: {
            datos: usuarios
        }
    }
})

export const searchUser = createAction(AccionesDatosUsuario.BUSCAR_USUARIO, function prepare(usuario: IUsuario, page?: number, rolBusqueda?: IRol[]) {
    return {
        payload: {
            datos: usuario,
            page: page || 1,
            rolesBusqueda: rolBusqueda
        },
    };
}
);

export const searchUserCompleted = createAction(AccionesDatosUsuario.BUSCAR_USUARIO_COMPLETED, function prepare(usuario: any) {
    return {
        payload: {
            datos: usuario.data,
            page: usuario.page,
            pageCount: usuario.pageCount,
        },
    };
}
);

export const navigateToUsuariosPage = createAction(AccionesDatosUsuario.NAVEGAR_A_USUARIOS, function prepare() {
    return {
        payload: {},
    };
}
);

export const crearNuevoUsuario = createAction(AccionesDatosUsuario.CREAR_NUEVO_USUARIO, function prepare() {
    return {
        payload: {},
    };
}
);

export const guardarUsuario = createAction(AccionesDatosUsuario.GUARDAR_USUARIO, function prepare(usuario: IUsuario, roles?: IRol[]) {
    return {
        payload: {
            datos: usuario,
            roles
        },
    };
}
);

export const obtenerDatosUsuario = createAction(AccionesDatosUsuario.OBTENER_DATOS_USUARIO, function prepare(usuario: IUsuario, perfilUsuario: boolean) {
    return {
        payload: {
            datos: usuario,
            navegacionPerfil: perfilUsuario
        },
    };
}
);

export const obtenerDatosUsuarioCompleted = createAction(AccionesDatosUsuario.OBTENER_DATOS_USUARIO_COMPLETED, function prepare(usuario: IUsuario, perfilUsuario: boolean) {
    return {
        payload: {
            datos: usuario,
            navegacionPerfil: perfilUsuario
        },
    };
}
);

export const actualizarDatosUsuarioSeleccionado = createAction(AccionesDatosUsuario.ACTUALIZAR_DATOS_USUARIO_SELECCIONADO, function prepare(usuario: IUsuario) {
    return {
        payload: {
            datos: usuario,
        },
    };
}
);

export const usuarioEliminar = createAction(AccionesDatosUsuario.USUARIO_ELIMINAR, function prepare(usuario: IUsuario, roles?: IRol[]) {
    return {
        payload: {
            datos: usuario,
            roles
        },
    };
}
);

export const usuarioEliminado = createAction(AccionesDatosUsuario.USUARIO_ELIMINADO, function prepare(usuario: IUsuario) {
    return {
        payload: {
            datos: usuario,
        },
    };
}
);

export const aboutPage = createAction(AccionesDatosUsuario.ABOUT_PAGE, function prepare() {
    return {
        payload: {},
    };
}
);


export const cookiesPage = createAction(AccionesDatosUsuario.COOKIES_PAGE, function prepare() {
    return {
        payload: {},
    };
}
);

export const avisoLegalPage = createAction(AccionesDatosUsuario.LEGAL_PAGE, function prepare() {
    return {
        payload: {},
    };
}
);

export const contactoPage = createAction(AccionesDatosUsuario.CONTACTO_PAGE, function prepare() {
    return {
        payload: {},
    };
}
);

export const usuarioInactivo = createAction(AccionesDatosUsuario.USUARIO_INACTIVO, function prepare() {
    return {
        payload: {},
    };
}
);

export const usuarioInactivoReset = createAction(AccionesDatosUsuario.USUARIO_INACTIVO_RESET, function prepare() {
    return {
        payload: {},
    };
}
);