import { mapStateToProps } from "configuracion/store/initial-state";
import { IEnlace } from "dominio/enlace";
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";
import * as React from "react";
import { connect } from "react-redux";
import {
  datosEliminar,
  obtenerDatosEnlace,
  guardarEnlace,
  crearNuevoEnlace,
  search,
} from "../enlaces/acciones/creators/enlaces.action.creator";
import { ITipoEnlace } from "dominio/tipo-enlace";
import { useTranslation } from 'react-i18next';
import { IListaEnlaces } from 'dominio/lista-enlaces';
import { ICategoria } from "dominio/categoria";
import { ITag } from "dominio/tag";

import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
/* import Toc from '@material-ui/icons/Toc'; */

import { searchListUser, searchMyListPopUp } from "../listas/acciones/creators/listas.action.creator";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";

import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";

import { Checkbox } from '@material-ui/core';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { getCategorias, getTags } from 'infraestructura/auth/app-data-manager';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faVolumeUp, faQuestion, faTrash, faListUl, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faEdit, faCircle } from '@fortawesome/free-regular-svg-icons'
import Loading from './Loading'

export interface ListaEnlacesPrivadosDispatchProps {
  doNavigateToEnlaceDetail(enlace: IEnlace, pantallaOrigen: number): any;
  doEliminarEnlace(enlace: IEnlace | null, origenEliminar: number): any;

  loadInitalData: () => void;

  doAddElement(enlace: IEnlace | null): any;

  handleSearchTagFromListItem(tag: ITag): any;
  handleSearchCategoriaFromListItem(categoria: ICategoria): any;
  handleSearchSubcategoriaFromListItem(categoria: ICategoria): any;
  handleChangePageFromPagination(currentPage: number): any;

  doSearchMyList(lista: IListaEnlaces, page?: number): any;
  doNavigateToNuevoEnlace(): any;

  loadIdioma: (idIdiomaUsuario?: number) => void;
}


const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doNavigateToEnlaceDetail: (enlace: IEnlace, pantallaOrigen: number) => {
    dispatch(obtenerDatosEnlace(enlace, pantallaOrigen));
  },
  doEliminarEnlace: (enlace: IEnlace | null, origenEliminar: number) => {
    if (enlace) {
      dispatch(datosEliminar(enlace, origenEliminar));
    }
  },

  doSearchMyList: (lista: IListaEnlaces, page?: number) => {
    dispatch(searchMyListPopUp(lista, page, getLoggedUserData().idIdiomaSeleccionado));
  },

  loadInitalData: () => {
    dispatch(searchListUser({ nombre: "" }));
  },
  doAddElement: (enlace: IEnlace | null) => {
    if (enlace) {
      dispatch(guardarEnlace(enlace));
    }
  },
  doNavigateToNuevoEnlace: () => {
    dispatch(crearNuevoEnlace({ titulo: '', url: '', votos: [], tags: [] }, 1))
  },
  loadIdioma: (idIdiomaUsuario?: number) => {
    dispatch(search({ titulo: "", url: "", categoria: undefined, votos: [], tags: [] }, 1, idIdiomaUsuario));
  },
});

function openInNewTab(url: string) {
  url = url.match(/^http[s]?:\/\//) ? url : "http://" + url;
  window.open(url, "_blank");
}

export type ListaEnlacesPrivadosProps = IEstadoAplicacion &
  ListaEnlacesPrivadosDispatchProps;

const _ListaEnlacesPrivado = (props: ListaEnlacesPrivadosProps) => {

  const { t } = useTranslation();
  const enlacesPrivadoPopEliminarTitulo = t("translation:enlacesPrivado.popEliminar.titulo");
  const enlacesPrivadoPopEliminarSi = t("translation:enlacesPrivado.popEliminar.si");
  const enlacesPrivadoPopEliminarNo = t("translation:enlacesPrivado.popEliminar.no");
  const enlacesPrivadoPopAddTitulo = t("translation:enlacesPrivado.popAdd.titulo");
  const enlacesPrivadoPopAddGuardar = t("translation:enlacesPrivado.popAdd.guardar");
  const enlacesPrivadoPopAddSalir = t("translation:enlacesPrivado.popAdd.salir");
  const enlacesPrivadoPopAddSinResultado = t("translation:enlacesPrivado.popAdd.sinResultado");
  const enlacesPrivadoSinResultado = t("translation:enlacesPrivado.sinResultado");
  const enlacesPrivadoNuevo = t("translation:enlacesPrivado.nuevo");

  //const PAGE_SIZE = 10;

  //const [currentPage, setCurrentPage] = React.useState<number>(1);


  const [open, setOpen] = React.useState(false);

  const [enlaceAEliminar, setEnlaceAEliminar] = React.useState<IEnlace | null>(
    null
  );

  const [selectedListas, setSelectedListas] = React.useState<IListaEnlaces[]>([]);

  let currentPage = 1;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    currentPage = value;
    props.handleChangePageFromPagination(currentPage);
    window.scrollTo(0, 0);
    plusVisiblityInizialization(true);
  };


  let currentPageMisListas = 1;

  const handleChangePersonalPage = (
    event: React.ChangeEvent<unknown>,
    values: number
  ) => {
    currentPageMisListas = values;
    searchMyLists(currentPageMisListas);
  };

  const searchMyLists = (page?: number) => {
    const lista: IListaEnlaces = Object.assign(
      {
        nombre: '',
        usuario: getLoggedUserData(),
      }
    ) as IListaEnlaces;

    props.doSearchMyList(lista, page);
  };


  const handleClickOpen = (enlace: any) => {
    setEnlaceAEliminar(enlace);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [elementAdded, setElementAdded] = React.useState<IEnlace | null>(null);

  const abrirListas = (enlace: IEnlace) => {
    setElementAdded(enlace);
    let copiaSelectedListasInit = JSON.parse(
      JSON.stringify(enlace.listas || [])
    );
    setSelectedListas(copiaSelectedListasInit);
    setAbrir(true);
    searchMyLists(currentPageMisListas);
  };

  const cerrarListas = () => {
    setSelectedListas([]);
    setAbrir(false);
  };

  //cargar listas
  React.useEffect(() => {
    props.loadInitalData();
  }, []);

  // cargar idioma
  React.useEffect(() => {
    props.loadIdioma(getLoggedUserData().idIdiomaSeleccionado);
  }, []);


  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    let copiaLista = JSON.parse(
      JSON.stringify(props.datosListas.misListas[index])
    );
    let copiaSelectedListas = JSON.parse(
      JSON.stringify(selectedListas)
    );
    const indexFound = copiaSelectedListas.findIndex(elem => elem.id === copiaLista.id);
    if (indexFound != -1) {
      copiaSelectedListas.splice(indexFound, 1);
    } else {
      copiaSelectedListas.push(copiaLista);
    }

    setSelectedListas(copiaSelectedListas);
  };

  const userCanDeleteAndCanEdit = (idUsuarioEnlace: number | undefined) => {
    return (
      getLoggedUserData().sub === idUsuarioEnlace || getLoggedUserData().rol.id === 3
    );
  };

  const iconosTipo = (tipo: ITipoEnlace | undefined) => {
    if (tipo == undefined) {
      return <FontAwesomeIcon icon={faQuestion} />;
    } else {
      if (tipo.id == 1) {
        return <FontAwesomeIcon icon={faGlobe} />;
      } else if (tipo.id == 2) {
        return <FontAwesomeIcon icon={faPlayCircle} />;
      } else if (tipo.id == 3) {
        return <FontAwesomeIcon icon={faVolumeUp} />;
      }
    }
    return;
  };


  const DialogActions = withStyles((theme) => ({
    root: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1.5),
    },
  }))(MuiDialogActions);

  const [abrir, setAbrir] = React.useState(false);

  const [plusVisible, setPlusVisible] = React.useState<boolean[]>([]);

  const plusVisibilityChangeState = (index: number) => {
    let arrayAuxiliar: boolean[] = Object.assign([], plusVisible);
    arrayAuxiliar[index] = !arrayAuxiliar[index];
    setPlusVisible(arrayAuxiliar);
  };

  const plusVisiblityInizialization = (changePage?: boolean) => {
    if (plusVisible.length == 0 || changePage) {
      props.datosEnlaces.enlaces.map((enlace, index) => {
        plusVisible[index] = true;
      });
    }
  };
  plusVisiblityInizialization();

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
        justifyContent: "center",
      },
    },
  }));

  const classes = useStyles();


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

  const getCategoriaTranslated = (categoria: ICategoria | undefined) => {

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
    <div className="ListaEnlaces">
      <div className="nuevoEnlace" onClick={(e) => { e.preventDefault(); props.doNavigateToNuevoEnlace(); }}>
        <span>
          {enlacesPrivadoNuevo}
        </span>
      </div>

      <div className="cajaListaEnlaces">
        {
          props.datosEstadoPromesa.promesaFinalizada ?
            props.datosEnlaces.enlaces.length == 0 ?
              <div className="noResultado">{enlacesPrivadoSinResultado}</div>
              :
              <List component="nav" aria-label="mailbox folders">
                {props.datosEnlaces.enlaces.map((enlace, index) => (
                  <div key={"en_" + enlace.id}>
                    <ListItem
                      button
                      disableRipple
                      disableTouchRipple
                      className="organizacionEnlace"
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        openInNewTab(enlace.url);
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar>{iconosTipo(enlace.tipo)}</Avatar>
                      </ListItemAvatar>

                      <div className="infoEnlace">
                        <div className="titleName"> {enlace.titulo} </div>
                        <div className="categorias">
                          <div className="boxCategoria">
                            <div className="nameCategoria">
                              <span
                                className="categoria"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  if (enlace.categoria?.padre) {
                                    props.handleSearchCategoriaFromListItem(
                                      enlace.categoria?.padre
                                    );
                                  }
                                }}
                              >
                                {getCategoriaTranslated(enlace.categoria?.padre)}
                              </span>
                              <span
                                className="subcategoria"
                                onClick={(event) => {
                                  event.stopPropagation();
                                  if (
                                    enlace.categoria &&
                                    enlace.categoria?.id !==
                                    enlace.categoria?.padre.id
                                  ) {
                                    props.handleSearchSubcategoriaFromListItem(
                                      enlace.categoria
                                    );
                                  }
                                }}
                              >
                                {enlace.categoria?.id === enlace.categoria?.padre.id
                                  ? ""
                                  : " | " + getCategoriaTranslated(enlace.categoria)}
                              </span>
                            </div>
                          </div>

                          <div className="boxTag">
                            {enlace.tags && enlace.tags.length > 0
                              ? [...enlace.tags]
                                .sort(function (a, b) {
                                  return a.nombre.localeCompare(b.nombre);
                                })
                                .map((tag, index) => {
                                  if (index <= 2) {
                                    return (
                                      <div
                                        className="boxCategoria"
                                        key={"en_" + tag.id}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          props.handleSearchTagFromListItem(tag);
                                        }}
                                      >
                                        <div className="nameTag">
                                          {getTagTranslated(tag)}
                                        </div>
                                      </div>
                                    );
                                  }
                                  return;
                                })
                              : null}

                            {enlace.tags != undefined &&
                              enlace.tags.length > 3 &&
                              plusVisible[index] ? (
                                <div
                                  className="boxCategoria"
                                  key={"three_dots_" + enlace.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    plusVisibilityChangeState(index);
                                  }}
                                >
                                  <h5 className="nameTag">. . .</h5>
                                </div>
                              ) : null}

                            {enlace.tags != undefined &&
                              enlace.tags.length > 3 &&
                              plusVisible[index] == false
                              ? [...enlace.tags]
                                .sort(function (a, b) {
                                  return a.nombre.localeCompare(b.nombre);
                                })
                                .map((tag, i) => {
                                  if (i >= 3) {
                                    return (
                                      <div
                                        className="boxCategoria"
                                        key={"en_" + tag.id}
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          props.handleSearchTagFromListItem(tag);
                                        }}
                                      >
                                        <div className="nameTag">{tag.nombre}</div>
                                      </div>
                                    );
                                  }
                                  return;
                                })
                              : null}
                          </div>
                        </div>
                      </div>

                      <div className="cajaIcono">
                        <div className="iconos">
                          <div>
                            <FontAwesomeIcon
                              icon={faListUl}
                              className="icono"
                              onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                abrirListas(enlace);
                              }}
                            />
                          </div>
                          {userCanDeleteAndCanEdit(enlace.idUsuario) ? (
                            <div>
                              <FontAwesomeIcon
                                icon={faEdit}
                                className="icono"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  props.doNavigateToEnlaceDetail(enlace, 1);
                                }}
                              />
                            </div>
                          ) : null}
                          {userCanDeleteAndCanEdit(enlace.idUsuario) ? (
                            <div>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="icono"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  handleClickOpen(enlace);
                                }}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </ListItem>
                    {props.datosEnlaces.enlaces.length - 1 != index ? (
                      <Divider variant="inset" component="li" />
                    ) : null}
                  </div>
                ))}
              </List>
            :
            <Loading />

        }

        {/* PAGINACIÓN */}

        <div className={classes.root}>
          <Pagination
            count={props.datosEnlaces.totalPageCount}
            page={props.datosEnlaces.currentPage}
            onChange={handleChangePage}
            size="medium"
            showFirstButton
            showLastButton
          />
        </div>


        {/* ELIMINAR */}

        <Dialog
          className="dialogoEliminar"
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <div className="popupEliminar">
            <DialogContentText id="alert-dialog-description">
              {enlacesPrivadoPopEliminarTitulo}
            </DialogContentText>

            <DialogActions>
              <button
                className="confirmacionNo"
                onClick={handleClose}
                color="primary"
              >
                {enlacesPrivadoPopEliminarNo}
              </button>
              <button
                className="confirmacionEliminar"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleClose();
                  props.doEliminarEnlace(enlaceAEliminar, 1);
                }}
                color="primary"
                autoFocus
              >
                {enlacesPrivadoPopEliminarSi}
              </button>

            </DialogActions>
          </div>
        </Dialog>


        {/* POP UP LISTAS */}

        <Dialog
          open={abrir}
          keepMounted
          onClose={cerrarListas}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className="abrirListas"
        >
          <div className="popupListas">
            <DialogTitle id="alert-dialog-slide-title">
              {enlacesPrivadoPopAddTitulo}
            </DialogTitle>

            <List component="nav" aria-label="mailbox folders">
              {props.datosListas.misListas.map((lista, index) => (
                <div key={"en_" + lista.id}>
                  <ListItem
                    selected={
                      selectedListas.some(
                        (e) => e.id === lista.id
                      )}
                    button
                    disableRipple
                    disableTouchRipple
                    className="organizacionEnlace"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleListItemClick(event, index);
                    }}
                  >
                    <div className="organizacion-sublistas">
                      <div className="listElements">
                        <div className="infoAddLink">

                          <div className="titleName"> {lista.nombre} </div>
                          <div className="nEnlaces">
                            {lista.enlaces?.length} enlaces
                            </div>
                          <div className="categoriaListas">
                            <div className="categoriasListas">
                              <span className="categoria">
                                {lista.categoria?.nombre} |
                              </span>
                              <span className="subcategoria">
                                {lista.categoria?.padre.nombre}
                              </span>
                            </div>

                          </div>
                        </div>
                        <Checkbox
                          edge="start"
                          checked={
                            selectedListas.some(
                              (e) => e.id === lista.id
                            )}
                          tabIndex={-1}
                          disableRipple
                          disableFocusRipple
                          disableTouchRipple
                          icon={<FontAwesomeIcon icon={faCircle} />}
                          checkedIcon={<FontAwesomeIcon icon={faCheckCircle} />}
                          className="checkboxListas"
                        />
                      </div>
                    </div>
                  </ListItem>

                  {props.datosListas.misListas.length - 1 != index ? (
                    <Divider variant="inset" component="li" />
                  ) : null}
                </div>
              ))}
            </List>
            <ListItem>{props.datosListas.misListas.length == 0 ? <div className="noResultadoPop"> {enlacesPrivadoPopAddSinResultado}</div> : null}</ListItem>
          </div>

          <div className={classes.root}>
            <Pagination
              count={props.datosListas.totalPageCountMisListas}
              page={props.datosListas.currentPageMisListas}
              onChange={handleChangePersonalPage}
              size="small"
              showFirstButton
              showLastButton
            />
          </div>

          <DialogActions>

            <button
              className="confirmacionNo"
              onClick={cerrarListas}
              color="primary"
            >
              {enlacesPrivadoPopAddSalir}
            </button>

            <button
              className="guardarEnlaceLista"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                cerrarListas();

                let copiaSelectedListas = JSON.parse(
                  JSON.stringify(selectedListas)
                );
                let copiaEnlace = JSON.parse(
                  JSON.stringify(elementAdded)
                );
                copiaEnlace?.listas?.splice(0, copiaEnlace?.listas?.length);
                copiaEnlace?.listas?.push(...copiaSelectedListas);
                setElementAdded(copiaEnlace);
                props.doAddElement(copiaEnlace);
              }}
              color="primary"
            >
              {enlacesPrivadoPopAddGuardar}
            </button>

          </DialogActions>

        </Dialog>
      </div>
    </div>
  );
};

export const ListaEnlacesPrivado = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ListaEnlacesPrivado);

export default ListaEnlacesPrivado;
