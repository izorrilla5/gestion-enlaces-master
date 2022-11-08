import { BootstrapModule } from './bootstrap-module';
import { RestApiRepo } from 'dominio/rest/rest-api.repo';

const REFRESHING_INTERVAL = 60 * 60 * 1000; //Se refresca el token cada hora

export interface IAuthManagerBootstrapModule {
}

export class AuthManagerBootstrapModule implements BootstrapModule {

    constructor(public restApi: RestApiRepo) {
        const that = this;
        setInterval(() => { that.refreshToken(); }, REFRESHING_INTERVAL);
    }

    refreshToken() {
       this.restApi.refrescarToken();
    }


    initModule = (): IAuthManagerBootstrapModule => {
        return {};
    };
}