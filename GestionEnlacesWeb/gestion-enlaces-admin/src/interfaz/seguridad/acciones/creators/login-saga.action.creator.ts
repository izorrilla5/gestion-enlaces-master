
import { createAction } from '@reduxjs/toolkit';
import { AccionesDatosSeguridad } from '../types/seguridad.action.types';
import { IDatosSeguridad } from 'dominio/estado/datos-seguridad';
import { IUsuario } from 'dominio/usuario';
import { IEmailContacto } from 'dominio/email-contacto';

export const loginRequest = createAction(AccionesDatosSeguridad.SAGA_LOGIN_REQUEST, function prepare(usuario: string, pwd: string) {

  return {
    payload: { usuario: usuario, pwd: pwd },
  }
});

export const loginCompleted = createAction(AccionesDatosSeguridad.SAGA_LOGIN_REQUEST_COMPLETED, function prepare(datosSeguridad: IDatosSeguridad) {
  return {
    payload: datosSeguridad
  }
});

export const registerRequest = createAction(AccionesDatosSeguridad.SAGA_REGISTER_REQUEST, function prepare(usuario: IUsuario) {
  return {
    payload: { usuario }
  }
});

export const loginPass = createAction(AccionesDatosSeguridad.SAGA_UPDATE_PASS, function prepare(usuarioUpdate: IUsuario) {

  return {
    payload: {
      usuarioUpdate
    },
  }
});

export const loginPassCompleted = createAction(AccionesDatosSeguridad.SAGA_LOGIN_REQUEST_COMPLETED, function prepare(datosSeguridad: IDatosSeguridad) {
  return {
    payload: datosSeguridad
  }
});

export const sendMail = createAction(AccionesDatosSeguridad.SEND_MAIL, function prepare(usuario: IUsuario) {
  return {
    payload: {
      usuario
    },
  }
});

export const sendMailContacto = createAction(AccionesDatosSeguridad.SEND_MAIL_CONTACTO, function prepare(emailContacto: IEmailContacto) {
  return {
    payload: {
      emailContacto
    },
  }
});


export const navigateToLogin = createAction(AccionesDatosSeguridad.LOGIN_PAGE, function prepare() {
  return {
    payload: {
    },
  }
});

export const navigateToRegister = createAction(AccionesDatosSeguridad.REGISTER_PAGE, function prepare() {
  return {
    payload: {
    },
  }
});