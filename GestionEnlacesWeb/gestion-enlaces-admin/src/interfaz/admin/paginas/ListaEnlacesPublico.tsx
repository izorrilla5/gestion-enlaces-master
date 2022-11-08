import * as React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "configuracion/store/initial-state";
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";

import { IEnlace } from "../../../dominio/enlace";
import { ITipoEnlace } from "dominio/tipo-enlace";
import { ITag } from "dominio/tag";
import { ICategoria } from "dominio/categoria";
import { IVoto } from "dominio/voto";
import { actualizarDatosVotos } from "../votos/acciones/creators/votos.action.creator";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { useTranslation } from 'react-i18next';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { getCategorias, getTags } from 'infraestructura/auth/app-data-manager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faTimes, faHeart, faQuestion, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle } from '@fortawesome/free-regular-svg-icons'
import Loading from './Loading';


interface ListaEnlacesPúblicoDispatchProps {
  doSendRating(enlace: IEnlace | null, rating: number): any;
  handleSearchTagFromListItem(tag: ITag): any;
  handleSearchCategoriaFromListItem(categoria: ICategoria): any;
  handleSearchSubcategoriaFromListItem(categoria: ICategoria): any;
  handleChangePageFromPagination(currentPage: number): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doSendRating: (enlace: IEnlace | null, rating: number) => {
    if (enlace) {
      dispatch(
        actualizarDatosVotos({ idEnlace: enlace.id, valor: rating } as IVoto)
      );
    }
  },
});

type ListaEnlacesPublicoProps = IEstadoAplicacion &
  ListaEnlacesPúblicoDispatchProps;


export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      paddingLeft: theme.spacing(4),
      paddingTop: theme.spacing(4),
      display: 'flex',
      justifyContent: 'center',
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    paddingBottom: theme.spacing(1)
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme: Theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: theme.spacing(3)
  },
}))(MuiDialogActions);

const _ListaEnlacesPublico = (props: ListaEnlacesPublicoProps) => {

  const { t } = useTranslation();
  const enlacesPublicoPuntua = t("translation:enlacesPublico.puntua");
  const enlacesPublicoPopTitulo = t("translation:enlacesPublico.popTitulo");
  const enlacesPublicoPopEnviar = t("translation:enlacesPublico.popEnviar");
  const enlacesPublicoPopCancelar = t("translation:enlacesPublico.popCancelar");
  const enlacesPublicoSinResultado = t("translation:enlacesPublico.sinResultado");

  const StyledRating = withStyles({
    iconFilled: {
      color: "#EF2E4A",
    },
    iconHover: {
      color: "#ff3d47",
    },
    decimal:{
      padding:"0.07rem"
    }
  })(Rating);

  const [open, setOpen] = React.useState(false);
  const [fullWidth] = React.useState(true);

  const [maxWidth] = React.useState<DialogProps["maxWidth"]>("xs");

  const [enlacePuntuable, setEnlacePuntuable] = React.useState<IEnlace | null>(
    null
  );

  const handleClickOpen = (enlace: IEnlace | null) => {
    if (enlace) {
      setEnlacePuntuable(enlace);
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  function openInNewTab(url: string) {
    url = url.match(/^http[s]?:\/\//) ? url : "http://" + url;
    window.open(url, "_blank");
  }

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

  const labels: { [index: string]: string } = {
    0.5: "1",
    1: "2",
    1.5: "3",
    2: "4",
    2.5: "5",
    3: "6",
    3.5: "7",
    4: "8",
    4.5: "9",
    5: "10",
  };

  const [ratingEnlace, setRatingEnlace] = React.useState<number>(2.5);

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

  //PAGINACIÓN

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

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
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
      <div className="cajaLista">
      {
          props.datosEstadoPromesa.promesaFinalizada ?
            props.datosEnlaces.enlaces.length == 0 ?
              <div className="noResultado">{enlacesPublicoSinResultado}</div> 
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

                <div className="infoEnlacePublico">
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
                                  <div className="nameTag">{getTagTranslated(tag)}</div>
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
                                  <div className="nameTag">{getTagTranslated(tag)}</div>
                                </div>
                              );
                            }
                            return;
                          })
                        : null}
                    </div>
                  </div>
                </div>

                <div className="cajaPuntuacion">
                  <div className="cajaHeart">
                    <div className="nVotos">
                      ({enlace.votos?.length})
                    </div>
                    <StyledRating
                      name="half-rating-read"
                      defaultValue={
                        enlace && enlace.mediaVotos && enlace.mediaVotos
                      }
                      precision={0.5}
                      readOnly
                      icon={<FontAwesomeIcon icon={faHeart} fontSize="inherit" />}
                    />
                    <div className="nRating">
                      {enlace.mediaVotos !== undefined ? (enlace.mediaVotos * 2) % 1 !== 0 ? (enlace.mediaVotos * 2).toFixed(1) : (enlace.mediaVotos * 2) : enlace.mediaVotos}
                    </div>
                  </div>

                  <div className="rating">
                    <span
                      className="puntua"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleClickOpen(enlace);
                      }}
                    >
                      {enlacesPublicoPuntua} <FavoriteBorderIcon className="favorito" />
                    </span>
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

        <Dialog
          onClose={handleClose}
          open={open}
          fullWidth={fullWidth}
          maxWidth={maxWidth}
          aria-labelledby="max-width-dialog-title"
          className="popupRating"
        >
          <DialogTitle id="max-width-dialog-title" onClose={handleClose}>
            {enlacesPublicoPopTitulo}
          </DialogTitle>

          <DialogContent className="corazonesPuntuar">
            <div className="cajaRating">
              <Box component="fieldset" mb={1} borderColor="transparent">
                <StyledRating
                  name="hover-feedback"
                  value={ratingEnlace}
                  defaultValue={2.5}
                  max={5}
                  precision={0.5}
                  onChange={(event, newValue: number) => {
                    setRatingEnlace(newValue);
                  }}
                  icon={<FontAwesomeIcon icon={faHeart} fontSize="inherit" />}
                />
              </Box>

              <div className="valorRating">
                {ratingEnlace !== null && (
                  <Box ml={2}>{labels[ratingEnlace]}</Box>
                )}
              </div>
            </div>
          </DialogContent>
          <DialogActions className="botonesPuntuar">
            <button
              className="confirmacionNo"
              onClick={handleClose}
              color="primary"
            >
              {enlacesPublicoPopCancelar}
            </button>
            <button
              disabled={!ratingEnlace || ratingEnlace == 0}
              className="enviarRating"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClose();
                setRatingEnlace(ratingEnlace);

                props.doSendRating(enlacePuntuable, ratingEnlace);
                setRatingEnlace(2.5);
              }}
            >
              {enlacesPublicoPopEnviar}
            </button>
          </DialogActions>
        </Dialog>

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
      </div>
    </div>
  );
};

export const ListaEnlacesPublico = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ListaEnlacesPublico);

export default ListaEnlacesPublico;
