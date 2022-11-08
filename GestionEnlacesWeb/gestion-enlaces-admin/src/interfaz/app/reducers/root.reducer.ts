import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { estadoPromesaReducer } from './estado-promesa.reducer';
import { seguridadReducer } from 'interfaz/seguridad/reducers/seguridad-reducer';
import { usuariosReducer } from 'interfaz/admin/usuarios/reducers/usuarios-reducer';
import { categoriasReducer } from 'interfaz/admin/categorias/reducers/categorias.reducer';
import { enlacesReducer } from 'interfaz/admin/enlaces/reducers/enlaces.reducer';
import { tiposReducer } from 'interfaz/admin/tipos/reducers/tipos.reducer';
import { tagsReducer } from 'interfaz/admin/tags/reducers/tags.reducer';
import { medicosReducer } from 'interfaz/admin/medicos/reducers/medicos.reducer';
import { listasReducer } from 'interfaz/admin/listas/reducers/listas.reducer';
import { rolesReducer } from 'interfaz/admin/roles/reducers/roles.reducer';
import { idiomasReducer } from 'interfaz/admin/idiomas/reducers/idiomas.reducer';

const rootReducer = (history: any) =>
  combineReducers({
    datosSeguridad: seguridadReducer,
    datosUsuarios: usuariosReducer,
    datosMedicos: medicosReducer,
    datosCategorias: categoriasReducer,
    datosEnlaces: enlacesReducer,
    datosTipos: tiposReducer,
    datosTags: tagsReducer,
    datosEstadoPromesa: estadoPromesaReducer,
    datosListas: listasReducer,
    datosRol: rolesReducer,
    datosIdiomas: idiomasReducer,
    router: connectRouter(history)
  });


export default rootReducer;
