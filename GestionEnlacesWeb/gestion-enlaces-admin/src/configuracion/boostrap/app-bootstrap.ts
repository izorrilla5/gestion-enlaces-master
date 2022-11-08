import { IReduxBootstrapModule, ReduxBootstrapModule } from './redux.bootstrap';
import { IServiciosBootstrapModule, ServiciosBootstrapModule } from './servicios.bootstrap';
import { IRouterBootstrapModule, RouterBootstrapModule } from './router.bootstrap';
import { ILoggerBootstrapModule, LoggerBootstrapModule } from './logger.bootstrap';
import { II18nBootstrapModule, I18NBootstrapModule } from './i18n.bootstrap';
import { IAppLogger } from 'infraestructura/logger/i-app-logger';
import { AppLogger } from 'infraestructura/logger/app-logger';
import { RestApiRepo } from 'dominio/rest/rest-api.repo';
import { RestApiJsonMock } from 'infraestructura/api/rest-api-mock.json.impl';
import { watchLoginCompleted, watchLoginRequest, watchIdiomaCambiado, watchUpdatePass, watchSendMail, watchSendMailContacto, watchLoginPageRequest, watchRegisterPageRequest, watchRegisterRequest } from 'interfaz/seguridad/sagas/login.saga';
import { watchLogoutRequest, watchLogoutCompleted } from 'interfaz/seguridad/sagas/logout.saga';
import { watchEnlaceDetailRequest, watchEnlaceDetailRequestCompleted, watchEliminarEnlace, watchEnlaceEliminado, watchCreateNuevoEnlaceRequest, watchMainPageRequest, watchGuardarEnlace, watchBuscarEnlace, goBackEnlaces, watchListasPageRequest, watchBuscarEnlacesUsuario, watchBuscarEnlacesUsuarioCompleted, watchPublicPageRequest } from 'interfaz/admin/enlaces/sagas/enlaces.saga';
import { watchVotoDetailRequest, watchVotolRequestCompleted } from 'interfaz/admin/votos/sagas/votos.saga';
import { watchObtenerUltimosEnlacesCompleted, watchObtenerUltimosEnlaces, watchObtenerMasVotados, watchObtenerMasVotadosCompleted, watchObtenerEnlacesPatrocinados, watchObtenerEnlacesPatrocinadosCompleted } from '../../interfaz/admin/enlaces/sagas/enlaces.saga';
import { watchBuscarLista, watchGuardarLista, watchCreateNuevaListaRequest, watchEliminarLista, watchBuscarListaUsuario, watchBuscarListaUsuarioCompleted, watchListaDetailRequest, watchListaDetailRequestCompleted, watchGuardarListaCompleted, watchBuscarMiListaCompleted, watchBuscarListaCompleted, watchBuscarMiLista, watchBuscarMiListaPopUpCompleted, watchBuscarMiListaPopUp, watchClonarLista, watchBuscarListasUsuariosPage, watchBuscarListasUsuariosPageCompleted, watchListaEliminado } from 'interfaz/admin/listas/sagas/listas.saga';
import { watchBuscarUsuario, watchBuscarUsuarioCompleted, watchUsuariosPageRequest, watchGuardarUsuario, watchUsuarioDetailRequest, watchUsuarioDetailRequestCompleted, watchNuevoUsuarioRequest, watchEliminarUsuario, watchUsuarioEliminado, watchAboutPageRequest, watchCookiesPageRequest, watchLegalPageRequest, watchContactoPageRequest } from 'interfaz/admin/usuarios/sagas/usuarios.saga';
import { AuthManagerBootstrapModule, IAuthManagerBootstrapModule } from './auth-manager.bootstrap';

declare type AppContext = IReduxBootstrapModule
    & IServiciosBootstrapModule
    & IRouterBootstrapModule
    & ILoggerBootstrapModule
    & II18nBootstrapModule
    & IAuthManagerBootstrapModule;

export class BootstrapModule {

    private appContext: any = {};
    inicializarApp(): AppContext {

        const i18nModule = new I18NBootstrapModule().initModule();
        this.appContext = { ...this.appContext, ...i18nModule };

        const restApi = this.bootstrapServicios();

        const serviciosmodule = new ServiciosBootstrapModule(restApi).initModule();
        this.appContext = { ...this.appContext, ...serviciosmodule };

        const sagas = this.bootstrapSagas();
        const reduxmodule = new ReduxBootstrapModule(sagas).initModule();
        this.appContext = { ...this.appContext, ...reduxmodule };

        const routerModule = new RouterBootstrapModule().initModule();
        this.appContext = { ...this.appContext, ...routerModule };

        const logger = this.bootstrapLogger();
        const loggerModule = new LoggerBootstrapModule(logger).initModule();
        this.appContext = { ...this.appContext, ...loggerModule };

        const authManager = new AuthManagerBootstrapModule(restApi).initModule();
        this.appContext = { ...this.appContext, ...authManager };

        return this.appContext;
    }

    protected bootstrapLogger(): IAppLogger {
        return new AppLogger();
    }


    protected bootstrapSagas(): Object {
        const sagas = {
            "watchLoginRequest": watchLoginRequest,
            "watchLoginCompleted": watchLoginCompleted,
            "watchRegisterRequest": watchRegisterRequest,
            "watchLogoutRequest": watchLogoutRequest,
            "watchLogoutCompleted": watchLogoutCompleted,
            "watchEnlaceDetailRequest": watchEnlaceDetailRequest,
            "watchEnlaceDetailRequestCompleted": watchEnlaceDetailRequestCompleted,
            "watchEliminarEnlace": watchEliminarEnlace,
            "watchEnlaceEliminado": watchEnlaceEliminado,
            "watchCreateNuevoEnlaceRequest": watchCreateNuevoEnlaceRequest,
            "watchMainPageRequest": watchMainPageRequest,
            "watchGuardarEnlace": watchGuardarEnlace,
            "watchBuscarEnlace": watchBuscarEnlace,
            "watchVotoDetailRequest": watchVotoDetailRequest,
            "watchVotolRequestCompleted": watchVotolRequestCompleted,
            "watchObtenerUltimosEnlaces": watchObtenerUltimosEnlaces,
            "watchObtenerUltimosEnlacesCompleted": watchObtenerUltimosEnlacesCompleted,
            "watchObtenerMasVotados": watchObtenerMasVotados,
            "watchObtenerMasVotadosCompleted": watchObtenerMasVotadosCompleted,
            "watchObtenerEnlacesPatrocinados": watchObtenerEnlacesPatrocinados,
            "watchObtenerEnlacesPatrocinadosCompleted": watchObtenerEnlacesPatrocinadosCompleted,
            "goBackEnlaces": goBackEnlaces,
            "watchListasPageRequest": watchListasPageRequest,
            "watchBuscarLista": watchBuscarLista,
            "watchBuscarListaCompleted": watchBuscarListaCompleted,
            "watchBuscarMiLista": watchBuscarMiLista,
            "watchBuscarMiListaCompleted": watchBuscarMiListaCompleted,
            "watchBuscarMiListaPopUp": watchBuscarMiListaPopUp,
            "watchBuscarMiListaPopUpCompleted": watchBuscarMiListaPopUpCompleted,
            "watchGuardarLista": watchGuardarLista,
            "watchGuardarListaCompleted": watchGuardarListaCompleted,
            "watchCreateNuevaListaRequest": watchCreateNuevaListaRequest,
            "watchEliminarLista": watchEliminarLista,
            "watchBuscarListaUsuario": watchBuscarListaUsuario,
            "watchBuscarListaUsuarioCompleted": watchBuscarListaUsuarioCompleted,
            "watchListaDetailRequest": watchListaDetailRequest,
            "watchListaDetailRequestCompleted": watchListaDetailRequestCompleted,
            "watchClonarLista": watchClonarLista,
            "watchBuscarUsuario": watchBuscarUsuario,
            "watchBuscarUsuarioCompleted": watchBuscarUsuarioCompleted,
            "watchUsuariosPageRequest": watchUsuariosPageRequest,
            "watchNuevoUsuarioRequest": watchNuevoUsuarioRequest,
            "watchGuardarUsuario": watchGuardarUsuario,
            "watchUsuarioDetailRequest": watchUsuarioDetailRequest,
            "watchUsuarioDetailRequestCompleted": watchUsuarioDetailRequestCompleted,
            "watchBuscarListasUsuariosPage": watchBuscarListasUsuariosPage,
            "watchBuscarListasUsuariosPageCompleted": watchBuscarListasUsuariosPageCompleted,
            "watchBuscarEnlacesUsuario": watchBuscarEnlacesUsuario,
            "watchBuscarEnlacesUsuarioCompleted": watchBuscarEnlacesUsuarioCompleted,
            "watchEliminarUsuario": watchEliminarUsuario,
            "watchUsuarioEliminado": watchUsuarioEliminado,
            "watchIdiomaCambiado": watchIdiomaCambiado,
            "watchListaEliminado": watchListaEliminado,
            "watchUpdatePass": watchUpdatePass,
            "watchAboutPageRequest": watchAboutPageRequest,
            "watchPublicPageRequest": watchPublicPageRequest,
            "watchCookiesPageRequest": watchCookiesPageRequest,
            "watchLegalPageRequest": watchLegalPageRequest,
            "watchContactoPageRequest": watchContactoPageRequest,
            "watchSendMail": watchSendMail,
            "watchSendMailContacto": watchSendMailContacto,
            "watchLoginPageRequest": watchLoginPageRequest,
            "watchRegisterPageRequest": watchRegisterPageRequest,
        }
        return sagas;
    }

    protected bootstrapServicios(): RestApiRepo {
        return new RestApiJsonMock();
    }

}
