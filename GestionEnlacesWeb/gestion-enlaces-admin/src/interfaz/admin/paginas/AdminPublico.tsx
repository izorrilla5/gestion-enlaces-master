import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { logoutRequest } from 'interfaz/seguridad/acciones/creators/logout-saga.action.creator';
import { useTranslation } from 'react-i18next';
import MenuPublico from './MenuPublico';
import EnlacesAdminPublico from './EnlacesAdminPublico';
import PicPortada from './PicPortada';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import PiePagina from './PiePagina';
import { CookieBanner } from "react-cookie-law-customizable";


interface AdminDispatchProps {
  doLogout(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doLogout: () => {
    dispatch(logoutRequest())
  }
});

type AdminProps = IEstadoAplicacion & AdminDispatchProps;

const handleClose = (event, reason) => {
  if (reason === 'clickaway') {
    return;
  }
};

const _AdminPublico = (props: AdminProps) => {

 //traducciones de la página
 const { t } = useTranslation();
 const enlacesErrorServer = t("translation:enlaces.errorServer");


  return (
    < div className="App" >
      <MenuPublico/>
      <PicPortada/>
      <EnlacesAdminPublico/>
      <PiePagina/>

      <Snackbar
              open={props.datosEstadoPromesa.promesaFinalizada && !props.datosEstadoPromesa.finalizadoCorrecto}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              autoHideDuration={5000}
              onClose={handleClose}
      >
        <Alert severity="error">{enlacesErrorServer}</Alert>
      </Snackbar>
      
      <CookieBanner
        styles={{
          dialog: { 
            position: 'fixed', 
            left: '0',
            bottom:'0', 
            zIndex: '100000',
            backgroundColor: '#f8f7f7',
            padding: '10px',
            width: '100%' },
          selectPane: {
            display: 'none'
          },
        }}
        message="Este portal web únicamente utiliza cookies propias con finalidad técnica, no recaba ni cede datos de carácter personal de los usuarios sin su conocimiento. Sin embargo, contiene enlaces a sitios web de terceros con políticas de privacidad ajenas a esta web, que usted podrá decidir si acepta o no cuando acceda a ellos."
        wholeDomain={true}
        acceptButtonText='Acepto'
        privacyPolicyLinkText='Más información'
        policyLink='../PoliticaCookies'
        onAccept={() => { }}
        onAcceptPreferences={() => { }}
        onAcceptStatistics={() => { }}
        onAcceptMarketing={() => { }}
        showPreferencesOption={false}
        showStatisticsOption={false}
        showMarketingOption={false}
      />
  </div >
  );
}


export const AdminPublico = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AdminPublico);

export default AdminPublico;
