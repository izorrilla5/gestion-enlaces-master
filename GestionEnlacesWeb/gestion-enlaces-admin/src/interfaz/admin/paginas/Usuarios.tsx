import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';

import LogoMenu from './LogoMenu';
import MenuPrivado from './MenuPrivado';
import BusquedaUsuarios from './BusquedaUsuarios';
import PiePagina from './PiePagina';

interface UsuariosDispatchProps {

}


type UsuariosProps = IEstadoAplicacion & UsuariosDispatchProps;



const _Usuarios = (props: UsuariosProps) => {


    return (
        <div className="App" >
            <div className="logoResponsive">
                <LogoMenu />
            </div>
            <MenuPrivado />
            <div className="cajaListas" >
                <div className="cajaPortada">
                    <div className="portada">
                        <img src="/images/doctorsUsers.jpeg" alt="portada" />
                    </div>
                </div>
                <div className="buscadorListas">
                    <BusquedaUsuarios />
                </div>
            </div>
            <PiePagina/>
        </div >

    );
}


export const Usuarios = connect(
    mapStateToProps
)(_Usuarios);

export default Usuarios;