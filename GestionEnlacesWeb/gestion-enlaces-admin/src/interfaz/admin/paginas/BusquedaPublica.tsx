import * as React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "configuracion/store/initial-state";
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";
import { useTranslation } from "react-i18next";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { search } from "../enlaces/acciones/creators/enlaces.action.creator";
import { IEnlace } from "dominio/enlace";
import { ICategoria } from "dominio/categoria";
import { ITag } from "dominio/tag";
import { ITipoEnlace } from "dominio/tipo-enlace";
import { IUsuario } from "dominio/usuario";
import ListaEnlacesPublico from "./ListaEnlacesPublico";
import { getCategorias, getTipos, getTags, getMedicos } from 'infraestructura/auth/app-data-manager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface BusquedaPublica_DispatchProps {
  doSearch(enlace: IEnlace, page?: number, idIdiomaUsuario?: number): any;

  loadInitalData: (idIdiomaUsuario?: number) => void;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doSearch: (enlace: IEnlace, page?: number, idIdiomaUsuario?: number) => {
    dispatch(search(enlace, page, idIdiomaUsuario));
  },

  loadInitalData: (idIdiomaUsuario?: number) => {
    dispatch(search({ titulo: "", url: "",  categoria: undefined, votos: [], tags: [] },1, idIdiomaUsuario )
    );
  },
});

type BusquedaPublicaProps = IEstadoAplicacion & BusquedaPublica_DispatchProps;

const _BusquedaPublica = function buscar(props: BusquedaPublicaProps) {
  const { t } = useTranslation();
  const busquedaAvanzadaTitulo = t("translation:busquedaAvanzada.titulo");
  const busquedaAvanzadaSimple = t("translation:busquedaAvanzada.simple");
  const busquedaAvanzadaCategoria = t("translation:busquedaAvanzada.categoria");
  const busquedaAvanzadaSubcategoria = t("translation:busquedaAvanzada.subcategoria");
  const busquedaAvanzadaTipo = t("translation:busquedaAvanzada.tipo");
  const busquedaAvanzadaTags = t("translation:busquedaAvanzada.tags");
  const busquedaAvanzadaEliminar = t("translation:busquedaAvanzada.eliminar");
  const busquedaAvanzadaBuscar = t("translation:busquedaAvanzada.buscar");
  const busquedaAvanzadaMedico = t("translation:busquedaAvanzada.medico");

  React.useEffect(() => {
    props.loadInitalData(getLoggedUserData().idIdiomaSeleccionado);
  }, []);

  const [limpiarBusqueda, setLimpiarBusqueda] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (limpiarBusqueda) {
      searchEnlace("");
      setLimpiarBusqueda(false);
    }
  }, [limpiarBusqueda]);

  const [busquedaVisible, setBusquedaVisible] = React.useState<boolean>(false);

  const [tituloBusqueda, setTituloBusqueda] = React.useState<
    string | undefined
  >(
    props.datosEnlaces.enlaceBusqueda
      ? props.datosEnlaces.enlaceBusqueda.titulo
      : undefined
  );

  const [tipoBusqueda, setTipoBusqueda] = React.useState<ITipoEnlace | null>(
    props.datosEnlaces.enlaceBusqueda != undefined &&
      props.datosEnlaces.enlaceBusqueda.tipo != undefined
      ? props.datosEnlaces.enlaceBusqueda.tipo
      : null
  );

  const [usuarioBusqueda, setUsuarioBusqueda] = React.useState<IUsuario | null>(
    null
  );

  const [
    categoriaBusqueda,
    setCategoriaBusqueda,
  ] = React.useState<ICategoria | null>(null);

  const [
    subcategoriaBusqueda,
    setSubcategoriaBusqueda,
  ] = React.useState<ICategoria | null>(null);

  const [tagsBusqueda, setTagsBusqueda] = React.useState<ITag[]>(
    props.datosEnlaces.enlaceBusqueda != undefined &&
      props.datosEnlaces.enlaceBusqueda.tags != undefined
      ? props.datosEnlaces.enlaceBusqueda.tags
      : []
  );

  const handleChangeTitulo = (e: any) => {
    setTituloBusqueda(e.target.value);
  };

  React.useEffect(() => {
    searchEnlace(tituloBusqueda)
  }, [tituloBusqueda]);

  const handleChangeTipo = (e: any) => {
    setTipoBusqueda(e);
  };

  const handleChangeCategoria = (e: any) => {
    setCategoriaBusqueda(e);
    setSubcategoriaBusqueda(null);
    handleSubcategoriaFiltrada(e);
  };

  const handleChangeSubcategoria = (e: any) => {
    setSubcategoriaBusqueda(e);
  };

  const handleChangeTags = (a: any, t: ITag[]) => {
    setTagsBusqueda(t);
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

  const searchTagFromListItem = (tag: ITag) => {
    handleChangeTags(null, [tag]);

    const enlace: IEnlace = Object.assign(
      {
        tags: [tag],
      }
    ) as IEnlace;

    props.doSearch(enlace, getLoggedUserData().idIdiomaSeleccionado);
  };

  const searchCategoriaFromListItem = (categoria: ICategoria) => {
    handleChangeCategoria(categoria);

    const enlace: IEnlace = Object.assign(
      {},
      {
        categoria: !categoria ? null : Object.assign({}, categoria),
      }
    ) as IEnlace;

    props.doSearch(enlace, getLoggedUserData().idIdiomaSeleccionado);
  };

  const searchSubcategoriaFromListItem = (categoria: ICategoria) => {
    handleChangeCategoria(categoria.padre);
    handleChangeSubcategoria(categoria);

    const enlace: IEnlace = Object.assign(
      {},
      {
        categoria: !categoria
          ? null
          : Object.assign({}, categoria.padre, {
            categoriasRelacionadas: [categoria],
          }),
      }
    ) as IEnlace;

    props.doSearch(enlace, getLoggedUserData().idIdiomaSeleccionado);
  };

  const handleChangeUsuario = (e: any) => {
    setUsuarioBusqueda(e);
  };

  const searchEnlace = (tituloLive?: string, page?) => {
    const enlace: IEnlace = Object.assign(
      {},
      {
        titulo: tituloLive ? tituloLive : tituloBusqueda,
        categoria: !categoriaBusqueda
          ? null
          : Object.assign({}, categoriaBusqueda, {
            categoriasRelacionadas: [subcategoriaBusqueda],
          }),
        tipo: tipoBusqueda,
        usuario: usuarioBusqueda,
        tags: !tagsBusqueda || tagsBusqueda.length === 0 ? null : tagsBusqueda,
      }
    ) as IEnlace;

    props.doSearch(enlace, page, getLoggedUserData().idIdiomaSeleccionado);
  };

  const searchChangePage = (page: number) => {
    searchEnlace(undefined, page);
  };

  const clearSearchEnlace = () => {
    setTituloBusqueda("");
    setTipoBusqueda(null);
    setCategoriaBusqueda(null);
    setSubcategoriaBusqueda(null);
    setTagsBusqueda([]);
    handleSubcategoriaFiltrada(null);
    setUsuarioBusqueda(null);

    setLimpiarBusqueda(true);
  };

  const getTagTranslated = (tag: ITag) => {

    const idIdiomaSelec = getLoggedUserData().idIdiomaSeleccionado;
    const tagCompleto = getTags().find(y => y.id === tag.id);
    if (tagCompleto && tagCompleto.traducciones) {
      const tagTraduccion = tagCompleto.traducciones?.find(z => z.idCampo === 1 && z.idIdioma === idIdiomaSelec);
      if (tagTraduccion) {
        return tagTraduccion.texto;
      }
    }

    return '';
  };
  
  const getCategoriaTranslated = (categoria: ICategoria | null) => {

    const idIdiomaSelec = getLoggedUserData().idIdiomaSeleccionado;
    if (categoria) {
      const categoriaCompleto = getCategorias().find(y => y.id === categoria.id);
      if (categoriaCompleto && categoriaCompleto.traducciones) {
        const categoriaTraduccion = categoriaCompleto.traducciones?.find(z => z.idCampo === 1 && z.idIdioma === idIdiomaSelec);
        if (categoriaTraduccion) {
          return categoriaTraduccion.texto;
        }
      }
    }

    return '';
  };
  return (
    <div className="busqueda">
      {/* <div className="portada">
        <img src="/images/pediatria.jpeg" alt="portada" />
      </div> */}

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
                searchEnlace();
              }
            }}
          />
          <a
            onClick={(e) => {
              e.preventDefault();
              searchEnlace();
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
                    getOptionLabel={(categoria) => getCategoriaTranslated(categoria)}
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
                    getOptionLabel={(option) => getCategoriaTranslated(option)}
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

              <div className="fila">
                <div className="cajaOption">
                  <Autocomplete
                    id="combo-option3"
                    className={"opciones"}
                    value={tipoBusqueda}
                    options={getTipos()}
                    getOptionLabel={(tipos) => tipos.nombre}
                    onChange={(event: any, value: any) => {
                      handleChangeTipo(value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        style={{ backgroundColor: "#23ADA9", color: "white" }}
                        label={busquedaAvanzadaTipo}
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  />
                </div>

                <div className="cajaOption">
                  <Autocomplete
                    id="combo-option4"
                    className={"opciones"}
                    value={usuarioBusqueda}
                    options={getMedicos()}
                    getOptionLabel={(medicos) =>  medicos.nombre + " " + medicos.apellidos}
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

              <div className="fila">
                <div className="cajaTags">
                  <div className="tagsBusqueda">
                    <Autocomplete
                      multiple
                      id="checkboxes-tags-demo"
                      value={tagsBusqueda || undefined}
                      options={getTags()}
                      disableCloseOnSelect
                      getOptionLabel={(tag) => getTagTranslated(tag)}
                      onChange={handleChangeTags}
                      getOptionSelected={(option, tag) => {
                        return option.id === tag.id;
                      }}
                      renderOption={(tag, { selected }) => (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 2, color: "#71C6C6" }}
                            checked={selected}
                          />
                          {getTagTranslated(tag)}
                        </React.Fragment>
                      )}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label={busquedaAvanzadaTags}
                          /* placeholder="Selecciona las palabras relacionadas con tu contenido" */
                          fullWidth
                        />
                      )}
                    />
                  </div>
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
                    searchEnlace();
                  }}
                >
                  {busquedaAvanzadaBuscar}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ListaEnlacesPublico
        handleChangePageFromPagination={searchChangePage}
        handleSearchTagFromListItem={searchTagFromListItem}
        handleSearchCategoriaFromListItem={searchCategoriaFromListItem}
        handleSearchSubcategoriaFromListItem={searchSubcategoriaFromListItem}
      />
    </div>
  );
};

export const BusquedaPublica = connect(
  mapStateToProps,
  mapDispatchToProps
)(_BusquedaPublica);

export default BusquedaPublica;
