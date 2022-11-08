import { TextField } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
/* import Autocomplete from "@material-ui/lab/Autocomplete"; */
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import clsx from 'clsx';
import { mapStateToProps } from "configuracion/store/initial-state";
import { IEnlace } from 'dominio/enlace';
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";
import { IListaEnlaces } from 'dominio/lista-enlaces';
import { IRol } from 'dominio/rol';
import { ITipoEnlace } from 'dominio/tipo-enlace';
import { IUsuario } from 'dominio/usuario';
import * as React from "react";
import { useTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { obtenerDatosEnlace, searchLinksUserPage, datosEliminar } from '../enlaces/acciones/creators/enlaces.action.creator';
import { listaEliminar, obtenerDatosLista, searchListUserPage } from '../listas/acciones/creators/listas.action.creator';
import { guardarUsuario, navigateToUsuariosPage } from '../usuarios/acciones/creators/usuarios.action.creator';
import MenuPrivado from "./MenuPrivado";
import { IIdioma } from 'dominio/idioma';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { ITag } from 'dominio/tag';
import { ICategoria } from 'dominio/categoria';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { getIdiomas, getCategorias, getTags, getRoles } from 'infraestructura/auth/app-data-manager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faVolumeUp, faQuestion, faTrash, faLock } from '@fortawesome/free-solid-svg-icons'
import { faPlayCircle, faEdit, faFolder } from '@fortawesome/free-regular-svg-icons'
import dataProvincias from './../../provincias.json'
import PiePagina from './PiePagina';


export interface EditarUsuarioDispatchProps {
    doSendUser(usuario: IUsuario, roles: IRol[]): any;
    doNavigateToUsuariosPage(): any;

    doEliminarEnlace(enlace: IEnlace | null, origenEliminar: number): any;
    doEliminarLista(lista: IListaEnlaces | null, origenEliminar: number): any;
    doNavigateToListaDetail(lista: IListaEnlaces, pantallaOrigen: number): any;
    doNavigateToEnlaceDetail(enlace: IEnlace, pantallaOrigen: number): any;
    doSearchUserLists(lista: IListaEnlaces, page?: number, idIdiomaUsuario?: number): any;
    doSearchUserLinks(enlace: IEnlace, page?: number, idIdiomaUsuario?: number): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    doSendUser: (usuario: IUsuario, roles: IRol[]) => {
        dispatch(guardarUsuario(usuario, roles))
    },
    doNavigateToUsuariosPage: () => {
        dispatch(navigateToUsuariosPage())
    },
    doEliminarEnlace: (enlace: IEnlace | null, origenEliminar: number) => {
        if (enlace) {
            dispatch(datosEliminar(enlace, origenEliminar));
        }
    },
    doEliminarLista: (lista: IListaEnlaces | null, origenEliminar: number) => {
        if (lista) {
            dispatch(listaEliminar(lista, origenEliminar));
        }
    },
    doNavigateToListaDetail: (lista: IListaEnlaces, pantallaOrigen: number) => {
        dispatch(obtenerDatosLista(lista, pantallaOrigen));
    },
    doNavigateToEnlaceDetail: (enlace: IEnlace, pantallaOrigen: number) => {
        dispatch(obtenerDatosEnlace(enlace, pantallaOrigen));
    },
    doSearchUserLists: (lista: IListaEnlaces, page?: number, idIdiomaUsuario?: number) => {
        dispatch(searchListUserPage(lista, page, idIdiomaUsuario));
    },
    doSearchUserLinks: (enlace: IEnlace, page?: number, idIdiomaUsuario?: number) => {
        dispatch(searchLinksUserPage(enlace, page, idIdiomaUsuario));
    }
});

type EditarUsuarioProps = IEstadoAplicacion & EditarUsuarioDispatchProps;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        "& > *": {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(2),
            justifyContent: "center",
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

// consexión estilos

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export interface Provincia {
    id: string;
    nombre: string;
}


const _EditarUsuario = (props: EditarUsuarioProps) => {

    const provincias: Provincia[] = dataProvincias

    //Carga Inicial
    React.useEffect(() => {
        searchUserLists();
        searchUserLinks();
    }, []);

    const { t } = useTranslation();
    const listasPopEliminarTitulo = t("translation:listas.popEliminar.Titulo");
    const listasPopEliminarSi = t("translation:listas.popEliminar.Si");
    const listasPopEliminarNo = t("translation:listas.popEliminar.No");
    const altaEditarUsuario = t("translation:altaEditar.usuario");
    const altaEditarNuevoUsuario = t("translation:altaEditar.nuevoUsuario");
    const altaEditarNombre = t("translation:altaEditar.nombre");
    const altaEditarApellidos = t("translation:altaEditar.apellidos");
    const altaEditarEmail = t("translation:altaEditar.email");
    const altaEditarPassword = t("translation:altaEditar.password");
    const altaEditarPasswordConfirm = t("translation:altaEditar.passwordConfirm");
    const altaEditarRol = t("translation:altaEditar.rol");
    const altaEditarIdioma = t("translation:altaEditar.idioma");
    const altaEditarColegiado = t("translation:altaEditar.colegiado");
    const altaEditarProvincia = t("translation:altaEditar.provincia");
    const altaEditarVolver = t("translation:altaEditar.volver");
    const altaEditarGuardar = t("translation:altaEditar.guardar");
    const altaEditarCrear = t("translation:altaEditar.crear");
    const altaEditarCrearContinuar = t("translation:altaEditar.crearContinuar");
    const usuariosTabEnlaces = t("translation:usuarios.tabEnlaces");
    const usuariosTabListas = t("translation:usuarios.tabListas");
    const listasEnlaces = t("translation:listas.enlaces");
    const altaEditarEnlacesNo = t("translation:altaEditar.enlaces.sinResultado");
    const altaEditarListasNo = t("translation:altaEditar.listas.sinResultado");
    const altaEditarModalUsuarioCorrecto = t("translation:altaEditar.modalUsuario.correcto");
    const altaEditarModalUsuarioInfo = t("translation:altaEditar.modalUsuario.info");
    const altaEditarModalPassConfirm = t("translation:altaEditar.modalPassConfirm");
    const altaEditarModalObligatoriedad = t("translation:altaEditar.modal.obligatoriedad");
    const enlacesPrivadoPopEliminarTitulo = t("translation:enlacesPrivado.popEliminar.titulo");
    const enlacesPrivadoPopEliminarSi = t("translation:enlacesPrivado.popEliminar.si");
    const enlacesPrivadoPopEliminarNo = t("translation:enlacesPrivado.popEliminar.no");


    const [nombre, setNombre] = React.useState<string | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.nombre : '');

    const [apellidos, setApellidos] = React.useState<string | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.apellidos : '');

    const [email, setEmail] = React.useState<string | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.email : '');

    const [username, setUsername] = React.useState<string | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.username : '');

    const [password, setPassword] = React.useState<string | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.pwd : '');

    const [passwordConfirm, setPasswordConfirm] = React.useState<string | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.pwd : '');

    const [rol, setRol] = React.useState<IRol | null | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.rol : null);

    const [idioma, setIdioma] = React.useState<IIdioma | null>(
        props.datosUsuarios.usuarioSeleccionado ? getIdiomas().find(idioma => idioma.id === props.datosUsuarios.usuarioSeleccionado?.idIdiomaSeleccionado) : null
    );
    const [colegiado, setColegiado] = React.useState<string | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.colegiado : '');

    const [provincia, setProvincia] = React.useState<Provincia | null | undefined>(
        props.datosUsuarios.usuarioSeleccionado ? props.datosUsuarios.usuarioSeleccionado.provincia : null);


    const handleChangeNombre = (e: any) => {
        setNombre(e.target.value);
    }

    const handleChangeApellidos = (e: any) => {
        setApellidos(e.target.value);
    }

    const handleChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }

    const handleChangeUsername = (e: any) => {
        setUsername(e.target.value);
    }

    const handleChangePassword = (e: any) => {
        setPassword(e.target.value);
    }

    const handleChangePasswordConfirm = (e: any) => {
        setPasswordConfirm(e.target.value);
    }

    const handleChangeRol = (e: any) => {
        setRol(e);
    }

    const handleChangeIdioma = (e: any) => {
        setIdioma(e);
    }

    const handleChangeColegiado = (e: any) => {
        setColegiado(e.target.value);
    }

    const handleChangeProvincia = (e: any) => {
        setProvincia(e);
    }


    const validacionCamposObligatorios = () => {
        setCamposObligatorios(!camposObligatorios);
        setTimeout(function () { setCamposObligatorios(camposObligatorios) }, 5000);
    }

    const saveUser = (continuar: boolean) => {

        if (password !== passwordConfirm) {
            setModalPass(!modalPass);
            setTimeout(function () { setModalPass(modalPass) }, 5000);
            return;
        }

        if (!props.datosUsuarios.usuarioSeleccionado) {

            if (nombre === '' || apellidos === '' || email === '' || username === '' || password === '' || passwordConfirm === ''
                || rol === undefined || idioma === undefined) {
                validacionCamposObligatorios();
                return;
            }
        } else {

            if (nombre === '' || apellidos === '' || email === '' || username === ''
                || rol === undefined || idioma === undefined) {
                validacionCamposObligatorios();
                return;
            }
        }


        const usuario: IUsuario = Object.assign({
            id: props.datosUsuarios.usuarioSeleccionado
                ? props.datosUsuarios.usuarioSeleccionado.id
                : undefined,
            nombre: nombre,
            apellidos: apellidos,
            username: username,
            email: email,
            pwd: password,
            rol: rol,
            idIdiomaSeleccionado: idioma,
            activo: true,
            colegiado: colegiado,
            provincia: provincia
        }) as IListaEnlaces;

        props.doSendUser(usuario, getRoles());

        if (!continuar) {
            props.doNavigateToUsuariosPage();
        } else {
            limpiarUsuarioSeleccionado();
            setModalUsuarioCreado(!modalUsuarioCreado);
            setTimeout(function () { setModalUsuarioCreado(modalUsuarioCreado) }, 5000);
        }
    };

    // limpiar al crear y continuar 
    const limpiarUsuarioSeleccionado = () => {
        setNombre('');
        setApellidos('');
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');
        setColegiado('');
        setRol(null);
        setIdioma(null);
        setProvincia(null);
    };

    //valor pestañas
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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

    // iconos según el tipo de contenido de enlaces

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

    // ocultar y mostrar contraseña

    const classes = useStyles();
    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });


    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    // tags
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


    // Paginación listas

    let currentPageListasUsuario = 1;

    const handleChangeListasUsuario = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        currentPageListasUsuario = value;
        searchUserLists(currentPageListasUsuario);
    };

    const searchUserLists = (page?: number) => {
        const lista: IListaEnlaces = Object.assign(
            {
                nombre: '',
                usuario: props.datosUsuarios.usuarioSeleccionado
            }
        ) as IListaEnlaces;

        props.doSearchUserLists(lista, page, getLoggedUserData().idIdiomaSeleccionado);
    };

    // Paginación enlaces

    let currentPageEnlacesUsuario = 1;

    const handleChangePageEnlacesUsuario = (
        event: React.ChangeEvent<unknown>,
        value: number
    ) => {
        currentPageEnlacesUsuario = value;
        searchUserLinks(currentPageEnlacesUsuario);
    };

    const searchUserLinks = (page?: number) => {
        const enlace: IEnlace = Object.assign(
            {
                nombre: '',
                tags: [],
                titulo: "",
                url: "",
                usuario: props.datosUsuarios.usuarioSeleccionado
            }
        ) as IEnlace;

        props.doSearchUserLinks(enlace, page, getLoggedUserData().idIdiomaSeleccionado);
    };

    // modal lista caja información creada visible u oculto
    const [modalUsuarioCreado, setModalUsuarioCreado] = React.useState<boolean>(false);

    // modal campos obligatorios
    const [camposObligatorios, setCamposObligatorios] = React.useState<boolean>(false);

    // modal campos obligatorios
    const [modalPass, setModalPass] = React.useState<boolean>(false);

    // validaciones
    const errorNombre = () => {
        return nombre === ''
    }

    const errorApellidos = () => {
        return apellidos === ''
    }

    const errorEmail = () => {
        return email === ''
    }

    const errorUsername = () => {
        return username === ''
    }

    const errorPassword = () => {
        return password === ''
    }

    const errorPasswordConfirm = () => {
        return password === ''
    }

    const errorRol = () => {
        return rol === undefined
    }

    const errorIdioma = () => {
        return idioma === undefined
    }

    // abrir popup eliminar lista 
    const [openListaDialog, setOpenListaDialog] = React.useState(false);

    const [listaAEliminar, setListaAEliminar] = React.useState<IListaEnlaces | null>(
        null
    );

    const handleClickOpenListaDialog = (lista: IListaEnlaces) => {
        setListaAEliminar(lista);
        setOpenListaDialog(true);
    };

    const handleCloseListaDialog = () => {
        setOpenListaDialog(false);
    };

    // abrir popup eliminar enlace 
    const [openDeleteLink, setOpenDeleteLink] = React.useState(false);
    const [enlaceAEliminar, setEnlaceAEliminar] = React.useState<IEnlace | null>(
        null
    );

    const handleClickOpenDeleteLink = (enlace: any) => {
        setEnlaceAEliminar(enlace);
        setOpenDeleteLink(true);
    };

    const handleCloseDeleteLink = () => {
        setOpenDeleteLink(false);
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
        <div className="listaAltaEditar">

            <MenuPrivado />

            <div className="editarUsuario">
                <div className="cajaModificarEnlace">

                    {modalUsuarioCreado && (
                        <div className="cajaElementoCreado">
                            <span className="cerrarInfo">
                                <CloseIcon
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setModalUsuarioCreado(!modalUsuarioCreado)
                                    }}
                                />
                            </span>
                            <span className="elementoCreado">
                                <span className="checkCreado">
                                    <CheckIcon />
                                </span>
                                <span className="infoCreado">
                                    <span className="listoCreado">
                                        {altaEditarModalUsuarioCorrecto}
                                    </span>
                                    {altaEditarModalUsuarioInfo}
                                </span>
                            </span>
                        </div>
                    )}

                    {modalPass && (
                        <div className="cajaInfoError">
                            <span className="cerrarError">
                                <CloseIcon
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setModalPass(!modalPass)
                                    }}
                                />
                            </span>
                            <span className="errorGuardar">
                                <FontAwesomeIcon icon={faLock} />
                                <span className="infoErrorGuardar">
                                    {altaEditarModalPassConfirm}

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
                        {props.datosUsuarios.usuarioSeleccionado &&
                            props.datosUsuarios.usuarioSeleccionado!.id ? (
                                <h2>{altaEditarUsuario}</h2>
                            ) : (
                                <h2>{altaEditarNuevoUsuario}</h2>
                            )}

                        <div className="contenidoModificable">

                            <TextField
                                id="nombre"
                                label={altaEditarNombre}
                                value={nombre}
                                onChange={handleChangeNombre}
                                error={errorNombre()}
                                required
                            />

                            <TextField
                                id="apellidos"
                                label={altaEditarApellidos}
                                value={apellidos}
                                onChange={handleChangeApellidos}
                                error={errorApellidos()}
                                required
                            />

                            <TextField
                                id="username"
                                label="Username"
                                value={username}
                                onChange={handleChangeUsername}
                                error={errorUsername()}
                                required
                            />

                            <TextField
                                id="email"
                                label={altaEditarEmail}
                                value={email}
                                onChange={handleChangeEmail}
                                error={errorEmail()}
                            />

                            <div className="cajaForms">

                                <div className="categoriasForm">

                                    <FormControl className={clsx(classes.margin, classes.textField)} >
                                        <InputLabel
                                            htmlFor="standard-adornment-password"
                                            error={errorPassword()}
                                            required
                                        >
                                            {altaEditarPassword}
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-password"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={handleChangePassword}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            error={errorPassword()}
                                        />
                                    </FormControl>

                                </div>

                                <div className="categoriasForm">

                                    <FormControl className={clsx(classes.margin, classes.textField)} >
                                        <InputLabel
                                            htmlFor="standard-adornment-password"
                                            error={errorPasswordConfirm()}
                                            required
                                        >
                                            {altaEditarPasswordConfirm}
                                        </InputLabel>
                                        <Input
                                            id="standard-adornment-password-confirm"
                                            type={values.showPassword ? 'text' : 'password'}
                                            value={passwordConfirm}
                                            onChange={handleChangePasswordConfirm}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                    >
                                                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            error={errorPassword()}
                                        />
                                    </FormControl>

                                </div>

                            </div>
                            <div className="cajaForms">

                                <div className="categoriasForm">
                                    <Autocomplete
                                        id="combo-option-idioma"
                                        value={idioma}
                                        options={getIdiomas()}
                                        getOptionLabel={idioma => (idioma.nombre != undefined ? idioma.nombre : "")}
                                        onChange={(event: any, value: any) => {
                                            handleChangeIdioma(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={altaEditarIdioma}
                                                variant="standard"
                                                fullWidth
                                                error={errorIdioma()}
                                                required
                                            />
                                        )}
                                    />
                                </div>

                                <div className="categoriasForm">
                                    <Autocomplete
                                        id="combo-option-rol"
                                        value={rol}
                                        options={getRoles()}
                                        getOptionLabel={rol => (rol.nombre != undefined ? rol.nombre : "")}
                                        onChange={(event: any, value: any) => {
                                            handleChangeRol(value);
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={altaEditarRol}
                                                variant="standard"
                                                fullWidth
                                                error={errorRol()}
                                                required
                                            />
                                        )}
                                    />
                                </div>

                            </div>

                            {rol?.id === 2 ?
                                <div className="cajaForms">
                                    <div className="categoriasForm">
                                        <TextField
                                            id="colegiado"
                                            label={altaEditarColegiado}
                                            value={colegiado}
                                            onChange={handleChangeColegiado}
                                        />
                                    </div>

                                    <div className="categoriasForm">
                                        <Autocomplete
                                            id="combo-option-provincia"
                                            value={provincia}
                                            options={(provincias.sort((a, b) => a.nombre.localeCompare(b.nombre)))}
                                            getOptionLabel={provincia => (provincia.nombre)}
                                            onChange={(event: any, value: any) => {
                                                handleChangeProvincia(value);
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label={altaEditarProvincia}
                                                    variant="standard"
                                                    fullWidth
                                                    required
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                                : null
                            }

                        </div>

                        <div className="cajaBotonesEditar">
                            <div className="botonesEditar">
                                {props.datosUsuarios.navegacionPerfil === false ?
                                    <button
                                        className="botonVolver"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.doNavigateToUsuariosPage();
                                        }}
                                    >
                                        <span>{altaEditarVolver}</span>
                                    </button>
                                    : null
                                }
                                {props.datosUsuarios.usuarioSeleccionado &&
                                    props.datosUsuarios.usuarioSeleccionado!.id ? (
                                        <button
                                            className="botonModificar"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                saveUser(false);
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
                                                    saveUser(false);
                                                }}
                                            >
                                                <span>{altaEditarCrear}</span>
                                            </button>
                                            <button
                                                className="botonModificar"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    saveUser(true);
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
            {props.datosUsuarios.usuarioSeleccionado &&
                props.datosUsuarios.usuarioSeleccionado!.id ? (

                    <div className="cajaContenidoUsuario">
                        <Paper className="tabsContenidoUsuario">
                            <div className="menuListas">
                                <Tabs
                                    value={value}
                                    onChange={handleChange}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    className="tabsListas"
                                    TabIndicatorProps={{ style: { height: 3, backgroundColor: "#71c6c6" } }}
                                >
                                    <Tab label={usuariosTabEnlaces} {...a11yProps(0)} />
                                    <Tab label={usuariosTabListas} {...a11yProps(1)} />
                                </Tabs>

                            </div>

                            <TabPanel value={value} index={0}>

                                <div className="ListaEnlaces">
                                    <div className="cajaListaEnlaces">

                                        <List component="nav" aria-label="mailbox folders">
                                            {props.datosEnlaces.enlaces.map((enlace, index) => (
                                                <div key={"en_" + enlace.id}>
                                                    <ListItem
                                                        button
                                                        disableRipple
                                                        disableTouchRipple
                                                        className="organizacionEnlace"
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
                                                                        >
                                                                            {getCategoriaTranslated(enlace.categoria?.padre)}
                                                                        </span>
                                                                        <span
                                                                            className="subcategoria"
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

                                                        <div className="cajaIcono">
                                                            <div className="iconos">

                                                                <div>
                                                                    <FontAwesomeIcon
                                                                        icon={faEdit}
                                                                        className="icono"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            e.preventDefault();
                                                                            props.doNavigateToEnlaceDetail(enlace, 2);
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
                                                                            handleClickOpenDeleteLink(enlace);
                                                                        }}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </ListItem>
                                                    {props.datosEnlaces.enlaces.length - 1 != index ? (
                                                        <Divider variant="inset" component="li" />
                                                    ) : null}

                                                </div>
                                            ))}
                                        </List>
                                        <ListItem>{props.datosEnlaces.enlaces.length == 0 ? <div className="noResultadoUsuario"> {altaEditarEnlacesNo} </div> : null}</ListItem>
                                    </div>
                                </div>

                                <div className="paginacion">
                                    <Pagination
                                        count={props.datosEnlaces.totalPageCount}
                                        page={props.datosEnlaces.currentPage}
                                        onChange={handleChangePageEnlacesUsuario}
                                        size="medium"
                                        showFirstButton
                                        showLastButton
                                    />
                                </div>

                            </TabPanel>

                            <TabPanel value={value} index={1}>

                                <List component="nav" aria-label="mailbox folders">
                                    {props.datosListas.misListas?.map((lista, index) => (
                                        <div key={"li_" + lista.id}>
                                            <ListItem
                                                button
                                                disableRipple
                                                disableTouchRipple
                                                className="organizacionEnlace"
                                            >
                                                <div className="organizacion-sublistas">
                                                    <div className="listElements">

                                                        <div>
                                                            <ListItemAvatar className="carpeta">
                                                                <FontAwesomeIcon icon={faFolder} />
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

                                                                            <span className="categoria">
                                                                                {getCategoriaTranslated(lista.categoria)} |
                                                                                    </span>
                                                                            <span className="subcategoria">
                                                                                {getCategoriaTranslated(lista.categoria?.padre)}
                                                                            </span>

                                                                        </div>
                                                                    </div>
                                                                    <div className="medicoListas">
                                                                        {lista.usuario?.nombre}
                                                                    </div>
                                                                </div>
                                                            </div>



                                                            <div className="cajaIconosLista">
                                                                <div className="iconos">

                                                                    <div>
                                                                        <FontAwesomeIcon
                                                                            icon={faEdit}
                                                                            className="icono"
                                                                            onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                e.preventDefault();
                                                                                props.doNavigateToListaDetail(lista, 2);

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
                                                                                handleClickOpenListaDialog(lista);
                                                                            }}
                                                                        />
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ListItem>

                                            {props.datosListas.misListas.length - 1 != index ? (
                                                <Divider variant="inset" component="li" />
                                            ) : null}
                                        </div>
                                    ))}
                                </List>
                                <ListItem>{props.datosListas.misListas.length == 0 ? <div className="noResultadoUsuario"> {altaEditarListasNo} </div> : null}</ListItem>

                                <div className="paginacion">
                                    <Pagination
                                        count={props.datosListas.totalPageCountMisListas}
                                        page={props.datosListas.currentPageMisListas}
                                        onChange={handleChangeListasUsuario}
                                        size="medium"
                                        showFirstButton
                                        showLastButton
                                    />
                                </div>

                            </TabPanel>

                        </Paper>


                        {/* eliminar lista */}

                        <Dialog
                            className="dialogoEliminar"
                            open={openListaDialog}
                            onClose={handleCloseListaDialog}
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
                                        onClick={handleCloseListaDialog}
                                        color="primary"
                                    >
                                        {listasPopEliminarNo}
                                    </button>
                                    <button
                                        className="confirmacionEliminar"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            handleCloseListaDialog();
                                            props.doEliminarLista(listaAEliminar, 2);
                                        }}
                                        color="primary"
                                        autoFocus
                                    >
                                        {listasPopEliminarSi}
                                    </button>

                                </DialogActions>
                            </div>
                        </Dialog>


                        {/* Eliminar enlace */}
                        <Dialog
                            className="dialogoEliminar"
                            open={openDeleteLink}
                            onClose={handleCloseDeleteLink}
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
                                        onClick={handleCloseDeleteLink}
                                        color="primary"
                                    >
                                        {enlacesPrivadoPopEliminarNo}
                                    </button>

                                    <button
                                        className="confirmacionEliminar"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            props.doEliminarEnlace(enlaceAEliminar, 2);
                                            handleCloseDeleteLink();

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
                ) : null
            }

            <PiePagina />
        </div >

    );
};


export const UsuarioAltaEditar = connect(
    mapStateToProps,
    mapDispatchToProps
)(_EditarUsuario);

export default UsuarioAltaEditar;