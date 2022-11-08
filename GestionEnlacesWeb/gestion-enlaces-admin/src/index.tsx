import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import { BootstrapModule } from './configuracion/boostrap/app-bootstrap';

export const appContext = new BootstrapModule().inicializarApp();

const approutes = appContext.routes.map(routeprops => (
  <Route key={"p_" + routeprops.path} {...routeprops} />
));

ReactDOM.render(
  <Provider store={appContext.store}>
    <ConnectedRouter history={appContext.history} >
      <Switch>
        {approutes}
      </Switch>
    </ConnectedRouter>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
