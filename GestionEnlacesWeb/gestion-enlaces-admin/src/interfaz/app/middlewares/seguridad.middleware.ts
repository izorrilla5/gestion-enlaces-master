import _ from 'lodash';
//import { LOCATION_CHANGE, CALL_HISTORY_METHOD, replace } from 'connected-react-router';
import { LOCATION_CHANGE, replace } from 'connected-react-router';
//import { LOGIN_ROUTER_PATH, ERROR_ROUTER_PATH, AUTH_CALLBACK_ROUTER_PATH, ROOT_ROUTER_PATH, LOGOUT_ROUTER_PATH, PAGINA_PDF_ROUTER_PATH } from 'configuracion/constantes-navegacion';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { isLogged } from 'infraestructura/auth/auth-manager';

export const middlewareSeguridad = (store: any) => (next: any) => (action: any) => {

  switch (action.type) {
    case LOCATION_CHANGE: {
      const { pathname: path } = action.payload.location;
      const estado: IEstadoAplicacion = store.getState();
      const redirigir = redirigirALanding(path, estado);
      //const pathIgnorado = isIgnored(path);
      //
      if (redirigir) {
        store.dispatch(replace('Landing'));
      } else {
        next(action)
      }
    } break;
    /*case CALL_HISTORY_METHOD: {
      if (action.payload && action.payload.args && action.payload.args.length > 0) {
        const path = action.payload.args[0];
        const estado: IEstadoAplicacion = store.getState();
        const redirigir = redirigirALogin(path, estado);
        //const pathIgnorado = isIgnored(path);
        if (redirigir) {
          store.dispatch(replace('Login'));
        } else {
          next(action)
        }
      }
    } break;*/
    default: {
      next(action)
      break;
    }
  }
}

/*
const IGNORED_PATHS = [LOGOUT_ROUTER_PATH, PAGINA_PDF_ROUTER_PATH];

const isIgnored = (urlpath: string): boolean => {//TODO: Refactorizar y extraer a seguridad de rutas, rutas securizadas y no securizadas
  const ignored = _.find(IGNORED_PATHS, path => path == urlpath);
  return ignored != undefined;
}
*/

const redirigirALanding = (urlpath: string, estado: IEstadoAplicacion): boolean => {
  const estaAutenticado: boolean = isLogged();
  const esLanding = urlpath.includes('Landing');
  const esLogin = urlpath.includes('Login');
  const esPoliticaCookies = urlpath.includes('PoliticaCookies');
  const esAvisoLegal = urlpath.includes('Legal');
  const esAcercaDe = urlpath.includes('AcercaDe');
  const esContacto = urlpath.includes('Contacto')
  /*
  const esError = RouteMatchUtils.routeMatchesPath(urlpath, ERROR_ROUTER_PATH);
  const esCallback = RouteMatchUtils.routeMatchesPath(urlpath, AUTH_CALLBACK_ROUTER_PATH);
  const esMain = RouteMatchUtils.routeMatchesPath(urlpath, ROOT_ROUTER_PATH);
  */
 return ((!esLanding && !esLogin && !esPoliticaCookies && !esAvisoLegal&& !esAcercaDe&& !esContacto) && !estaAutenticado) ;
  //return !esLogin && !esError && !estaAutenticado && !esCallback && !esMain;
}
