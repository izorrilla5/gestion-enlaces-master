import * as React from 'react';
import { connect } from 'react-redux';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { LogoMenu } from './LogoMenu';
import { MenuPrivado } from './MenuPrivado';
import { PiePagina } from './PiePagina';
import MenuPublico from './MenuPublico';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import { Button, makeStyles, Snackbar, TextareaAutosize, TextField } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { IEmailContacto } from 'dominio/email-contacto';
import { sendMailContacto } from 'interfaz/seguridad/acciones/creators/login-saga.action.creator';

type ContactoProps = IEstadoAplicacion & ContactoDispatchProps;
interface ContactoDispatchProps {
    doSendContactoMail(emailContacto: IEmailContacto): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
    doSendContactoMail: (emailContacto: IEmailContacto) => {
        dispatch(sendMailContacto(emailContacto));
    }
});

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
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


const _Contacto = (props: ContactoProps) => {

    const classes = useStyles();

    const [nombre, setNombre] = React.useState<String>('');
    const [asunto, setAsunto] = React.useState<String>('');
    const [email, setEmail] = React.useState<String>('');
    const [cuerpo, setCuerpo] = React.useState<string>('');
    const [errorSendMail, setErrorSendMail] = React.useState<boolean>(false);

    const handleChangeNombre = (e: any) => {
        setNombre(e.target.value);
    }
    const handleChangeAsunto = (e: any) => {
        setAsunto(e.target.value);
    }
    const handleChangeEmail = (e: any) => {
        setEmail(e.target.value);
    }
    const handleChangeCuerpo = (e: any) => {
        setCuerpo(e.target.value);
    }

    const [enviado, setEnviado] = React.useState(
        false
    );

    const handleSendMail = (event): boolean => {

        const result = nombre != undefined && nombre !== '' && email !== undefined && email !== ''
            && asunto !== undefined && asunto !== '' && cuerpo !== undefined && cuerpo !== '';
        if (result) {
            const emailContacto: IEmailContacto = Object.assign({}, {
                nombre,
                email,
                asunto,
                cuerpo
            }) as IEmailContacto;
            props.doSendContactoMail(emailContacto);
            clearSendMailFormData();
            setEnviado(true);
            window.setTimeout(() => setEnviado(false),3000);
        }

        return result;
    }

    const clearSendMailFormData = () => {
        setNombre('');
        setAsunto('');
        setCuerpo('');
        setEmail('');
        setErrorSendMail(false);
    }

    return (

        <div>
            <div className="logoResponsive">
                <LogoMenu />
            </div>

            {getLoggedUserData().rol.id === 1 ?
                <MenuPublico />
                :
                <MenuPrivado />
            }

            <div className="cajaAbout">
                <div className="about">
                    <h3>
                        Rellena el siguiente formulario y te atenderemos cuanto antes nos sea posible:
                    </h3>
                    <TextField
                        id="nombreDialog"
                        label="Nombre"
                        type="text"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        name="nombreDialog"
                        autoFocus
                        value={nombre}
                        onChange={handleChangeNombre}
                    />
                    <TextField
                        id="emailDialog"
                        label="Email"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        name="numColegiadoDialog"
                        autoFocus
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <TextField
                        id="numColegiadoDialog"
                        label="Asunto"
                        type="text"
                        variant="filled"
                        margin="normal"
                        fullWidth
                        name="numColegiadoDialog"
                        autoFocus
                        value={asunto}
                        onChange={handleChangeAsunto}
                    />
                    <TextareaAutosize
                        style={{ padding: '10px', width: '100%', height: '170px', marginTop: '30px', marginBottom: '10px', fontSize: '1.1rem' }}
                        rowsMax={8}
                        placeholder="Cuéntanos lo que quieras"
                        value={cuerpo}
                        onChange={handleChangeCuerpo}
                    />
                    <div className="botonEntrar2">
                        <div className="botonEntrar">
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={handleSendMail}
                            >
                                ENVIAR
                            </Button>
                        </div >
                    </div >
                </div>
            </div>
            <PiePagina />
            <Snackbar
                open={enviado}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                autoHideDuration={3000}
            >
                <Alert severity="success">Enviado correctamente!</Alert>
            </Snackbar>
            <Snackbar
                open={errorSendMail}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                autoHideDuration={5000}
                className="modalError"
            >
                <Alert severity="error">Introduce todos los datos requeridos</Alert>
            </Snackbar>

        </div>
    )
}


export const Contacto = connect(
    mapStateToProps,
    mapDispatchToProps
)(_Contacto);

export default Contacto;