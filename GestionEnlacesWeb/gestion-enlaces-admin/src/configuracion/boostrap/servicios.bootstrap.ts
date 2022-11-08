import { BootstrapModule } from './bootstrap-module';
import { ServicioSincronizacion } from 'aplicacion/servicio-sincronizacion';
import { RestApiRepo } from 'dominio/rest/rest-api.repo';

export interface IServiciosBootstrapModule {
    servicioSincronizacion: ServicioSincronizacion
}

export class ServiciosBootstrapModule implements BootstrapModule {
    constructor(public restApi: RestApiRepo) {
    }

    initModule = () => {
        const servicioSincronizacion: ServicioSincronizacion = new ServicioSincronizacion(this.restApi);

        return {
            servicioSincronizacion
        };
    };
}
