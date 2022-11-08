export interface IAppLogger {
    log(args: string | Object[]): void;
    warn(args: string | Object[]): void;
    error(args: string | Object[]): void;
}