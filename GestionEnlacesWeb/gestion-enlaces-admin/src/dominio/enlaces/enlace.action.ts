export interface EnlaceAccion {
  type: string;
  payload: {
    datos: any,
    page?: number,
    pageCount?: number,
    idIdiomaUsuario?: number,
    pantallaOrigen?: number,
    navegacionPerfil?:boolean 
  }
}