import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { logoutRequest } from 'interfaz/seguridad/acciones/creators/logout-saga.action.creator';

import Destacados from './Destacados';
import BusquedaPublica from './BusquedaPublica';


interface AdminDispatchProps {
  doLogout(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doLogout: () => {
    dispatch(logoutRequest())
  }
});

type AdminProps = IEstadoAplicacion & AdminDispatchProps;



// const _Admin = (props: AdminProps) => {
const _Admin = function prueba(props: AdminProps) {
  


  return (
    < div className="principal" >
    <div className="organizacionPrincipal">
      <div className="organizacionSecundaria">
      <BusquedaPublica/>
      </div>

      <div className="columnaDestacados">
      <Destacados/>
      </div>
    </div>
  </div >
  );
}


export const EnlacesAdminPublico = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Admin);

export default EnlacesAdminPublico;
