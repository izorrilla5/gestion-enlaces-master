import * as React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { mapStateToProps } from 'configuracion/store/initial-state';
import MenuPrivado from './MenuPrivado';
import { guardarEnlace, mainPage } from '../enlaces/acciones/creators/enlaces.action.creator';
import { ICategoria } from 'dominio/categoria';
import { IEnlace } from 'dominio/enlace';
import { ITag } from 'dominio/tag';
import { ITipoEnlace } from 'dominio/tipo-enlace';
import { TextField } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ITraduccion } from 'dominio/traduccion';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { getIdiomas, getCategorias, getTipos, getTags } from 'infraestructura/auth/app-data-manager';
import PiePagina from './PiePagina';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />


interface EditarEnlaceDispatchProps {
  doSendLink(enlace: IEnlace): any;
  doNavigateToPrivatePage(navegacion: number | undefined): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doSendLink: (enlace: IEnlace) => {
    dispatch(guardarEnlace(enlace))
  },

  doNavigateToPrivatePage: (navegacion: number | undefined) => {
    if (navegacion) {
      dispatch(mainPage(navegacion))
    }
  },

});


type EditarEnlaceProps = IEstadoAplicacion & EditarEnlaceDispatchProps;


const _EditarEnlace = (props: EditarEnlaceProps) => {

  const { t } = useTranslation();
  const busquedaAvanzadaCategoria = t("translation:busquedaAvanzada.categoria");
  const busquedaAvanzadaSubcategoria = t("translation:busquedaAvanzada.subcategoria");
  const busquedaAvanzadaTipo = t("translation:busquedaAvanzada.tipo");
  const busquedaAvanzadaTags = t("translation:busquedaAvanzada.tags");
  const altaEditarEnlace = t("translation:altaEditar.enlace");
  const altaEditarNuevoEnlace = t("translation:altaEditar.nuevoEnlace");
  const altaEditarTituloES = t("translation:altaEditar.titulo.ES");
  const altaEditarUrlES = t("translation:altaEditar.url.ES");
  const altaEditarTituloEU = t("translation:altaEditar.titulo.EU");
  const altaEditarUrlEU = t("translation:altaEditar.url.EU");
  const altaEditarMedico = t("translation:altaEditar.medico");
  const altaEditarVolver = t("translation:altaEditar.volver");
  const altaEditarGuardar = t("translation:altaEditar.guardar");
  const altaEditarCrearContinuar = t("translation:altaEditar.crearContinuar");
  const altaEditarCrear = t("translation:altaEditar.crear");
  const altaEditarModalEnlaceCorrecto = t("translation:altaEditar.modalEnlace.correcto");
  const altaEditarModalEnlaceInfo = t("translation:altaEditar.modalEnlace.info");
  const altaEditarModalEnlaceObligatorio = t("translation:altaEditar.modal.obligatoriedad");


  //const [idEnlace, setIdEnlace] = React.useState<number | undefined>(props.datosEnlaces.enlaceSeleccionado ? props.datosEnlaces.enlaceSeleccionado.id : undefined);

  const [tituloES, setTituloES] = React.useState<string | undefined>(
    props.datosEnlaces.enlaceSeleccionado && props.datosEnlaces.enlaceSeleccionado.traducciones && props.datosEnlaces.enlaceSeleccionado.traducciones.length > 0
    && props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 2) ? 
    props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 2)?.texto : 
    '');
  const [tituloEU, setTituloEU] = React.useState<string | undefined>(
    props.datosEnlaces.enlaceSeleccionado && props.datosEnlaces.enlaceSeleccionado.traducciones && props.datosEnlaces.enlaceSeleccionado.traducciones.length > 0 
    && props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 2) ? 
    props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 2)?.texto 
    : '');

  const [urlES, setUrlES] = React.useState<string | undefined>(
    props.datosEnlaces.enlaceSeleccionado && props.datosEnlaces.enlaceSeleccionado.traducciones && props.datosEnlaces.enlaceSeleccionado.traducciones.length > 0   
    && props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 3) ? 
    props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 3)?.texto 
    : '');
  const [urlEU, setUrlEU] = React.useState<string | undefined>(
    props.datosEnlaces.enlaceSeleccionado && props.datosEnlaces.enlaceSeleccionado.traducciones && props.datosEnlaces.enlaceSeleccionado.traducciones.length > 0   
    && props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 3) ? 
    props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 3)?.texto 
    : '');

  const [categoria, setCategoria] = React.useState<ICategoria | null>(null);

  const [subcategoria, setSubcategoria] = React.useState<ICategoria | null>(null);

  const handleChangeSubcategoria = (e: any) => {
    setSubcategoria(e);
  }

  const handleSubcategoriaFiltrada = (catSelect: ICategoria | null): void => {
    const subcatsFiltradas = catSelect
      ? getCategorias().filter((x: { id: number; idCategoriaPadre: number; }) => x.id !== catSelect.id && x.idCategoriaPadre === catSelect.id)
      : null;
    setSubcategoriasFiltradas(subcatsFiltradas);
  }

  const handleChangeCategoria = (e: any) => {
    setCategoria(e);
    setSubcategoria(null);
    handleSubcategoriaFiltrada(e);
  }

  const [subcategoriasFiltradas, setSubcategoriasFiltradas] = React.useState<ICategoria[] | null>(null);

  const [tipo, setTipo] = React.useState<ITipoEnlace | null>(props.datosEnlaces.enlaceSeleccionado != undefined && props.datosEnlaces.enlaceSeleccionado.tipo != undefined ? props.datosEnlaces.enlaceSeleccionado.tipo : null);

  const [tags, setTags] = React.useState<ITag[] | undefined>(props.datosEnlaces.enlaceSeleccionado ? props.datosEnlaces.enlaceSeleccionado.tags : undefined);


  React.useEffect(() => {
    const enlaceSeleccionado = props.datosEnlaces.enlaceSeleccionado;
    if (enlaceSeleccionado) {
      /*setIdEnlace(enlaceSeleccionado.id);
      setTitulo(enlaceSeleccionado.titulo);
      setUrl(enlaceSeleccionado.url);*/

      if (enlaceSeleccionado.categoria) {
        setCategoria(enlaceSeleccionado.categoria.padre);
        handleSubcategoriaFiltrada(enlaceSeleccionado.categoria.padre);
        if (enlaceSeleccionado.categoria.id !== enlaceSeleccionado.categoria.idCategoriaPadre) {
          setSubcategoria(enlaceSeleccionado.categoria);
        }
      }

      /*
      if (enlaceSeleccionado.tipo){
        setTipo(enlaceSeleccionado.tipo);
      }
      if (enlaceSeleccionado.tags){
        handleChangeTags(undefined,enlaceSeleccionado.tags);
      }*/
    }

  }, []);


  const handleChangeTituloES = (e: any) => {
    setTituloES(e.target.value);
  }

  const handleChangeTituloEU = (e: any) => {
    setTituloEU(e.target.value);
  }

  const handleChangeUrlES = (e: any) => {
    setUrlES(e.target.value);
  }
  const handleChangeUrlEU = (e: any) => {
    setUrlEU(e.target.value);
  }
  const handleChangeTipo = (e: any) => {
    setTipo(e);
  }

  const handleChangeTags = (a: any, t: ITag[]) => {
    /*
        const arrayABorrar = _.filter(
          _.uniq(
            _.map(t, function (item) {
              if (_.filter(t, { id: item.id }).length > 1) {
                return item;
              }
        
              return false;
            })),
          function (value) { return value; });
    
        _.remove(t, tCurrent => arrayABorrar.includes(tCurrent))*/
    setTags(t);
  }

  const getNombreMedicoLogeado = () => {
    return getLoggedUserData().nombre;
  };


  //TODO: Esto es un poco ñapa, se deberia limpiar mediante props/state
  const limpiarListaSeleccionada = () => {
    setTituloES('');
    setTituloEU('');
    setUrlES('');
    setUrlEU('');
    setCategoria(null);
    setSubcategoria(null);
    handleSubcategoriaFiltrada(null);
    setTipo(null);
    setTags([]);
  };

  const saveEnlace = (continuar: boolean) => {
    const enlace: IEnlace = Object.assign({}, {
      id: props.datosEnlaces.enlaceSeleccionado
        ? props.datosEnlaces.enlaceSeleccionado.id
        : undefined,
      titulo: tituloES || tituloEU,
      url: urlES || urlEU,
      categoria: categoria ? Object.assign(
        {
          id: subcategoria ? subcategoria.id : categoria.id,
          idCategoriaPadre: categoria.id
        }
      ) : null,
      tipo: tipo,
      tags: !tags || tags.length === 0 ? null : tags,
      usuario: { id: props.datosEnlaces.enlaceSeleccionado && props.datosEnlaces.enlaceSeleccionado.idUsuario  
                  ? props.datosEnlaces.enlaceSeleccionado.idUsuario 
                  : getLoggedUserData().sub },
      traducciones: [{
        id: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 2)?.id
          : undefined,
        idEntidad: 1,
        idTabla: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.id
          : undefined,
        idCampo: 2,
        idIdioma: 1,
        texto: tituloES,
      } as ITraduccion,
      {
        id: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 2)?.id
          : undefined,
        idEntidad: 1,
        idTabla: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.id
          : undefined,
        idCampo: 2,
        idIdioma: 2,
        texto: tituloEU,
      } as ITraduccion,
      {
        id: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 1 && x.idCampo == 3)?.id
          : undefined,
        idEntidad: 1,
        idTabla: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.id
          : '',
        idCampo: 3,
        idIdioma: 1,
        texto: urlES,
      } as ITraduccion,
      {
        id: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.traducciones?.find(x => x.idIdioma == 2 && x.idCampo == 3)?.id
          : undefined,
        idEntidad: 1,
        idTabla: props.datosEnlaces.enlaceSeleccionado
          ? props.datosEnlaces.enlaceSeleccionado.id
          : undefined,
        idCampo: 3,
        idIdioma: 2,
        texto: urlEU,
      } as ITraduccion]
    }) as IEnlace;


    if (((tituloES === undefined || tituloES === '') && (tituloEU === undefined || tituloEU  === '')) 
      || ((urlEU === undefined || urlEU  === '') && (urlES === undefined || urlES === ''))
      || (((tituloES === undefined || tituloES === '') && (urlES === undefined || urlES === ''))
        && ((tituloEU === undefined || tituloEU === '') && (urlEU === undefined || urlEU === '')))
      || categoria === null || tipo === null) {

      setCamposObligatorios(!camposObligatorios);
      setTimeout(function () { setCamposObligatorios(camposObligatorios) }, 5000);
      return;
    }

    props.doSendLink(enlace);

    if (!continuar) {
      props.doNavigateToPrivatePage(props.datosEnlaces.navegacion);
    } else {
      limpiarListaSeleccionada();
      setPopupEnlaceCreado(!popupEnlaceCreado);
      setTimeout(function () { setPopupEnlaceCreado(popupEnlaceCreado) }, 3000);
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

  // Validaciones

  const errorTituloES = () => {
    return tituloES === undefined || tituloES === ''
  }

  const errorTituloEUS = () => {
    return tituloEU === undefined || tituloEU === ''
  }

  const errorUrlES = () => {
    return urlES === undefined || urlES === ''
  }

  const errorUrlEUS = () => {
    return urlEU === undefined || urlEU === ''
  }

  const errorCategoria = () => {
    return categoria === null
  }

  const errorTipo = () => {
    return tipo === null
  }

  // modal caja información lista creada visible u oculto
  const [popupEnlaceCreado, setPopupEnlaceCreado] = React.useState<boolean>(false);

  // modal campos obligatorios
  const [camposObligatorios, setCamposObligatorios] = React.useState<boolean>(false);


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
  const getTipoTranslated = (tipo: ITipoEnlace | null) => {

    const idIdiomaSelec = getLoggedUserData().idIdiomaSeleccionado;
    if (tipo) {
      const tipoCompleto = getTipos().find(y => y.id === tipo.id);
      if (tipoCompleto && tipoCompleto.traducciones) {
        const tipoTraduccion = tipoCompleto.traducciones?.find(z => z.idCampo === 1 && z.idIdioma === idIdiomaSelec);
        if (tipoTraduccion) {
          return tipoTraduccion.texto;
        }
      }
    }

    return '';
  };

  return (

    <div className="enlacesAltaEditar">

      <MenuPrivado />

      <div className="editarEnlace" >

        <div className="cajaModificarEnlace">

          {popupEnlaceCreado && (
            <div className="cajaElementoCreado">
              <span className="cerrarInfo">
                <CloseIcon
                  onClick={(e) => {
                    e.preventDefault();
                    setPopupEnlaceCreado(!popupEnlaceCreado)
                  }}
                />
              </span>
              <span className="elementoCreado">
                <span className="checkCreado">
                  <CheckIcon />
                </span>
                <span className="infoCreado">
                  <span className="listoCreado">
                    {altaEditarModalEnlaceCorrecto}
                  </span>
                  {altaEditarModalEnlaceInfo}
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
                  {altaEditarModalEnlaceObligatorio}
                </span>
              </span>
            </div>
          )}

          <div className="modificarEnlace">

            {props.datosEnlaces.enlaceSeleccionado &&
              props.datosEnlaces.enlaceSeleccionado!.id ?
              <h2>{altaEditarEnlace}</h2> : <h2>{altaEditarNuevoEnlace}</h2>
            }


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

                  <div className="otrosIdioma">
                    <TextField
                      id="urlES"
                      label={altaEditarUrlES}
                      value={urlES}
                      onChange={handleChangeUrlES}
                      error={errorUrlES()}
                      required
                    />
                  </div>
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
                  <div className="otrosIdioma">
                    <TextField
                      id="urlEU"
                      label={altaEditarUrlEU}
                      value={urlEU}
                      onChange={handleChangeUrlEU}
                      error={errorUrlEUS()}
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
                    options={getCategorias().filter(x => x.id === x.idCategoriaPadre)}
                    getOptionLabel={categoria => getCategoriaTranslated(categoria)}
                    renderInput={params => (
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
                {getCategorias().length == 0 ? <div className="noResultado"> Este campo es obligatorio </div> : null}
                <div className="categoriasForm">
                  <Autocomplete
                    id="combo-option2"
                    value={subcategoria}
                    options={subcategoriasFiltradas || []}
                    onChange={(event: any, value: any) => {
                      handleChangeSubcategoria(value);
                    }}
                    getOptionLabel={option => getCategoriaTranslated(option)}

                    renderInput={params => (
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

              <div className="cajaForms">

                <div className="categoriasForm">
                  <Autocomplete
                    id="combo-option3"
                    value={tipo}
                    options={getTipos()}
                    getOptionLabel={tipo => getTipoTranslated(tipo)}
                    onChange={(event: any, value: any) => {
                      handleChangeTipo(value);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        style={{ backgroundColor: "white", color: "white" }}
                        label={busquedaAvanzadaTipo}
                        variant="standard"
                        error={errorTipo()}
                        fullWidth
                        required
                      />
                    )}
                  />
                </div>

                <div className="tagsForm">
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    value={tags || undefined}
                    options={getTags()}
                    disableCloseOnSelect
                    getOptionLabel={tag => getTagTranslated(tag)}
                    onChange={handleChangeTags}
                    getOptionSelected={(option, tag) => {
                      return (option.id === tag.id);
                    }}

                    renderOption={(tag, { selected }) =>
                      (
                        <React.Fragment>
                          <Checkbox
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 2, color: '#71C6C6' }}
                            checked={selected}
                          /*checked={_.find(tags, selectedTag => selectedTag.id == tag.id) != undefined}*/
                          />
                          {tag.nombre}
                        </React.Fragment>
                      )}

                    renderInput={params => (
                      <TextField
                        {...params}
                        variant="standard"
                        label={busquedaAvanzadaTags}
                        fullWidth
                      />
                    )}
                  />
                </div>

              </div >

            </div>

            <div className="cajaMedicoGuardar">

              <div className="nombreMedico">
                <label>{altaEditarMedico} </label> <span className="medicoLogeado"> {getNombreMedicoLogeado()} </span>
              </div>

              <div className="botonesEditar">

                <button
                  className="botonVolver"
                  onClick={(e) => {
                    e.preventDefault();

                    props.doNavigateToPrivatePage(props.datosEnlaces.navegacion);
                  }}
                > {altaEditarVolver}
                </button>

                {props.datosEnlaces.enlaceSeleccionado &&
                  props.datosEnlaces.enlaceSeleccionado!.id ?
                  (<button
                    className="botonModificar"
                    onClick={(e) => {
                      e.preventDefault();
                      saveEnlace(false);
                    }}
                  >
                    <span>{altaEditarGuardar}</span>
                  </button>
                  )
                  :
                  (
                    <div>
                      <button
                        className="botonModificar"
                        onClick={(e) => {
                          e.preventDefault();
                          saveEnlace(false);
                        }}
                      >
                        <span>{altaEditarCrear}</span>
                      </button>
                      <button
                        className="botonModificar"
                        onClick={(e) => {
                          e.preventDefault();
                          saveEnlace(true);
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
}


export const EnlacesAltaEditar = connect(
  mapStateToProps,
  mapDispatchToProps
)(_EditarEnlace);

export default EnlacesAltaEditar;
