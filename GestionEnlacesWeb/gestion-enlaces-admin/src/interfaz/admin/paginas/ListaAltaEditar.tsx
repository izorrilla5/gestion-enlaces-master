import * as React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "configuracion/store/initial-state";
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";
import MenuPrivado from "./MenuPrivado";
import {
  guardarLista,
} from "../listas/acciones/creators/listas.action.creator";
import { useTranslation } from 'react-i18next';
import { ICategoria } from "dominio/categoria";
import { IListaEnlaces } from "dominio/lista-enlaces";
import { listasPage } from "../enlaces/acciones/creators/enlaces.action.creator";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ITraduccion } from 'dominio/traduccion';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { getIdiomas, getCategorias } from 'infraestructura/auth/app-data-manager';
import { PiePagina } from './PiePagina';

interface EditarListaDispatchProps {
  doSendList(lista: IListaEnlaces): any;
  doNavigateToListasPage(navegacion: number | undefined): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doSendList: (lista: IListaEnlaces) => {
    dispatch(guardarLista(lista));
  },
  doNavigateToListasPage: (navegacion: number | undefined) => {
    if (navegacion) {
      dispatch(listasPage(navegacion));
    }
  },
});

type EditarListaProps = IEstadoAplicacion & EditarListaDispatchProps;

const _EditarLista = (props: EditarListaProps) => {

  const { t } = useTranslation();
  const altaEditarLista = t("translation:altaEditar.lista");
  const altaEditarNuevaLista = t("translation:altaEditar.nuevaLista");
  const altaEditarTituloES = t("translation:altaEditar.titulo.ES");
  const altaEditarTituloEU = t("translation:altaEditar.titulo.EU");
  const busquedaAvanzadaCategoria = t("translation:busquedaAvanzada.categoria");
  const busquedaAvanzadaSubcategoria = t("translation:busquedaAvanzada.subcategoria");
  const altaEditarMedico = t("translation:altaEditar.medico");
  const altaEditarVolver = t("translation:altaEditar.volver");
  const altaEditarGuardar = t("translation:altaEditar.guardar");
  const altaEditarCrear = t("translation:altaEditar.crear");
  const altaEditarCrearContinuar = t("translation:altaEditar.crearContinuar");
  const altaEditarModalListaCorrecta = t("translation:altaEditar.modalLista.correcto");
  const altaEditarModalListaInfo = t("translation:altaEditar.modalLista.info");
  const altaEditarModalObligatoriedad = t("translation:altaEditar.modal.obligatoriedad");

  const [tituloES, setTituloES] = React.useState<string | undefined>
    (props.datosListas.listaSeleccionada ? props.datosListas.listaSeleccionada.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 1)?.texto : '');

  const [tituloEU, setTituloEU] = React.useState<string | undefined>
    (props.datosListas.listaSeleccionada ? props.datosListas.listaSeleccionada.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 1)?.texto : '');


  const [categoria, setCategoria] = React.useState<ICategoria | null>(null);

  const [subcategoria, setSubcategoria] = React.useState<ICategoria | null>(null);

  const handleChangeSubcategoria = (e: any) => {
    setSubcategoria(e);
  };

  const handleSubcategoriaFiltrada = (catSelect: ICategoria | null): void => {
    const subcatsFiltradas = catSelect
      ? getCategorias().filter(
        (x: { id: number; idCategoriaPadre: number }) =>
          x.id !== catSelect.id && x.idCategoriaPadre === catSelect.id
      )
      : null;
    setSubcategoriasFiltradas(subcatsFiltradas);
  };

  const handleChangeCategoria = (e: any) => {
    setCategoria(e);
    setSubcategoria(null);
    handleSubcategoriaFiltrada(e);
  };

  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = React.useState<
    ICategoria[] | null
  >(null);

  React.useEffect(() => {
    const listaSeleccionada = props.datosListas.listaSeleccionada;
    if (listaSeleccionada) {
      /*setIdEnlace(enlaceSeleccionado.id);
          setTitulo(enlaceSeleccionado.titulo);
          setUrl(enlaceSeleccionado.url);*/

      if (listaSeleccionada.categoria) {
        setCategoria(listaSeleccionada.categoria.padre);
        handleSubcategoriaFiltrada(listaSeleccionada.categoria.padre);
        if (
          listaSeleccionada.categoria.id !==
          listaSeleccionada.categoria.idCategoriaPadre
        ) {
          setSubcategoria(listaSeleccionada.categoria);
        }
      }
    }
  }, []);

  const handleChangeTituloES = (e: any) => {
    setTituloES(e.target.value);
  }
  const handleChangeTituloEU = (e: any) => {
    setTituloEU(e.target.value);
  }

  const getNombreMedicoLogeado = () => {
    return getLoggedUserData().nombre;
  };

  //TODO: Esto es un poco ñapa, se deberia limpiar mediante props/state
  const limpiarListaSeleccionada = () => {
    setTituloES('');
    setTituloEU('');
    setCategoria(null);
    setSubcategoria(null);
    handleSubcategoriaFiltrada(null);
  };

  const guardarLista = (continuar:boolean) => {
    const lista: IListaEnlaces = Object.assign({
      id: props.datosListas.listaSeleccionada
        ? props.datosListas.listaSeleccionada.id
        : undefined,
      nombre: tituloES || tituloEU,
      categoria: categoria
        ? Object.assign(
          {},
          {
            id: subcategoria ? subcategoria.id : categoria.id,
            idCategoriaPadre: categoria.id,
          }
        )
        : null,
      idUsuario: { id: props.datosListas.listaSeleccionada && props.datosListas.listaSeleccionada.idUsuario  
        ? props.datosListas.listaSeleccionada.idUsuario 
        : getLoggedUserData().sub },
      enlaces: Object.assign([], props.datosListas.listaSeleccionada?.enlaces),
      traducciones: [
        {
          id: props.datosListas.listaSeleccionada
            ? props.datosListas.listaSeleccionada.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 1)?.id
            : undefined,
          idEntidad: 2,
          idTabla: props.datosListas.listaSeleccionada
            ? props.datosListas.listaSeleccionada.id
            : undefined,
          idCampo: 1,
          idIdioma: 1,
          texto: tituloES,
        } as ITraduccion,
        {
          id: props.datosListas.listaSeleccionada
            ? props.datosListas.listaSeleccionada.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 1)?.id
            : undefined,
          idEntidad: 2,
          idTabla: props.datosListas.listaSeleccionada
            ? props.datosListas.listaSeleccionada.id
            : undefined,
          idCampo: 1,
          idIdioma: 2,
          texto: tituloEU,
        } as ITraduccion
      ]
    }) as IListaEnlaces;

    if (((tituloES === '' || tituloEU === '') || categoria === null)) {
      setCamposObligatorios(!camposObligatorios);
      setTimeout(function () { setCamposObligatorios(camposObligatorios) }, 5000);
      return;
    }
    
    props.doSendList(lista); 

    if (!continuar) {
      props.doNavigateToListasPage(props.datosListas.navegacion);
    } else {
      limpiarListaSeleccionada();
    setpopupListaCreada(!popupListaCreada);
    setTimeout(function () { setpopupListaCreada(popupListaCreada) }, 3000);
    }

  };


  // botones de idiomas

  const iniciarBoton = () => {
    let codigo = getIdiomas().find(x => x.id == getLoggedUserData().idIdiomaSeleccionado)?.codigo
    return codigo;
  }

  const [botonIdioma, setBotonIdioma] = React.useState<string | undefined>(iniciarBoton());

  const selectIdiomaBoton = (codigo: string) => {
    setBotonIdioma(codigo)
  }

  //Validación

  const errorTituloES = () => {
    return tituloES === undefined || tituloES === ''
  }

  const errorTituloEUS = () => {
    return tituloEU === undefined || tituloEU === ''
  }

  const errorCategoria = () => {
    return categoria === null
  }

  // modal lista caja información creada visible u oculto
  const [popupListaCreada, setpopupListaCreada] = React.useState<boolean>(false);

  // modal campos obligatorios
  const [camposObligatorios, setCamposObligatorios] = React.useState<boolean>(false);

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
    <div className="listaAltaEditar">
      <MenuPrivado />

      <div className="editarEnlace">
        <div className="cajaModificarEnlace">

          {popupListaCreada && (
            <div className="cajaElementoCreado">
              <span className="cerrarInfo">
                <CloseIcon
                  onClick={(e) => {
                    e.preventDefault();
                    setpopupListaCreada(!popupListaCreada)
                  }}
                />
              </span>
              <span className="elementoCreado">
                <span className="checkCreado">
                  <CheckIcon />
                </span>
                <span className="infoCreado">
                  <span className="listoCreado">
                    {altaEditarModalListaCorrecta}
                  </span>
                  {altaEditarModalListaInfo}
                </span>
              </span>
            </div>
          )}

          {camposObligatorios && (
            <div className="cajaInfoError">
              <span className="cerrarError">
                <CloseIcon
                  onClick={(e) => {
                    e.preventDefault();
                    setCamposObligatorios(!camposObligatorios)
                  }}
                />
              </span>
              <span className="errorGuardar">
                <InfoOutlinedIcon />
                <span className="infoErrorGuardar">
                  {altaEditarModalObligatoriedad}
                </span>
              </span>
            </div>
          )}

          <div className="modificarEnlace">
            {props.datosListas.listaSeleccionada &&
              props.datosListas.listaSeleccionada!.id ? (
                <h2>{altaEditarLista}</h2>
              ) : (
                <h2>{altaEditarNuevaLista}</h2>
              )}

            <div className="contenidoModificable">
              <div className="idiomaIncluido">
                <div
                  className={botonIdioma === "ES" ? "tipoIdiomaSelected" : "tipoIdioma"}
                  id="button_ES"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    selectIdiomaBoton("ES")
                  }}
                > ES
                </div>

                <div
                  className={botonIdioma === "EU" ? "tipoIdiomaSelected" : "tipoIdioma"}
                  id="button_EU"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    selectIdiomaBoton("EU")
                  }}
                >
                  EUS
                </div>
              </div>

              {botonIdioma === "ES" ? (
                <div className="textosIdioma" >
                  <span
                    className="tituloIdioma"
                  >
                    <TextField
                      label={altaEditarTituloES}
                      value={tituloES}
                      onChange={handleChangeTituloES}
                      error={errorTituloES()}
                      required
                    />
                  </span>
                </div>
              ) :
                <div className="textosIdioma">
                  <div className="tituloIdioma">
                    <TextField
                      id="tituloEU"
                      label={altaEditarTituloEU}
                      value={tituloEU}
                      onChange={handleChangeTituloEU}
                      error={errorTituloEUS()}
                      required
                    />
                  </div>
                </div>
              }

              <div className="cajaForms">
                <div className="categoriasForm">
                  <Autocomplete
                    id="combo-option1"
                    onChange={(event: any, value: any) => {
                      handleChangeCategoria(value);
                    }}
                    value={categoria}
                    options={getCategorias().filter(
                      (x) => x.id === x.idCategoriaPadre
                    )}
                    getOptionLabel={(categoria) => getCategoriaTranslated(categoria)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={busquedaAvanzadaCategoria}
                        variant="standard"
                        fullWidth
                        error={errorCategoria()}
                        required
                      />

                    )}
                  />
                </div>

                <div className="categoriasForm">
                  <Autocomplete
                    id="combo-option2"
                    value={subcategoria}
                    options={subcategoriasFiltradas || []}
                    onChange={(event: any, value: any) => {
                      handleChangeSubcategoria(value);
                    }}
                    getOptionLabel={(option) => getCategoriaTranslated(option)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={busquedaAvanzadaSubcategoria}
                        variant="standard"
                        fullWidth
                      />
                    )}
                  />
                </div>
              </div>
            </div>


            <div className="cajaMedicoGuardar">
              <div className="nombreMedico">
                <label>{altaEditarMedico} </label>{" "}
                <span className="medicoLogeado">
                  {getNombreMedicoLogeado()}{" "}
                </span>
              </div>

              <div className="botonesEditar">
                <button
                  className="botonVolver"
                  onClick={(e) => {
                    e.preventDefault();

                    props.doNavigateToListasPage(props.datosListas.navegacion);
                  }}
                >
                  {altaEditarVolver}
                </button>

                {props.datosListas.listaSeleccionada &&
                  props.datosListas.listaSeleccionada!.id ? (
                    <button
                      className="botonModificar"
                      onClick={(e) => {
                        e.preventDefault();
                        guardarLista(false);
                      }}
                    >
                      <span>{altaEditarGuardar}</span>
                    </button>
                  ) :
                  (
                    <div>
                      <button
                        className="botonModificar"
                        onClick={(e) => {
                          e.preventDefault();
                          guardarLista(false);
                        }}
                      >
                        <span>{altaEditarCrear}</span>
                      </button>
                      <button
                        className="botonModificar"
                        onClick={(e) => {
                          e.preventDefault();
                          guardarLista(true);
                        }}
                      >
                        <span>{altaEditarCrearContinuar}</span>
                      </button>
                    </div>
                  )
                }

              </div>
            </div>
          </div>
        </div>


      </div>
      <PiePagina/>
    </div>
  );
};


export const ListaAltaEditar = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EditarLista);

export default ListaAltaEditar;
