export interface AccionLogin {
  type: string;
  payload: {
    usuario: string,
    pwd: string
  }
}

