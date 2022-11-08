import * as React from "react";
import { connect } from "react-redux";
import { mapStateToProps } from "configuracion/store/initial-state";
import { IEstadoAplicacion } from "dominio/estado/estado-aplicacion";
import { useTranslation } from "react-i18next";
import UsuariosAdmin from './UsuariosAdmin';
import { searchUser } from '../usuarios/acciones/creators/usuarios.action.creator';
import { IUsuario } from 'dominio/usuario';

import { Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Brightness1OutlinedIcon from '@material-ui/icons/Brightness1Outlined';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { IRol } from 'dominio/rol';
import { getRoles } from 'infraestructura/auth/app-data-manager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch, faMinus } from '@fortawesome/free-solid-svg-icons'


export interface BusquedaUsuarios_DispatchProps {

    doSearchUser: (usuario: IUsuario, page?: number, rolBusqueda?: IRol[]) => any;

}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({

    doSearchUser: (usuario: IUsuario, page?: number, rolBusqueda?: IRol[]) => {
        dispatch(searchUser(usuario, page, rolBusqueda));
    },

});

type BusquedaUsuariosProps = IEstadoAplicacion & BusquedaUsuarios_DispatchProps;


const _BusquedaUsuarios = (props: BusquedaUsuariosProps) => {

    //Configuracion i18n
    const { t } = useTranslation();
    const busquedaAvanzadaSimple = t("translation:busquedaAvanzada.simple");
    const busquedaAvanzadaTitulo = t("translation:busquedaAvanzada.titulo");
    const busquedaAvanzadaEliminar = t("translation:busquedaAvanzada.eliminar");
    const busquedaAvanzadaBuscar = t("translation:busquedaAvanzada.buscar");
    const usuariosFiltrar = t("translation:usuarios.filtrar");

    //Carga inicial de los datos
    React.useEffect(() => {
        searchUser();
    }, []);

    const searchUser = (nombreLive?: string, page?: number) => {

        console.log('rolesCheckeados:', JSON.stringify(rolBusqueda))

        const usuario: IUsuario = Object.assign(
            {
                nombre: nombreLive ? nombreLive : tituloBusqueda,
                /*rol: rolBusqueda != undefined ? rolBusqueda[0] : []*/
            }
        ) as IUsuario;

        props.doSearchUser(usuario, page, rolBusqueda);
    };

    //Búsqueda simple
    const [tituloBusqueda, setTituloBusqueda] = React.useState<string | undefined>
        (
            props.datosUsuarios.usuarios != undefined &&
                props.datosUsuarios.usuarioBusqueda?.nombre != undefined
                ? props.datosUsuarios.usuarioBusqueda?.nombre
                : undefined
        );

    const handleChangeTitulo = (e: any) => {
        setTituloBusqueda(e.target.value);
        searchUser(e.target.value);
    };

    // Ocultar y desvelar avanzada

    const [busquedaVisible, setBusquedaVisible] = React.useState<boolean>(false);

    // Búsqueda avanzada

    const [rolBusqueda, setRolBusqueda] = React.useState<IRol[]>(
        props.datosRol != undefined && props.datosUsuarios.rolesBusqueda != undefined && props.datosUsuarios.rolesBusqueda.length > 0 ? props.datosUsuarios.rolesBusqueda : getRoles()
    );

    const handleChangeRol = (idRolParam: number) => {

        //Hacer una copia del array de roles de props.datosRoles
        let copiaArrayRoles = JSON.parse(
            JSON.stringify(rolBusqueda)
        );

        //Buscar en la copia del array el rolParam y meterlo o quirarlo según se encuentre en el array
        const rolSeleccionadoIndex = copiaArrayRoles.findIndex(rol => rol.id == idRolParam)

        //Si el rolParam no está en el array, lo añadimos al array --> push
        //Si el rolParam está en el array, lo quitamos del array --> splice

        if (rolSeleccionadoIndex == -1) {
            const copia = Object.assign({}, getRoles().find(x => x.id == idRolParam));
            copiaArrayRoles.push(copia);
        } else {
            copiaArrayRoles.splice(rolSeleccionadoIndex, 1)
        }

        //Con la copia array modificada, se mete al setRolBusqueda
        setRolBusqueda(copiaArrayRoles);
        console.log(copiaArrayRoles)
    };

    //Limpiar los campos
    const [limpiarBusqueda, setLimpiarBusqueda] = React.useState<boolean>(false);


    React.useEffect(() => {
        if (limpiarBusqueda) {
            searchUser("");
            setLimpiarBusqueda(false);
        }
    }, [limpiarBusqueda]);


    const searchChangePage = (page: number) => {
        searchUser(undefined, page);
    };

    const clearSearchUsuario = () => {
        setTituloBusqueda("");
        setRolBusqueda(getRoles());
        setLimpiarBusqueda(true);
    }

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
                                searchUser();
                            }
                        }}
                    />
                    <a
                        onClick={(e) => {
                            e.preventDefault();
                            searchUser();
                        }}
                        href="#"
                    >
                        <FontAwesomeIcon icon={faSearch} className="lupa" />
                    </a>
                </form>
            </div>

            <div className="avanzadaUsuarios">

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
                    <div className="cajaOptionUsuarios">

                        <div className="filtrarRol">
                            <span className="roles">{usuariosFiltrar}</span>

                            <div className="optionRol">

                                {props.datosRol != undefined && getRoles() != undefined ?
                                    getRoles().map((rol, index) => (
                                        <div key={"es_" + rol.id} >
                                            <FormControlLabel
                                                className="checkboxRol"
                                                label={rol.nombre}
                                                labelPlacement="start"
                                                control={
                                                    <Checkbox
                                                        onChange={(event: any, value: any) => {
                                                            handleChangeRol(event.target.value);
                                                        }}
                                                        checked={rolBusqueda.some(
                                                            (e) => e.id === rol.id
                                                        )}
                                                        value={rol.id}
                                                        name="rol1"
                                                        disableRipple
                                                        disableFocusRipple
                                                        disableTouchRipple
                                                        icon={<Brightness1OutlinedIcon />}
                                                        checkedIcon={<CheckCircleIcon />}
                                                        className="checkboxRol"
                                                    />
                                                }
                                            />
                                        </div>

                                    )) : null}
                            </div>

                            <div className="cajaBuscarAvanzado">
                                <button
                                    className="botonEliminar"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        clearSearchUsuario();
                                    }}
                                >
                                    {busquedaAvanzadaEliminar}
                                </button>
                                <button
                                    className="botonBuscar"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        searchUser();
                                    }}
                                >
                                    {busquedaAvanzadaBuscar}
                                </button>

                            </div>
                        </div>
                    </div>

                )}
                <UsuariosAdmin
                    handleChangePageFromPagination={searchChangePage}
                />

            </div>
        </div>
    );
};

export const BusquedaUsuarios = connect(
    mapStateToProps,
    mapDispatchToProps
)(_BusquedaUsuarios);

export default BusquedaUsuarios;
