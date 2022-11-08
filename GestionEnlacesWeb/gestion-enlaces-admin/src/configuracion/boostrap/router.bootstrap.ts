import { BootstrapModule } from './bootstrap-module';
import { RouteProps } from 'react-router';
import Login from 'interfaz/seguridad/paginas/Login';
import { Pagina404 } from 'interfaz/app/paginas/Pagina404';
import Admin from 'interfaz/admin/paginas/Admin';
import BusquedaPrivada from 'interfaz/admin/paginas/BusquedaPrivada';
import AdminPublico from 'interfaz/admin/paginas/AdminPublico';
import BusquedaPublica from 'interfaz/admin/paginas/BusquedaPublica';
import EnlacesAdmin from 'interfaz/admin/paginas/EnlacesAdmin';
import EnlacesAltaEditar from 'interfaz/admin/paginas/EnlacesAltaEditar';
import ListaEnlacesPrivado from 'interfaz/admin/paginas/ListaEnlacesPrivado';
import ListaEnlacesPublico from 'interfaz/admin/paginas/ListaEnlacesPublico';
import MenuPrivado from 'interfaz/admin/paginas/MenuPrivado';

import { EnlacesAdminPublico } from 'interfaz/admin/paginas/EnlacesAdminPublico';
import MenuPublico from 'interfaz/admin/paginas/MenuPublico';
import Listas from 'interfaz/admin/paginas/Listas';
import ListaAltaEditar from 'interfaz/admin/paginas/ListaAltaEditar';
import Usuarios from 'interfaz/admin/paginas/Usuarios';
import UsuarioAltaEditar from 'interfaz/admin/paginas/UsuariosAltaEditar';
import AcercaDeTrailuMed from 'interfaz/admin/paginas/AcercaDe';
import PoliticaCookies from 'interfaz/admin/paginas/PoliticaCookies';
import AvisoLegal from 'interfaz/admin/paginas/AvisoLegal';
import Contacto from 'interfaz/admin/paginas/Contacto';
import Landing from 'interfaz/admin/paginas/Landing';




export interface IRouterBootstrapModule {
    routes: RouteProps[]
}

export class RouterBootstrapModule implements BootstrapModule {
    initModule = (): IRouterBootstrapModule => {
        return {
            routes: [
                { exact: true, path: "/Landing", component: Landing },
                { exact: true, path: "/Login", component: Login },
                { exact: true, path: "/Admin", component: Admin },
                { exact: true, path: "/AdminPublico", component: AdminPublico },
                { exact: true, path: "/BusquedaPrivada", component: BusquedaPrivada },
                { exact: true, path: "/BusquedaPublica", component: BusquedaPublica },
                { exact: true, path: "/EnlacesAdmin", component: EnlacesAdmin },
                { exact: true, path: "/EnlacesAdminPublico", component: EnlacesAdminPublico },
                { exact: true, path: "/EnlacesAltaEditar", component: EnlacesAltaEditar },
                { exact: true, path: "/ListaEnlacesPrivado", component: ListaEnlacesPrivado },
                { exact: true, path: "/ListaEnlacesPublico", component: ListaEnlacesPublico },
                { exact: true, path: "/MenuPrivado", component: MenuPrivado },
                { exact: true, path: "/MenuPublico", component: MenuPublico },
                { exact: true, path: "/Listas", component: Listas },
                { exact: true, path: "/ListaAltaEditar", component: ListaAltaEditar },
                { exact: true, path: "/Usuarios", component: Usuarios },
                { exact: true, path: "/UsuarioAltaEditar", component: UsuarioAltaEditar },
                { exact: true, path: "/AcercaDe", component: AcercaDeTrailuMed },
                { exact: true, path: "/PoliticaCookies", component: PoliticaCookies },
                { exact: true, path: "/AvisoLegal", component: AvisoLegal },
                { exact: true, path: "/Contacto", component: Contacto },
                { component: Pagina404 },


            ]
        }
    };
}
