import { BootstrapModule } from './bootstrap-module';
import { Store } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from 'interfaz/app/reducers/root.reducer'
import { createBrowserHistory, History } from 'history';
import initialState from 'configuracion/store/initial-state';
import createSagaMiddleware from '@redux-saga/core';
import { ConfiguracionGlobal } from 'infraestructura/configuracion/configuracion-global';
import { middlewareInicial } from 'interfaz/app/middlewares/initial-middleware.middleware';
import { fork, all } from 'redux-saga/effects';
import _ from 'lodash';
import { routerMiddleware } from 'connected-react-router';
import { middlewareSeguridad } from 'interfaz/app/middlewares/seguridad.middleware';

export interface IReduxBootstrapModule {
    history: History,
    store: Store
}
/* Redux Style Guide https://redux.js.org/style-guide/style-guide/?utm_source=reactdigest&utm_medium=email&utm_campaign=featured */
export class ReduxBootstrapModule implements BootstrapModule {

    constructor(public sagasMap: Object) { }

    initModule = (): IReduxBootstrapModule => {
        /* Actualizar connected-react-router a repo centralizado a https://github.com/supasate/connected-react-router/pull/76 npm central no tiene  la ultima version, este commit hace que no haga push al history en el back*/
        const history = createBrowserHistory({
            basename: ConfiguracionGlobal.BASE_NAME
        })

        const sagaMiddleware = createSagaMiddleware();

        const middlewares = [
            //...getDefaultMiddleware(),
            middlewareInicial,
            middlewareSeguridad,
            //middlewares
            sagaMiddleware,
            routerMiddleware(history),
        ];

        const store: Store = configureStore({
            reducer: rootReducer(history),
            preloadedState: initialState as any,
            middleware: middlewares,
            devTools: true
        });

        sagaMiddleware.run(this.construirRootSaga(this.sagasMap));

        return { history, store };
    }

    private construirRootSaga(sagasMap: Object) {
        const sagas = _.map(Object.keys(sagasMap), (sagaKey) => sagasMap[sagaKey]);

        const rootSaga = function* () {
            yield all(
                _.map(sagas, (saga) => fork(saga))
            );
        }
        return rootSaga;
    }

}
