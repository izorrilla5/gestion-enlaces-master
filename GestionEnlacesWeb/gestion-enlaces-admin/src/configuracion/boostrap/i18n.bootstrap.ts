import { BootstrapModule } from './bootstrap-module';
import i18n from "i18next";
import XHR from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";
import backend from "i18next-xhr-backend"
import { IdiomaEnum } from 'dominio/idioma-enum';
import { ConfiguracionGlobal } from 'infraestructura/configuracion/configuracion-global';

export interface II18nBootstrapModule {
    i18n: {
        t: (key: any | any[],
            options?: Object | string,
        ) => any
    }
}
export class I18NBootstrapModule implements BootstrapModule {
    initModule = (): II18nBootstrapModule => {
        const idiomaActual: string = IdiomaEnum[IdiomaEnum.ES].toLocaleLowerCase();
        i18n.use(initReactI18next)
            .use(XHR)
            .use(backend)
            .init({
                debug: false,
                lng: idiomaActual,
                fallbackLng: idiomaActual,
                ns: ["translation"],
                defaultNS: 'translation',
                load: "currentOnly",
                react: {
                    wait: true,
                    useSuspense: false   /* TODO: sin esto había problemas a la hora de refrescar la pantalla */
                },
                keySeparator: false,
                interpolation: {
                    escapeValue: false
                },
                backend: {
                    loadPath: ConfiguracionGlobal.BASE_NAME + "/locales/{{lng}}/{{ns}}.json"
                }
            });
        return { i18n };
    };
}