import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { logoutRequest } from 'interfaz/seguridad/acciones/creators/logout-saga.action.creator';



interface imagenPortadaDispatchProps {
    doLogout(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    doLogout: () => {
        dispatch(logoutRequest())
    }
});

type imagenPortadaProps = IEstadoAplicacion & imagenPortadaDispatchProps;



const _imagenPortada = function Portada(props: imagenPortadaProps) {

    return (

        <div className="cajaPortada">
            <div className="portada">
                <img src="/images/pediatria.jpeg" alt="portada" />
            </div>
        </div>
    );
}


export const PicPortada = connect(
    mapStateToProps,
    mapDispatchToProps
)(_imagenPortada);

export default PicPortada;