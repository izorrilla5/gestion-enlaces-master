import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { mapStateToProps } from "configuracion/store/initial-state";
import { ICategoria } from "dominio/categoria";
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";
import { IListaEnlaces } from "dominio/lista-enlaces";
import { IListaEnlacesFiltrada } from 'dominio/lista-enlaces-filtrada';
import { IUsuario } from "dominio/usuario";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { searchList, searchMyList } from "../listas/acciones/creators/listas.action.creator";
import ListasCarpetas from './ListasCarpetas';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { getMedicos, getCategorias } from 'infraestructura/auth/app-data-manager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


export interface BusquedaListas_DispatchProps {
  doSearchList(lista: IListaEnlaces, page?: number, idIdiomaUsuario?: number): any;
  doSearchMyList(lista: IListaEnlacesFiltrada, page?: number, idIdiomaUsuario?: number): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doSearchList: (lista: IListaEnlaces, page?: number, idIdiomaUsuario?: number) => {
    dispatch(searchList(lista, page, idIdiomaUsuario));
  },

  doSearchMyList: (lista: IListaEnlacesFiltrada, page?: number, idIdiomaUsuario?: number) => {
    dispatch(searchMyList(lista, page, idIdiomaUsuario));
  }
});

type BusquedaListasProps = IEstadoAplicacion & BusquedaListas_DispatchProps;

const _BusquedaListas = (props: BusquedaListasProps) => {

  //Configuracion i18n
  const { t } = useTranslation();
  const busquedaAvanzadaTitulo = t("translation:busquedaAvanzada.titulo");
  const busquedaAvanzadaSimple = t("translation:busquedaAvanzada.simple");
  const busquedaAvanzadaCategoria = t("translation:busquedaAvanzada.categoria");
  const busquedaAvanzadaSubcategoria = t("translation:busquedaAvanzada.subcategoria");
  const busquedaAvanzadaMedico = t("translation:busquedaAvanzada.medico");
  const busquedaAvanzadaEliminar = t("translation:busquedaAvanzada.eliminar");
  const busquedaAvanzadaBuscar = t("translation:busquedaAvanzada.buscar");

  //Carga Inicial
  React.useEffect(() => {
    searchLista();
    buscarMisListas();
  }, []);

  const [limpiarBusqueda, setLimpiarBusqueda] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (limpiarBusqueda) {
      searchLista("");
      buscarMisListas();
      setLimpiarBusqueda(false);
    }
  }, [limpiarBusqueda]);

  const [busquedaVisible, setBusquedaVisible] = React.useState<boolean>(false);

  const [tituloBusqueda, setTituloBusqueda] = React.useState<
    string | undefined
  >(
    props.datosListas.listaBusqueda != undefined &&
      props.datosListas.listaBusqueda.nombre != undefined
      ? props.datosListas.listaBusqueda.nombre
      : undefined
  );

  const [usuarioBusqueda, setUsuarioBusqueda] = React.useState<IUsuario | null>(
    props.datosListas.listaBusqueda != undefined &&
      props.datosListas.listaBusqueda.usuario != undefined
      ? props.datosListas.listaBusqueda.usuario
      : null
  );

  const [
    categoriaBusqueda,
    setCategoriaBusqueda,
  ] = React.useState<ICategoria | null>(null);

  const [
    subcategoriaBusqueda,
    setSubcategoriaBusqueda,
  ] = React.useState<ICategoria | null>(null);

  const handleChangeTitulo = (e: any) => {
    setTituloBusqueda(e.target.value);
    searchLista(e.target.value);
    buscarMisListas(e.target.value);
  };

  const handleChangeUsuario = (e: any) => {
    setUsuarioBusqueda(e);
  };

  const handleChangeCategoria = (e: any) => {
    setCategoriaBusqueda(e);
    setSubcategoriaBusqueda(null);
    handleSubcategoriaFiltrada(e);
  };

  const handleChangeSubcategoria = (e: any) => {
    setSubcategoriaBusqueda(e);
  };

  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = React.useState<
    ICategoria[] | null
  >(null);

  const handleSubcategoriaFiltrada = (catSelect: ICategoria | null): void => {
    const subcatsFiltradas = catSelect
      ? getCategorias().filter(
        (x: { id: number; idCategoriaPadre: number }) =>
          x.id !== catSelect.id && x.idCategoriaPadre === catSelect.id
      )
      : null;
    setSubcategoriasFiltradas(subcatsFiltradas);
  };

  //TODO: comprobar si falta algo
  const searchLista = (nombreLive?: string, page?: number) => {
    const lista: IListaEnlaces = Object.assign(
      {
        nombre: nombreLive ? nombreLive : tituloBusqueda,
        categoria: !categoriaBusqueda
          ? null
          : Object.assign({}, categoriaBusqueda, {
            categoriasRelacionadas: [subcategoriaBusqueda],
          }),
        usuario: usuarioBusqueda,
      }
    ) as IListaEnlaces;

    props.doSearchList(lista, page, getLoggedUserData().idIdiomaSeleccionado);
  };

  const searchChangePage = (page: number) => {
    searchLista(undefined, page);
  };

  const buscarMisListas = (nombreLive?: string, page?: number) => {
    const lista: IListaEnlacesFiltrada = Object.assign(
      {
        nombre: nombreLive ? nombreLive : tituloBusqueda,
        categoria: !categoriaBusqueda
          ? null
          : Object.assign({}, categoriaBusqueda, {
            categoriasRelacionadas: [subcategoriaBusqueda],
          }),
        usuario: usuarioBusqueda,
        usuarioLogueado: getLoggedUserData(),
      }
    ) as IListaEnlacesFiltrada;

    props.doSearchMyList(lista, page, getLoggedUserData().idIdiomaSeleccionado);
  };

  const searchChangePersonalPage = (page: number) => {
    buscarMisListas(undefined, page);
  };

  const searchCategoriaFromListItem = (categoria: ICategoria) => {
    handleChangeCategoria(categoria);

    const lista: IListaEnlacesFiltrada = Object.assign(
      {
        categoria: !categoria ? null : Object.assign({}, categoria),
        usuarioLogueado: getLoggedUserData(),
      }
    ) as IListaEnlaces;

    props.doSearchList(lista, 1, getLoggedUserData().idIdiomaSeleccionado);
    props.doSearchMyList(lista, 1, getLoggedUserData().idIdiomaSeleccionado);
  };

  const searchSubcategoriaFromListItem = (categoria: ICategoria) => {
    handleChangeCategoria(categoria.padre);
    handleChangeSubcategoria(categoria);

    const lista: IListaEnlaces = Object.assign(
      {
        categoria: !categoria
          ? null
          : Object.assign({}, categoria.padre, {
            categoriasRelacionadas: [categoria],
          }),
        usuarioLogueado: getLoggedUserData(),
      }
    ) as IListaEnlaces;

    props.doSearchList(lista, 1, getLoggedUserData().idIdiomaSeleccionado);
    props.doSearchMyList(lista, 1, getLoggedUserData().idIdiomaSeleccionado);
  };


  const clearSearchEnlace = () => {
    setTituloBusqueda("");
    setCategoriaBusqueda(null);
    setSubcategoriaBusqueda(null);
    handleSubcategoriaFiltrada(null);
    setUsuarioBusqueda(null);

    setLimpiarBusqueda(true);

    // const enlace : IEnlace = Object.assign({},  {titulo: '', url: '', votos: [], tags: []}) as IEnlace;
  };

  return (
    <div className="busqueda">
      <div className="busquedaSimple">
        <form className="search-container">
          <input
            className="buscar"
            id="search-bar"
            type="text"
            placeholder={busquedaAvanzadaSimple}
            onChange={(event) => {
              handleChangeTitulo(event);
            }}
            value={tituloBusqueda}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                searchLista();
                buscarMisListas();
              }
            }}
          />
          <a
            onClick={(e) => {
              e.preventDefault();
              searchLista();
              buscarMisListas();
            }}
            href="#"
          >
            <FontAwesomeIcon icon={faSearch} className="lupa" />
          </a>
        </form>
      </div>

      <div className="busquedaAvanzada">
        <button
          className="botonDesplegar"
          onClick={(e) => {
            setBusquedaVisible(!busquedaVisible);
          }}
        >
          <div className="CTAvanzado">
            <h2>{busquedaAvanzadaTitulo}</h2>
            <div className="ampliar">
              <div hidden={busquedaVisible}>
                <FontAwesomeIcon icon={faPlus} />
              </div>
              <div hidden={!busquedaVisible}>
                <FontAwesomeIcon icon={faMinus} />
              </div>
            </div>
          </div>
        </button>
        {busquedaVisible && (
          <div className="cajaDesplegada">
            <div className="cajaOpcionesAvanzadas">

              <div className="fila">
                <div className="cajaOption">
                  <Autocomplete
                    id="combo-option1"
                    className={"opciones"}
                    value={categoriaBusqueda}
                    onChange={(event: any, value: any) => {
                      handleChangeCategoria(value);
                    }}
                    options={getCategorias().filter(
                      (x) => x.id === x.idCategoriaPadre
                    )}
                    getOptionLabel={(categoria) => categoria.nombre}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={busquedaAvanzadaCategoria}
                        value={categoriaBusqueda}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </div>

                <div className="cajaOption">
                  <Autocomplete
                    id="combo-option2"
                    className={"opciones"}
                    value={subcategoriaBusqueda}
                    onChange={(event: any, value: any) => {
                      handleChangeSubcategoria(value);
                    }}
                    options={subcategoriasFiltradas || []}
                    getOptionLabel={(option) => option.nombre || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ backgroundColor: "#23ADA9", color: "white" }}
                        label={busquedaAvanzadaSubcategoria}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </div>
              </div>

              <div className="filaLista">
                <div className="cajaOptionLista">
                  <Autocomplete
                    id="combo-option4"
                    className={"opciones"}
                    value={usuarioBusqueda}
                    options={getMedicos()}
                    getOptionLabel={(medicos) => medicos.nombre + " " + medicos.apellidos}
                    onChange={(event: any, value: any) => {
                      handleChangeUsuario(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        className="opciones"
                        label={busquedaAvanzadaMedico}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </div>
              </div>

              <div className="cajaBuscarAvanzado">
                <button
                  className="botonEliminar"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    clearSearchEnlace();
                  }}
                >
                  {busquedaAvanzadaEliminar}
                </button>
                <button
                  className="botonBuscar"
                  onClick={(e) => {
                    e.preventDefault();
                    searchLista();
                    buscarMisListas();
                  }}
                >
                  {busquedaAvanzadaBuscar}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <ListasCarpetas
        handleSearchCategoriaFromListItem={searchCategoriaFromListItem}
        handleSearchSubcategoriaFromListItem={searchSubcategoriaFromListItem}
        handleChangePageFromPagination={searchChangePage}
        handleChangePersonalPageFromPagination={searchChangePersonalPage}
      />
    </div>
  );
};

export const BusquedaListas = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BusquedaListas);

export default BusquedaListas;
