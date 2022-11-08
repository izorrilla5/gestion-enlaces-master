import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Pagination from "@material-ui/lab/Pagination";
import { mapStateToProps } from "configuracion/store/initial-state";
import { ICategoria } from 'dominio/categoria';
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";
import { IListaEnlaces } from "dominio/lista-enlaces";
import { ITipoEnlace } from "dominio/tipo-enlace";
import * as React from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { clonarLista, crearNuevaLista, guardarLista, listaEliminar, obtenerDatosLista } from "../listas/acciones/creators/listas.action.creator";
import { IEnlace } from 'dominio/enlace';
import { ITag } from 'dominio/tag';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { getCategorias, getTags } from 'infraestructura/auth/app-data-manager';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faVolumeUp, faQuestion, faTrash, faAlignJustify } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faEdit, faFolderOpen, faFolder, faCopy } from '@fortawesome/free-regular-svg-icons'
import Loading from './Loading';
import { ITraduccion } from 'dominio/traduccion';



export interface ListasCarpetasDispatchProps {
  doEliminarLista(lista: IListaEnlaces | null, pantallaOrigen: number): any;
  doNavigateToListaDetail(lista: IListaEnlaces, pantallaOrigen: number): any;
  doNavigateToNewList(pantallaOrigen: number): any;

  handleChangePageFromPagination(currentPage: number): any;
  handleChangePersonalPageFromPagination(currentPage: number): any;
  handleSearchCategoriaFromListItem(categoria: ICategoria): any;
  handleSearchSubcategoriaFromListItem(categoria: ICategoria): any;

  doCloneList(lista: IListaEnlaces): any;

  doEliminarEnlaceLista(lista: IListaEnlaces): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doEliminarLista: (lista: IListaEnlaces | null, pantallaOrigen: number) => {
    if (lista) {
      dispatch(listaEliminar(lista, pantallaOrigen));
    }
  },
  doNavigateToListaDetail: (lista: IListaEnlaces, pantallaOrigen: number) => {
    dispatch(obtenerDatosLista(lista, pantallaOrigen));
  },
  doNavigateToNewList: (pantallaOrigen: number) => {
    dispatch(crearNuevaLista({ nombre: "", enlaces: [] }, pantallaOrigen));
  },
  doCloneList: (lista: IListaEnlaces) => {
    let listaClonada = Object.assign({}, lista, { id: undefined });
    let traduccionesClon: ITraduccion[] = [];
    listaClonada.traducciones?.forEach(element => {
      let traduccionClon = Object.assign({}, element, { id: undefined });
      traduccionesClon.push(traduccionClon);
    });
    listaClonada.traducciones = traduccionesClon;
    listaClonada.idUsuario = getLoggedUserData().sub;
    dispatch(clonarLista(listaClonada));
  },
  doEliminarEnlaceLista: (lista: IListaEnlaces) => {
    dispatch(guardarLista(lista))
  }

});

export type ListasCarpetasProps = IEstadoAplicacion & ListasCarpetasDispatchProps;

// pestañas Mis Listas y Listas

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// estilo para la paginación
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(3),
      justifyContent: "center",
    },
  },

}));

// los enlaces se abren en una nueva pestaña
function openInNewTab(url: string) {
  url = url.match(/^http[s]?:\/\//) ? url : "http://" + url;
  window.open(url, "_blank");
}

const _ListasCarpetas = (props: ListasCarpetasProps) => {

  //traducciones de la página
  const { t } = useTranslation();
  const EnlaceDelistaPopEliminarTitulo = t("translation:listas.quitarEnlace.popEliminar.Titulo");
  const listasNueva = t("translation:listas.nueva");
  const listasTabPersonal = t("translation:listas.tabPersonal");
  const listasTabGeneral = t("translation:listas.tabGeneral");
  const listasEnlaces = t("translation:listas.enlaces");
  const listasPopEliminarTitulo = t("translation:listas.popEliminar.Titulo");
  const listasPopEliminarSi = t("translation:listas.popEliminar.Si");
  const listasPopEliminarNo = t("translation:listas.popEliminar.No");
  const listasSinResultado = t("translation:listas.sinResultado");


  //valor pestañas
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    plusVisiblityInizialization(newValue);
    setValue(newValue);
  };

  // solo el usuario que ha creado una lista puede modificarla
  const userCanDeleteAndCanEdit = (idUsuarioEnlace: number | undefined) => {
    return (
      getLoggedUserData().sub === idUsuarioEnlace || getLoggedUserData().rol.id === 3
    );
  };

  // dependiendo del tipo de enlace se pondrá un icono que lo identifique
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

  // consexión estilos
  const classes = useStyles();

  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);



  // abrir popup de eliminar lista
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (lista: any) => {
    setlistaEliminar(lista);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Eliminar lista
  const [listaEliminar, setlistaEliminar,] = React.useState<IListaEnlaces | null>(null);


  // abrir popup eliminar enlace lista
  const [openDeleteLink, setOpenDeleteLink] = React.useState(false);

  const handleClickOpenDeleteLink = (enlace: any, lista: any) => {
    setEnlaceAEliminarLista(enlace);
    setListaSeleccionada(lista);
    setOpenDeleteLink(true);
  };

  const handleCloseDeleteLink = () => {
    setEnlaceAEliminarLista(null);
    setListaSeleccionada(null);
    setOpenDeleteLink(false);
  };

  // Eliminar enlace de lista
  const [enlaceAEliminarLista, setEnlaceAEliminarLista] = React.useState<IEnlace | null>(null);
  const [listaSeleccionada, setListaSeleccionada] = React.useState<IListaEnlaces | null>(null);

  const enlaceListaEliminar = () => {
    let copiaListaSeleccionada = JSON.parse(
      JSON.stringify(listaSeleccionada)
    );
    let copiaEnlaceAEliminarLista = JSON.parse(
      JSON.stringify(enlaceAEliminarLista)
    );

    if (copiaEnlaceAEliminarLista != null) {
      const indiceEnlaceAEliminar = copiaListaSeleccionada?.enlaces?.findIndex(enlace => enlace.id == copiaEnlaceAEliminarLista.id);
      if (indiceEnlaceAEliminar != undefined) {
        copiaListaSeleccionada?.enlaces?.splice(indiceEnlaceAEliminar, 1)
      }

      props.doEliminarEnlaceLista(copiaListaSeleccionada);
    }
  }


  // Ocultar o esconder los enlaces de cada lista 

  const [plusVisible, setPlusVisible] = React.useState<boolean[]>
    ([true,true,true,true,true,true,true,true,true,true]);

  const plusVisibilityChangeState = (index: number) => {
    let arrayAuxiliar: boolean[] = Object.assign([], plusVisible);
    arrayAuxiliar[index] = !arrayAuxiliar[index];
    setPlusVisible(arrayAuxiliar);
  };

  const plusVisiblityInizialization = (tabIndex: number, firstTime?:boolean) => {
    if (!firstTime){
      setPlusVisible([]);
      let plusVisibleAux : boolean[] = [];
      if (tabIndex == 0) {
        props.datosListas.misListas.map((lista, index) => {
          plusVisibleAux[index] = true;
        });
      }
      else {
        props.datosListas.listas.map((lista, index) => {
          plusVisibleAux[index] = true;
        });
      }
      setPlusVisible(plusVisibleAux);
    }
  };

  React.useEffect(() => {
    plusVisiblityInizialization(0, true);
  }, []);


  /*
  const [setMostrarListaItems, listaEnlaces] = React.useState<boolean>(false);
  const [setMostrarListaItems, listaEnlaces] = React.useState<boolean[]>([]);

  const enlacesListaVisibles= (index: number) => {
    let arrayAuxiliar:boolean[] = Object.assign([],  listaEnlaces);
    arrayAuxiliar = !arrayAuxiliar;
    setMostrarListaItems(arrayAuxiliar)
  }  */

  //paginación general
  let currentPageListas = 1;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    currentPageListas = value;
    console.log("currentPageListas", currentPageListas);
    props.handleChangePageFromPagination(currentPageListas);
    window.scrollTo(0, 0);
  };

  //paginación personal
  let currentPageMisListas = 1;

  const handleChangePersonalPage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    currentPageMisListas = value;
    console.log("currentPageMisListas", currentPageMisListas);
    props.handleChangePersonalPageFromPagination(currentPageMisListas);
    window.scrollTo(0, 0);
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
    <div className="listas">
      <Paper className="cajaTabs">
        <div className="menuListas">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            className="tabsListas"
            TabIndicatorProps={{ style: { height: 3, backgroundColor: "#71c6c6" } }}
          >
            <Tab label={listasTabPersonal} {...a11yProps(0)} />
            <Tab label={listasTabGeneral} {...a11yProps(1)} />
          </Tabs>
          <div className="nuevaLista">
            <span
              onClick={(e) => {
                e.preventDefault();
                props.doNavigateToNewList(1);
              }}
            >
              {listasNueva}
            </span>
            <FontAwesomeIcon icon={faAlignJustify} />
          </div>
        </div>

        <TabPanel value={value} index={0}>
          {
            props.datosEstadoPromesa.promesaFinalizada ?
              props.datosListas.misListas.length == 0 ?
                <div className="noResultado">{listasSinResultado}</div>
                :
                <List component="nav" aria-label="mailbox folders">
                  {props.datosListas.misListas
                    .map((lista, index) => (
                      <div key={"en_" + lista.id}>
                        <ListItem
                          button
                          disableRipple
                          disableTouchRipple
                          className="organizacionEnlace"
                          onClick={(event) => {
                            if (lista.enlaces != undefined && lista.enlaces?.length > 0) {
                              event.preventDefault();
                              event.stopPropagation();
                              plusVisibilityChangeState(index);
                            }
                          }}
                        >
                          <div className="organizacion-sublistas">
                            <div className="listElements">

                              <div hidden={lista != undefined && !plusVisible[index]}>
                                <ListItemAvatar className="carpeta">
                                  <FontAwesomeIcon icon={faFolder} />
                                </ListItemAvatar>
                              </div>
                              <div hidden={lista != undefined && plusVisible[index]}>
                                <ListItemAvatar className="carpeta">
                                  <FontAwesomeIcon icon={faFolderOpen} />
                                </ListItemAvatar>
                              </div>

                              <div className="orgInfoListas">
                                <div className="infoListas">
                                  <div className="titleName"> {lista.nombre} </div>
                                  <div className="nEnlaces">
                                    {lista.enlaces?.length} {listasEnlaces}
                                  </div>
                                  <div className="medico-categoria">

                                    <div className="categoriaListas">
                                      <div className="nameCategoria">

                                        <span
                                          className="categoria"
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            if (lista.categoria?.padre) {
                                              props.handleSearchCategoriaFromListItem(
                                                lista.categoria?.padre
                                              );
                                            }
                                          }}
                                        >
                                          {getCategoriaTranslated(lista.categoria?.padre)}
                                        </span>

                                        <span
                                          className="subcategoria"
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            if (
                                              lista.categoria &&
                                              lista.categoria?.id !==
                                              lista.categoria?.padre.id
                                            ) {
                                              props.handleSearchSubcategoriaFromListItem(
                                                lista.categoria
                                              );
                                            }
                                          }}
                                        >
                                          {lista.categoria?.id === lista.categoria?.padre.id
                                            ? ""
                                            : " | " + getCategoriaTranslated(lista.categoria)}
                                        </span>

                                      </div>
                                    </div>
                                    <div className="medicoListas">
                                      {lista.usuario?.nombre + " " + lista.usuario?.apellidos}
                                    </div>
                                  </div>
                                </div>



                                <div className="cajaIconosLista">
                                  <div className="iconos">
                                    {userCanDeleteAndCanEdit(lista.idUsuario) ? (
                                      <div>
                                        <FontAwesomeIcon
                                          icon={faEdit}
                                          className="icono"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            props.doNavigateToListaDetail(lista, 1);

                                          }}
                                        />
                                      </div>
                                    ) : null}

                                    {userCanDeleteAndCanEdit(lista.idUsuario) ? (
                                      <div>
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          className="icono"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleClickOpen(lista);
                                          }}
                                        />
                                      </div>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {lista != undefined && plusVisible[index] == false ? (
                              <List component="nav" aria-label="mailbox folders">
                                {lista.enlaces?.map((enlace, index) => (
                                  <div key={"en_" + enlace.id}>
                                    <div className="caja-enlacesLista">
                                      <div className="organizacion-enlacesLista">
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
                                            <div className="titleName">
                                              {enlace.titulo}
                                            </div>
                                            <div className="categorias">
                                              <div className="boxCategoria">
                                                <div className="nameCategoria">
                                                  <span
                                                    className="categoria"
                                                    onClick={(event) => {
                                                      event.stopPropagation();
                                                      Object.assign(
                                                        props.datosEnlaces
                                                          .enlaceBusqueda!,
                                                        {
                                                          categoria:
                                                            enlace.categoria?.padre,
                                                        }
                                                      );
                                                    }}
                                                  >
                                                    {enlace.categoria?.padre.nombre}
                                                  </span>
                                                  <span className="subcategoria">
                                                    {enlace.categoria?.id ===
                                                      enlace.categoria?.padre.id
                                                      ? ""
                                                      : " | " +
                                                      enlace.categoria?.nombre}
                                                  </span>
                                                </div>
                                              </div>
                                              <div className="boxTag">
                                                {enlace.tags && enlace.tags.length > 0
                                                  ? [...enlace.tags]
                                                    .sort(function (a, b) {
                                                      return a.nombre.localeCompare(
                                                        b.nombre
                                                      );
                                                    })
                                                    .map((tag, index) => {
                                                      if (index <= 2) {
                                                        return (
                                                          <div
                                                            className="boxCategoria"
                                                            key={"en_" + tag.id}
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
                                                        plusVisibilityChangeState(
                                                          index
                                                        );
                                                      }}
                                                    >
                                                      <h5 className="nameTag">. . .</h5>
                                                    </div>
                                                  ) : null}

                                                {enlace.tags != undefined &&
                                                  enlace.tags.length > 3 &&
                                                  plusVisible[index] &&
                                                  plusVisible[index] == false
                                                  ? [...enlace.tags]
                                                    .sort(function (a, b) {
                                                      return a.nombre.localeCompare(
                                                        b.nombre
                                                      );
                                                    })
                                                    .map((tag, i) => {
                                                      if (i >= 3) {
                                                        return (
                                                          <div
                                                            className="boxCategoria"
                                                            key={"en_" + tag.id}
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
                                              </div>
                                            </div>
                                          </div>

                                          <div className="cajaIcono">
                                            <div className="iconos">
                                              {userCanDeleteAndCanEdit(lista.idUsuario) ? (
                                                <div>
                                                  <FontAwesomeIcon
                                                    icon={faTrash}
                                                    className="icono"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      e.preventDefault();
                                                      handleClickOpenDeleteLink(enlace, lista);
                                                    }}
                                                  />
                                                </div>
                                              ) : null}
                                            </div>
                                          </div>
                                        </ListItem>
                                        {lista.enlaces != undefined && lista.enlaces?.length - 1 != index ? (
                                          <Divider variant="inset" component="li" />
                                        ) : null}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </List>
                            ) : null}
                          </div>
                        </ListItem>

                        {props.datosListas.misListas.length - 1 != index ? (
                          <Divider variant="inset" component="li" />
                        ) : null}
                      </div>
                    ))}
                </List>
              :
              <Loading />

          }

          <div className={classes.root}>
            <Pagination
              count={props.datosListas.totalPageCountMisListas}
              page={props.datosListas.currentPageMisListas}
              onChange={handleChangePersonalPage}
              size="medium"
              showFirstButton
              showLastButton
            />
          </div>
        </TabPanel>

        <TabPanel value={value} index={1}>

          {
            props.datosEstadoPromesa.promesaFinalizada ?
              props.datosListas.listas.length == 0 ?
                <div className="noResultado">{listasSinResultado}</div>
                :
                <List component="nav" aria-label="mailbox folders">
                  {props.datosListas.listas.map((lista, index) => (
                    <div key={"en_" + lista.id}>
                      <ListItem
                        button
                        disableRipple
                        disableTouchRipple
                        className="organizacionEnlace"
                        onClick={(event) => {
                          console.log("dentro item");
                          event.preventDefault();
                          event.stopPropagation();
                          plusVisibilityChangeState(index);
                        }}
                      >
                        <div className="organizacion-sublistas">
                          <div className="listElements">

                            <div hidden={!plusVisible[index]}>
                              <ListItemAvatar className="carpeta">
                                <FontAwesomeIcon icon={faFolder} />
                              </ListItemAvatar>
                            </div>
                            <div hidden={plusVisible[index]}>
                              <ListItemAvatar className="carpeta">
                                <FontAwesomeIcon icon={faFolderOpen} />
                              </ListItemAvatar>
                            </div>

                            <div className="orgInfoListas">
                              <div className="infoListas">
                                <div className="titleName"> {lista.nombre} </div>
                                <div className="nEnlaces">
                                  {lista.enlaces?.length} {listasEnlaces}
                                </div>
                                <div className="medico-categoria">

                                  <div className="categoriaListas">
                                    <div className="nameCategoria">

                                      <span
                                        className="categoria"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          if (lista.categoria?.padre) {
                                            props.handleSearchCategoriaFromListItem(
                                              lista.categoria?.padre
                                            );
                                          }
                                        }}
                                      >
                                        {getCategoriaTranslated(lista.categoria?.padre)}
                                      </span>

                                      <span
                                        className="subcategoria"
                                        onClick={(event) => {
                                          event.stopPropagation();
                                          if (
                                            lista.categoria &&
                                            lista.categoria?.id !==
                                            lista.categoria?.padre.id
                                          ) {
                                            props.handleSearchSubcategoriaFromListItem(
                                              lista.categoria
                                            );
                                          }
                                        }}
                                      >
                                        {lista.categoria?.id === lista.categoria?.padre.id
                                          ? ""
                                          : " | " + getCategoriaTranslated(lista.categoria)}
                                      </span>

                                    </div>
                                  </div>
                                  <div className="medicoListas">
                                    {lista.usuario?.nombre + " " + lista.usuario?.apellidos}
                                  </div>
                                </div>
                              </div>

                              <div className="cajaIconosLista">
                                <div className="iconos">
                                  <div>
                                    <FontAwesomeIcon
                                      icon={faCopy}
                                      className="icono"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        props.doCloneList(lista);
                                      }}
                                    />
                                  </div>
                                  {userCanDeleteAndCanEdit(lista.idUsuario) ? (
                                    <div>
                                      <FontAwesomeIcon
                                        icon={faEdit}
                                        className="icono"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          props.doNavigateToListaDetail(lista, 1);
                                        }}
                                      />
                                    </div>
                                  ) : null}

                                  {userCanDeleteAndCanEdit(lista.idUsuario) ? (
                                    <div>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        className="icono"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          e.preventDefault();
                                          handleClickOpen(lista);
                                        }}
                                      />
                                    </div>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>

                          {lista != undefined && plusVisible[index] == false ? (
                            <List component="nav" aria-label="mailbox folders">
                              {lista.enlaces?.map((enlace, index) => (
                                <div key={"en_" + enlace.id}>
                                  <div className="caja-enlacesLista">
                                    <div className="organizacion-enlacesLista">
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
                                          <div className="titleName">
                                            {enlace.titulo}
                                          </div>
                                          <div className="categorias">
                                            <div className="boxCategoria">
                                              <div className="nameCategoria">
                                                <span
                                                  className="categoria"
                                                  onClick={(event) => {
                                                    event.stopPropagation();
                                                    Object.assign(
                                                      props.datosEnlaces
                                                        .enlaceBusqueda!,
                                                      {
                                                        categoria:
                                                          enlace.categoria?.padre,
                                                      }
                                                    );
                                                  }}
                                                >
                                                  {getCategoriaTranslated(lista.categoria?.padre)}{" "}
                                                </span>
                                                <span className="subcategoria">
                                                  {enlace.categoria?.id ===
                                                    enlace.categoria?.padre.id
                                                    ? ""
                                                    : " | " + getCategoriaTranslated(lista.categoria)
                                                  }
                                                </span>
                                              </div>
                                            </div>
                                            <div className="boxTag">
                                              {enlace.tags && enlace.tags.length > 0
                                                ? [...enlace.tags]
                                                  .sort(function (a, b) {
                                                    return a.nombre.localeCompare(
                                                      b.nombre
                                                    );
                                                  })
                                                  .map((tag, index) => {
                                                    if (index <= 2) {
                                                      return (
                                                        <div
                                                          className="boxCategoria"
                                                          key={"en_" + tag.id}
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
                                                plusVisible[index] &&
                                                plusVisible[index] == false
                                                ? [...enlace.tags]
                                                  .sort(function (a, b) {
                                                    return a.nombre.localeCompare(
                                                      b.nombre
                                                    );
                                                  })
                                                  .map((tag, i) => {
                                                    if (i >= 3) {
                                                      return (
                                                        <div
                                                          className="boxCategoria"
                                                          key={"en_" + tag.id}
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
                                            </div>
                                          </div>
                                        </div>

                                        <div className="cajaIcono">
                                          <div className="iconos">
                                            {userCanDeleteAndCanEdit(lista.idUsuario) ? (
                                              <div>
                                                <FontAwesomeIcon
                                                  icon={faTrash}
                                                  className="icono"
                                                  onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    handleClickOpenDeleteLink(enlace, lista);
                                                  }}
                                                />
                                              </div>
                                            ) : null}

                                          </div>
                                        </div>
                                      </ListItem>
                                      {lista.enlaces != undefined && lista.enlaces?.length - 1 !=
                                        index ? (
                                          <Divider variant="inset" component="li" />
                                        ) : null}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </List>
                          ) : null}
                        </div>
                      </ListItem>

                      {props.datosListas.listas.length - 1 != index ? (
                        <Divider variant="inset" component="li" />
                      ) : null}
                    </div>
                  ))}
                </List>
              :
              <Loading />
          }


          <div className={classes.root}>
            <Pagination
              count={props.datosListas.totalPageCountListas}
              page={props.datosListas.currentPageListas}
              onChange={handleChangePage}
              size="medium"
              showFirstButton
              showLastButton
            />
          </div>
        </TabPanel>
      </Paper>

      {/* Eliminar listas  */}
      <Dialog
        className="dialogoEliminar"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="popupEliminar">
          <DialogContentText id="alert-dialog-description">
            {listasPopEliminarTitulo}
          </DialogContentText>

          <DialogActions>
            <button
              className="confirmacionNo"
              onClick={handleClose}
              color="primary"
            >
              {listasPopEliminarNo}
            </button>

            <button
              className="confirmacionEliminar"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClose();
                props.doEliminarLista(listaEliminar, 1);
              }}
              color="primary"
              autoFocus
            >
              {listasPopEliminarSi}
            </button>

          </DialogActions>
        </div>
      </Dialog>

      {/* Eliminar enlace de lista */}
      <Dialog
        className="dialogoEliminar"
        open={openDeleteLink}
        onClose={handleCloseDeleteLink}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="popupEliminar">
          <DialogContentText id="alert-dialog-description">
            {EnlaceDelistaPopEliminarTitulo}
          </DialogContentText>

          <DialogActions>
            <button
              className="confirmacionNo"
              onClick={handleCloseDeleteLink}
              color="primary"
            >
              {listasPopEliminarNo}
            </button>

            <button
              className="confirmacionEliminar"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                enlaceListaEliminar();
                handleCloseDeleteLink();

              }}
              color="primary"
              autoFocus
            >
              {listasPopEliminarSi}
            </button>

          </DialogActions>
        </div>
      </Dialog>

    </div>


  );
};

export const ListasCarpetas = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ListasCarpetas);

export default ListasCarpetas;
