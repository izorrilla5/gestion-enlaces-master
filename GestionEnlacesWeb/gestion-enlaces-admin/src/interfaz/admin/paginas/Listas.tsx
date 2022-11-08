import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';

import LogoMenu from './LogoMenu';
import BusquedaListas from './BusquedaListas';
import MenuPrivado from './MenuPrivado';
import PiePagina from './PiePagina';

interface ListasDispatchProps {

}



type ListasProps = IEstadoAplicacion & ListasDispatchProps;



const _Listas = (props: ListasProps) => {


    return (
        <div className="App" >
            <div className="logoResponsive">
                <LogoMenu />
            </div>
            <MenuPrivado />
            <div className="cajaListas" >
                <div className="cajaPortada">
                    <div className="portada">
                        <img src="/images/doctors.jpeg" alt="portada" />
                    </div>
                </div>
                <div className="buscadorListas">
                    <BusquedaListas />
                </div>
            </div>
            <PiePagina/>
        </div >

    );
}


export const Listas = connect(
    mapStateToProps
)(_Listas);

export default Listas;