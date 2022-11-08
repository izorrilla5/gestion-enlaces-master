import { BootstrapModule } from './bootstrap-module';
import { IAppLogger } from 'infraestructura/logger/i-app-logger';

export interface ILoggerBootstrapModule {
    logger: IAppLogger
}

export class LoggerBootstrapModule implements BootstrapModule {
    constructor(protected logger: IAppLogger) {
    }

    initModule = (): ILoggerBootstrapModule => {
        return { logger: this.logger };
    };
}