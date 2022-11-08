import * as React from 'react';
import { connect } from 'react-redux';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { Button, CssBaseline, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import LogoMenu from './LogoMenu';
import { useTranslation } from 'react-i18next';
import { loginRequest, navigateToLogin, navigateToRegister } from 'interfaz/seguridad/acciones/creators/login-saga.action.creator';

type LandingProps = IEstadoAplicacion & LandingDispatchProps;
interface LandingDispatchProps {
    doLoginUsuarioPublico(): any;
    navigateToLogin(): any;
    navigateToRegister(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    doLoginUsuarioPublico: () => {
        dispatch(loginRequest('erabiltzailea', '123456'));
    },
    navigateToLogin: () => {
        dispatch(navigateToLogin());
    },
    navigateToRegister: () => {
        dispatch(navigateToRegister());
    }
});

const useStyles = makeStyles(theme => ({
    root: {
    },
    image: {
        backgroundImage: 'url(/images/girlNurse.jpeg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },


    typography: {
        fontFamily: '"Poppins"',
    },

    paper: {
        margin: theme.spacing(10, 4, 5, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: theme.spacing(3, 5),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(0.5),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
    },

    copyright: {
        color: 'rgb(31, 117, 114)',
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(0)
    },

}));


const _Landing = (props: LandingProps) => {

    const classes = useStyles();

    const { t } = useTranslation();
    const footerDerechosReservados = t("translation:footer.derechosReservados2");

    return (
        <div className="CajaLogin">
            <div className="Login" >
                <Grid container component="main" className={classes.root}>
                    <div className="logoResponsive">
                        <LogoMenu />
                    </div>
                    <div className="menuPublic" style={{ height: '70px' }} >

                        <div className="caja-navBar" style={{ height: '70px' }}>
                            <div className="cajaLogo">
                                <img className="logo" src="/images/logo-nuevo.png" alt="portada" />
                            </div>

                            <div className="botonEntrarLanding" >
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    style={{"marginRight": "10px"}}
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                            props.navigateToLogin();
                                        }
                                    }
                                >
                                    ACCEDER
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={
                                        (e) => {
                                            e.preventDefault();
                                            props.navigateToRegister();
                                        }
                                    }
                                >
                                    REGISTRAR
                                </Button>
                            </div>

                        </div>

                    </div >



                    <Grid
                        container
                        component="main"
                        className={classes.root}
                        style={{ paddingTop: '70px' }}
                    >
                        <CssBaseline />
                        <Grid item xs={false} sm={6} md={6} className={classes.image} />
                        <Grid item xs={12} sm={6} md={6} component={Paper} elevation={0} square >
                            <div
                                className="MuiTypography-alignCenter footerLogin"
                                style={{ paddingBottom: '50px', paddingTop: '60px', paddingRight: '200px', paddingLeft: '125px', fontSize: '1.1rem', textAlign: 'left' }}
                            >
                                <b>
                                    <span
                                        style={{ fontSize: '1.2rem' }}
                                    >
                                        ¿QUÉ ES TRAILUMED?
                                    </span>
                                </b>
                                <div
                                    className="MuiTypography-alignCenter footerLogin"
                                    style={{ fontSize: '1.1rem', textAlign: 'left' }}
                                >
                                    <span>
                                        <br />
                                        <p>TrailuMED es una plataforma para el intercambio de conocimiento de los profesionales de la medicina al servicio de la ciudadania.
                                        </p>
                                        <br />
                                        <p>Dicho conocimento se presenta mediante enlaces a videos o artículos que han sido generados o validados por médicos colegiados. Éstos se encuentran disponibles de forma gratuita, pudiendo ser consultados por cualquier usuario que acceda a la plataforma.</p></span>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>

            </div>
            <div className="Login" >
                <Grid
                    container
                    component="main"
                    className={classes.root}
                    style={{ paddingTop: '50px', alignSelf: 'center' }}
                >

                    <div
                        className="MuiTypography-alignCenter footerLogin"
                        style={{ fontSize: '1.1rem', color: '#71c6c6', paddingRight: '400px', paddingLeft: '400px', textAlign: 'center' }}
                    >
                        <b>
                            <span
                                style={{ fontSize: '1.2rem', color: '#71c6c6' }}
                            >
                                ¿QUÉ OFRECE TRAILUMED?
                            </span>
                        </b>
                        <span>
                            <br /><br />
                            <p>TrailuMED ofrece a la ciudadania la posibilidad de consultar información médica, de manera sencilla e intuituva, con la tranquilidad de
                                que ésta ha sido contrastada por profesionales colegiados.</p>
                            <br />
                            <p>TrailuMED es una herramienta que permite la colaboración entre médicos y ciudadanos, posibilita a los primeros compartir su conocimento con los segundos.</p></span>
                        <br /><br />
                        <b>
                            <span
                                style={{ fontSize: '1.2rem', color: '#71c6c6', textAlign: 'center' }}
                            >
                                ¿CUÁNTO CUESTA TRAILUMED?
                            </span>
                        </b>
                        <span>
                            <br /><br />
                            <p>TrailuMED no tiene ningún coste asociado, ni para médicos ni para usuarios.</p>
                            <br /><br />
                        </span>
                        <b>
                            <span
                                style={{ fontSize: '1.2rem', color: '#71c6c6', textAlign: 'center' }}
                            >
                                ¿ERES UN MÉDICO Y QUIERES COLABORAR CON NOSOTROS?
                            </span>
                        </b>
                        <div className="botonEntrar" style={{ justifyContent: 'center' }}>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={
                                    (e) => {
                                        e.preventDefault();
                                        props.navigateToLogin();
                                    }
                                }
                            >
                                ACCEDER COMO MÉDICO/A
                            </Button>
                        </div>

                    </div>
                </Grid>

            </div>

            <div className="PiePaginaLogin" style={{ marginTop: '0' }}>

                <div className="footer2Login">
                    <div className="cajaFooter2Login" style={{ width: 'auto' }}>
                        <div className="copyright" >
                            <Typography variant="body1">{footerDerechosReservados}</Typography>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
}


export const Landing = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Landing);

export default Landing;