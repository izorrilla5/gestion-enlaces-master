import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import Typography from '@material-ui/core/Typography';
import { aboutPage, avisoLegalPage, contactoPage, cookiesPage } from '../usuarios/acciones/creators/usuarios.action.creator';
import { useTranslation } from 'react-i18next';

interface FooterLoginDispatchProps {
    doNavigateToAcercaDePage(): any;
    doNavigateToPoliticaCookies(): any;
    doNavigateToAvisoLegal(): any;
    doNavigateToContactoPage(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    doNavigateToAcercaDePage: () => {
        dispatch(aboutPage())
    },
    doNavigateToPoliticaCookies: () => {
        dispatch(cookiesPage())
    },
    doNavigateToAvisoLegal: () => {
        dispatch(avisoLegalPage())
    },
    doNavigateToContactoPage: () => {
        dispatch(contactoPage())
    },
});

type FooterLoginProps = IEstadoAplicacion & FooterLoginDispatchProps;

function Copyright() {

    return (

        <Typography variant="body2" color="textSecondary">
            {'Copyright © TrailuMed '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );

}


const _FooterLogin = (props: FooterLoginProps) => {

    const { t } = useTranslation();
    const footerLegal = t("translation:footer.legal");
    const footerCookies = t("translation:footer.cookies");
    const footerAbout = t("translation:footer.about");
    const footerDerechosReservados = t("translation:footer.derechosReservados");

    return (

        <div className="PiePaginaLogin">

            <div className="footer2Login">
                <div className="cajaFooter2Login">
                    <div className="infoFooterLogin">
                        <span onClick={(e) => { e.preventDefault(); props.doNavigateToAvisoLegal(); window.scrollTo(0, 0); }}>{footerLegal}</span>
                        <span onClick={(e) => { e.preventDefault(); props.doNavigateToPoliticaCookies(); window.scrollTo(0, 0); }}>{footerCookies}</span>
                        <span onClick={(e) => { e.preventDefault(); props.doNavigateToAcercaDePage(); window.scrollTo(0, 0); }}> {footerAbout} </span>
                        {/* <span onClick={(e) => { e.preventDefault(); props.doNavigateToContactoPage(); window.scrollTo(0, 0); }}> {footerContacto} </span> */}
                    </div>

                    <div className="copyright">
                        <Typography variant="body1">{footerDerechosReservados}</Typography>
                        <Copyright />
                    </div>
                </div>
            </div>

        </div>
    );
}


export const PiePaginaLogin = connect(
    mapStateToProps,
    mapDispatchToProps
)(_FooterLogin);

export default PiePaginaLogin;