import { IAppLogger } from './i-app-logger';

export class AppLoggerMock implements IAppLogger {

    log(args: string | Object[]): void {
        console.log(args);
    }

    warn(args: string | Object[]): void {
        console.warn(args);
    }

    error(args: string | Object[]): void {
        debugger;
        console.error(args);
    }

}