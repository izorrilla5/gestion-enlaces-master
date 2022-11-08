import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";

const initialState: IEstadoAplicacion = {
  datosSeguridad: { access_token: "", error: "" },
  datosCategorias: { categorias: [] },
  datosTipos: { tipos: [] },
  datosTags: { tags: [] },
  datosUsuarios: {
    usuarios: [],
    usuarioSeleccionado: undefined,
    currentPageUsuarios: 1,
    totalPageCountUsuarios: 1,
    rolesBusqueda: [],
    navegacionPerfil: false,
    usuarioInactivo: false,
  },
  datosMedicos: { medicos: [] },
  datosEnlaces: {
    enlaces: [],
    currentPage: 1,
    totalPageCount: 1,
    enlaceSeleccionado: undefined,
    ultimosEnlaces: [],
    masVotadosEnlaces: [],
    enlacesPatrocinados: [],
    navegacion: 1
  },
  datosEstadoPromesa: { promesaFinalizada: true, finalizadoCorrecto: true },
  datosListas: {
    listas: [],
    misListas: [],
    listasUsuario: [],
    listaSeleccionada: undefined,
    currentPageListas: 1,
    currentPageMisListas: 1,
    totalPageCountListas: 1,
    totalPageCountMisListas: 1,
    navegacion: 1
  },
  datosRol: {
    roles: [],
  },
  datosIdiomas: {
    idiomas: [],
    idiomaSeleccionado: undefined
  }

};

export function mapStateToProps(state: IEstadoAplicacion): IEstadoAplicacion {
  return state;
}

export default initialState;
