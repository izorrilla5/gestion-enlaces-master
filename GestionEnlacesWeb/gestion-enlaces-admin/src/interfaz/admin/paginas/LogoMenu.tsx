import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';


interface LogoMenuDispatchProps {
    doLogout(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    doLogout: () => { }
});

type LogoMenuProps = IEstadoAplicacion & LogoMenuDispatchProps;



const _imagenPortada = function Portada(props: LogoMenuProps) {

    return (

        <div className="cajaLogo">
            <img className="logo" src="/images/logo-nuevo.png" alt="portada" />
        </div>

    );
}


export const LogoMenu = connect(
    mapStateToProps,
    mapDispatchToProps
)(_imagenPortada);

export default LogoMenu;