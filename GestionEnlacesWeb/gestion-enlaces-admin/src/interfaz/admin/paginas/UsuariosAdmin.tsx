import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { useTranslation } from 'react-i18next';
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import { IUsuario } from 'dominio/usuario';
import { crearNuevoUsuario, obtenerDatosUsuario, usuarioEliminar } from '../usuarios/acciones/creators/usuarios.action.creator';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { IRol } from 'dominio/rol';
import { getRoles } from 'infraestructura/auth/app-data-manager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTrash } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-regular-svg-icons'
import Loading from './Loading';


export interface UsuariosAdminDispatchProps {

    handleChangePageFromPagination(currentPage: number): any;
    doNavigateToNewUserPage(): any;
    doNavigateToUsuarioDetail(usuario: IUsuario, perfilUsuario: boolean): any;
    doEliminarUsuario(usuario: IUsuario | null, roles: IRol[]): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({

    doNavigateToNewUserPage: () => {
        dispatch(crearNuevoUsuario())
    },
    doNavigateToUsuarioDetail: (usuario: IUsuario, perfilUsuario:boolean) => {
        dispatch(obtenerDatosUsuario(usuario, perfilUsuario));
    },
    doEliminarUsuario: (usuario: IUsuario | null, roles: IRol[]) => {
        if (usuario) {
            dispatch(usuarioEliminar(usuario, roles));
        }
    }
});

export type UsuariosAdminProps = IEstadoAplicacion & UsuariosAdminDispatchProps;




const _UsuariosAdmin = (props: UsuariosAdminProps) => {

    const { t } = useTranslation();
    const usuarioNuevo = t("translation:usuarios.nuevo");
    const enlacesPrivadoPopEliminarSi = t("translation:enlacesPrivado.popEliminar.si");
    const enlacesPrivadoPopEliminarNo = t("translation:enlacesPrivado.popEliminar.no");
    const usuarioEliminarTitulo = t("translation:usuario.eliminar.titulo");
    const usuarioSinResultado = t("translation:enlacesPrivado.sinResultado");



    const useStyles = makeStyles((theme) => ({
        root: {
            "& > *": {
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(2),
                justifyContent: "center",
            },
        },
    }));

    const [plusVisible] = React.useState<boolean[]>([]);

    const plusVisiblityInizialization = (changePage?: boolean) => {
        if (plusVisible.length == 0 || changePage) {
            props.datosEnlaces.enlaces.map((enlace, index) => {
                plusVisible[index] = true;
            });
        }
    };
    plusVisiblityInizialization();

    // paginación

    let currentPageUsuarios = 1;

    const handleChangePage = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        currentPageUsuarios = value;
        props.handleChangePageFromPagination(currentPageUsuarios);
        window.scrollTo(0, 0);
    };

    const classes = useStyles();

    // eliminar

    const DialogActions = withStyles((theme) => ({
        root: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1.5),
        },
    }))(MuiDialogActions);

    const [open, setOpen] = React.useState(false);

    const [usuarioAEliminar, setUsuarioAEliminar] = React.useState<IUsuario | null>(
        null
    );

    const handleClickOpen = (usuario: any) => {
        setUsuarioAEliminar(usuario);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let perfilUsuario = false;

    return (
        <div className="usuarios">

            <div className="nuevoUsuario" onClick={(e) => { e.preventDefault(); props.doNavigateToNewUserPage(); }}>
                <span>
                    {usuarioNuevo}
                    <FontAwesomeIcon icon={faUser} />
                </span>
            </div>

            <div className="cajaUsuarios">

                {
                    props.datosEstadoPromesa.promesaFinalizada ?
                        props.datosUsuarios.usuarios.length == 0 ?
                            <div className="noResultado">{usuarioSinResultado}</div>
                            :
                            <List component="nav" aria-label="mailbox folders">

                                {props.datosUsuarios.usuarios.map((usuario, index) => (
                                    <div key={"us_" + usuario.id}>
                                        <ListItem
                                            button
                                            disableRipple
                                            disableTouchRipple
                                            className="organizacionEnlace"
                                        >
                                            <div className="infoUsuarios">
                                                <div className="infoUsuario">

                                                    <div className="cajaUsuarioInfo">
                                                        <div className="identidadUsuario">
                                                            <div className="nombreUsuario">{usuario.nombre}</div>
                                                            <div className="apellidoUsuario">{usuario.apellidos}</div>
                                                        </div>

                                                        <div className="featUsuario">
                                                            <div className="emailUsuario">
                                                                {usuario.username}
                                                            </div>

                                                            <div className="rolUsuario">
                                                                {usuario.rol?.nombre}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="iconosUsuario">
                                                        <div className="iconos">
                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={faEdit}
                                                                    className="icono"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        props.doNavigateToUsuarioDetail(usuario, perfilUsuario);
                                                                    }}
                                                                />
                                                            </div>

                                                            <div>
                                                                <FontAwesomeIcon
                                                                    icon={faTrash}
                                                                    className="icono"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        e.preventDefault();
                                                                        handleClickOpen(usuario);
                                                                    }}
                                                                />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </ListItem>

                                        <div className="dividerUsuario">
                                            {props.datosUsuarios.usuarios.length - 1 != index ? (
                                                <Divider variant="inset" component="li" />
                                            ) : null}

                                        </div>

                                    </div>
                                ))}
                            </List>

                        :
                        <Loading />
                }


                {/* PAGINACIÓN */}

                <div className={classes.root}>
                    <Pagination
                        count={props.datosUsuarios.totalPageCountUsuarios}
                        page={props.datosUsuarios.currentPageUsuarios}
                        onChange={handleChangePage}
                        size="medium"
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
                            {usuarioEliminarTitulo}
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
                                    props.doEliminarUsuario(usuarioAEliminar, getRoles());
                                }}
                                color="primary"
                                autoFocus
                            >
                                {enlacesPrivadoPopEliminarSi}
                            </button>

                        </DialogActions>
                    </div>
                </Dialog>

            </div>
        </div>
    );
}


export const UsuariosAdmin = connect(
    mapStateToProps,
    mapDispatchToProps
)(_UsuariosAdmin);

export default UsuariosAdmin;