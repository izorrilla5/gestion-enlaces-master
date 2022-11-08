import { makeStyles } from '@material-ui/core/styles';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { IUsuario } from 'dominio/usuario';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';
import * as React from 'react';
import { connect } from 'react-redux';
import { loginRequest, loginPass, sendMail, registerRequest } from '../acciones/creators/login-saga.action.creator';
import { useTranslation } from "react-i18next";

import dataProvincias from './../../provincias.json'
/*import YouTube from 'react-youtube';*/
import { Provincia } from './Provincia';
import LoginView from './LoginView';
import { usuarioInactivoReset } from 'interfaz/admin/usuarios/acciones/creators/usuarios.action.creator';

type LoginProps = IEstadoAplicacion & LoginDispatchProps;

interface LoginDispatchProps {

  doRegister(usuario: IUsuario)
  doLogin(usuario: string, pwd: string): any;
  doUpdatePwd(usuarioUpdate: IUsuario): any;
  doSendMail(usuario: IUsuario): any;
  doResetInactiveUser(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doRegister: (usuario: IUsuario) => {
    dispatch(registerRequest(usuario))
  },
  doLogin: (usuario: string, pwd: string) => {
    dispatch(loginRequest(usuario, pwd))
  },
  doUpdatePwd: (usuarioUpdate: IUsuario) => {
    dispatch(loginPass(usuarioUpdate))
  },
  doSendMail: (usuario: IUsuario) => {
    dispatch(sendMail(usuario))
  },
  doResetInactiveUser: () => {
    dispatch(usuarioInactivoReset())
  }
});

const _Login = (props: LoginProps) => {


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

  const classes = useStyles();

  //Configuracion i18n
  const { t } = useTranslation();
  const loginModalPassNueva = t("translation:login.modal.passNueva");
  const altaEditarProvincia = t("translation:altaEditar.provincia");

  const [openCondiciones, setOpenCondiciones] = React.useState(false);

  const handleClickOpenCondicionesDialog = () => {
    setOpenCondiciones(true);
  };

  const handleCloseCondicionesDialog = () => {
    setOpenCondiciones(false);
  };

  const url = window.location.href;
  const [open, setOpen] = React.useState(url.includes("registerDialog=true"));
  const [openAccountVerified, setOpenAccountVerified] = React.useState(url.includes("accountVerified=true"));
  const [openAlreadyVerified, setOpenAlreadyVerified] = React.useState(url.includes("alreadyVerified=true"));

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    clearSendMailFormData();
    setOpen(false);
    setOpenAccountVerified(false);
    setOpenAlreadyVerified(false);
  };

  const handleSuccessRegisterDialog = () => {
    setSuccessRegister(false);
  }

  const [newNombre, setNewNombre] = React.useState<String>('');
  const [newApellido, setNewApellido] = React.useState<String>('');
  const [newEmail, setNewEmail] = React.useState<String>('');
  const [newUsername, setNewUsername] = React.useState<String>('');
  const [newPassword, setNewPassword] = React.useState<String>('');
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState<String>('');
  const [numeroColegiadoMedico, setNumeroColegiadoMedico] = React.useState<String>('');
  const [provincia, setProvincia] = React.useState<Provincia | null | undefined>(undefined);
  const [errorSendMail, setErrorSendMail] = React.useState<boolean>(false);
  const [errorNombreInvalid, setErrorNombreInvalid] = React.useState<boolean>(false);
  const [errorApellidoInvalid, setErrorApellidoInvalid] = React.useState<boolean>(false);
  const [errorEmailInvalid, setErrorEmailInvalid] = React.useState<boolean>(false);
  const [errorEmailInvalidText, setErrorEmailInvalidText] = React.useState<String>('');
  const [errorUserExists, setErrorUserExists] = React.useState<boolean>(false);
  const [errorUserExistsText, setErrorUserExistsText] = React.useState<String>('');
  const [errorPass, setErrorPass] = React.useState<boolean>(false);
  const [errorPassText, setErrorPassText] = React.useState<String>('');
  const [condicionesAceptadas, setCondicionesAceptadas] = React.useState<boolean>(false);
  const [successRegister, setSuccessRegister] = React.useState<boolean>(false);
  const [successRegisterText, setSuccessRegisterText] = React.useState<string>("");

  const handleCondicionesAceptadas = (e: any) => {
    setCondicionesAceptadas(!condicionesAceptadas);
  }
  const handleErrorSendMail = (e: any) => {
    setErrorSendMail(e);
  }

  const handleRegisterInputChange = (e: any) => {
    switch (e.target.name) {
      case "nombreDialog":
        console.log("Hola");

        setNewNombre(e.target.value);
        if (e.target.value.length < 3) {
          setErrorNombreInvalid(true);
        }
        else {
          setErrorNombreInvalid(false);
        }
        break;
      case "apellidosDialog":
        setNewApellido(e.target.value);
        if (e.target.value.length < 3) {
          setErrorApellidoInvalid(true);
        }
        else {
          setErrorApellidoInvalid(false);
        }
        break;
      case "emailDialog":
        const inputEmail = e.target.value;
        setNewEmail(inputEmail);
        const REEMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (inputEmail.length > 6) {
          fetch(`/api/usuario/check-user-email/${e.target.value}`)
            .then(res => res.json())
            .then(res => {
              setErrorEmailInvalid(res.existe || !REEMAIL.test(inputEmail));
              setErrorEmailInvalidText(res.existe ? "Esa dirección de e-mail ya está en uso!" : "Esa dirección de e-mail no es válida!");
            })
        }
        break;
      case "newUsernameDialog":
        setNewUsername(e.target.value);
        if (e.target.value.length > 4) {
          setErrorUserExists(false)
          fetch(`/api/usuario/check-user/${e.target.value}`)
            .then(res => res.json())
            .then(res => {
              setErrorUserExists(res.existe)
              setErrorUserExistsText(res.existe ? "Ese nombre de usuario ya está en uso!" : "Mínimo 5 caracteres, máximo 20")
            })
        }
        else{
          setErrorUserExists(true)
          setErrorUserExistsText("Mínimo 5 caracteres, máximo 20");
        }
        break;
      case "newPasswordDialog":
        setNewPassword(e.target.value);
        break;
      case "newConfirmPasswordDialog":
        setNewPasswordConfirm(e.target.value);
        break;
      case "numColegiadoDialog":
        setNumeroColegiadoMedico(e.target.value);
        break;
      default:
        break;
    }
  }

  const provincias: Provincia[] = dataProvincias;

  const handleChangeProvincia = (e: any) => {
    setProvincia(e);
  }

  const handleSendMail = (event): boolean => {
    let validPass = validatePass();

    const result = isMedico
      ?
      condicionesAceptadas && newNombre != "" && newApellido != "" && newEmail != "" && numeroColegiadoMedico != "" && provincia != undefined
      :
      condicionesAceptadas && newNombre != "" && newApellido != "" && newEmail != ""

    if (result && validPass) {
      let usuario: IUsuario;
      setSuccessRegister(true);
      if (isMedico) {
        usuario = Object.assign({}, {
          nombre: newNombre,
          apellidos: newApellido,
          email: newEmail,
          colegiado: numeroColegiadoMedico,
          provincia: provincia
        }) as IUsuario;
        setSuccessRegisterText("Se ha enviado un aviso a los administradores que validarán la veracidad de los datos introducidos, cuando su cuenta esté activada se le avisará via e-mail")
      }
      else {
        usuario = Object.assign({}, {
          nombre: newNombre,
          apellidos: newApellido,
          email: newEmail,
          username: newUsername,
          pwd: newPassword
        }) as IUsuario;
        props.doRegister(usuario);
        setSuccessRegisterText("Su cuenta ha sido creada con éxito pero tiene que confirmarla con el link que se le ha enviado vía email, revise su bandeja de correo electrónico");
      }
      props.doSendMail(usuario);
      console.log(usuario);
      handleCloseDialog();
      clearSendMailFormData();
    }

    if (validPass) {
      handleErrorSendMail(!result);
    }

    return result;
  }

  const validatePass = () => {
    const regexPass = new RegExp(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}/g); // 1 minúscula, 1 mayúscula y 1 número. Mínimo 8 caracteres

    if (newPassword != newPasswordConfirm) {
      setErrorPass(true);
      setErrorPassText("Las contraseñas no coinciden");
    }
    else if (newPassword.length > 24 || newPassword.length < 8) {
      setErrorPass(true);
      setErrorPassText("La contraseña debe tener entre 8 y 24 caracteres");
    }
    else if (!regexPass.test(newPassword.toString())) {
      console.log(newPassword.length);
      setErrorPass(true);
      setErrorPassText("La contraseña debe contener mínimo un número, una minúscula y una mayúscula");
    }
    else {
      setErrorPass(false);
      return true;
    }
    return false;
  }

  const clearSendMailFormData = () => {
    setCondicionesAceptadas(false);
    setErrorSendMail(false);
    setErrorPass(false);
    setNewNombre('');
    setNewApellido('');
    setNewEmail('');
    setNumeroColegiadoMedico('');
    setProvincia(undefined);
    setNewPassword('');
    setNewPasswordConfirm('');
    setNewUsername('');
  }

  const [username, setUsername] = React.useState('');

  const [pass, setPass] = React.useState('');

  const [passNew, setPassNew] = React.useState('');

  const [passConfirm, setPassConfirm] = React.useState('');

  const handleChangePassword = (e: any) => {
    setPass(e.target.value);
  }

  const handleChangeNewPassword = (e: any) => {
    setPassNew(e.target.value);
  }

  const handleChangePasswordConfirm = (e: any) => {
    setPassConfirm(e.target.value);
  }

  const savePwd = () => {

    const usuarioUpdate: IUsuario = getLoggedUserData();
    usuarioUpdate.pwd = passNew;
    console.log(usuarioUpdate);

    if (passNew !== '' && passConfirm !== '' && passNew === passConfirm) {
      props.doUpdatePwd(usuarioUpdate)
    } else {
      return;
    }
  }

  // validaciones

  const errorPassword = () => {
    return pass === ''
  }

  const errorPasswordConfirm = () => {
    return passConfirm === ''
  }


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [firstTime, setFirstTime] = React.useState(true);

  const handleLoginKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.doLogin(username, pass)
      setFirstTime(false);
    }
  }

  const handleChangePassKeyDown = (event) => {
    if (event.key === 'Enter') {
      savePwd();
      setFirstTime(false);
    }
  }

  const [isMedico, setIsMedico] = React.useState(false);
  const handleChangeRol = (event) => {
    setIsMedico(!isMedico);
  }

  // actualizar contraseña
  const necesitaCambiarContrasena = () => { return getLoggedUserData().necesitaCambiarContrasena; }

  /* const opts = {
     height: '390',
     width: '640',
     playerVars: {
       // https://developers.google.com/youtube/player_parameters
       autoplay: 1,
     },
     
         <YouTube videoId="1EYHP4eSkWo"  />
   };*/


  return (
    <LoginView
      loginModalPassNueva={loginModalPassNueva}
      altaEditarProvincia={altaEditarProvincia}
      openCondiciones={openCondiciones}
      handleClickOpenCondicionesDialog={handleClickOpenCondicionesDialog}
      handleCloseDialog={handleCloseDialog}
      handleSuccessRegisterDialog={handleSuccessRegisterDialog}
      handleCloseCondicionesDialog={handleCloseCondicionesDialog}
      handleClose={handleClose}
      handleClickShowPassword={handleClickShowPassword}
      handleMouseDownPassword={handleMouseDownPassword}
      handleLoginKeyDown={handleLoginKeyDown}
      handleChangePassKeyDown={handleChangePassKeyDown}
      handleChangeRol={handleChangeRol}
      necesitaCambiarContrasena={necesitaCambiarContrasena}
      open={open}
      openAccountVerified={openAccountVerified}
      openAlreadyVerified={openAlreadyVerified}
      handleClickOpenDialog={handleClickOpenDialog}
      newUsername={newUsername}
      errorSendMail={errorSendMail}
      errorNombreInvalid={errorNombreInvalid}
      errorApellidoInvalid={errorApellidoInvalid}
      errorEmailInvalid={errorEmailInvalid}
      errorEmailInvalidText={errorEmailInvalidText}
      errorUserExists={errorUserExists}
      errorUserExistsText={errorUserExistsText}
      errorPass={errorPass}
      errorPassText={errorPassText}
      errorPassword={errorPassword}
      errorPasswordConfirm={errorPasswordConfirm}
      successRegister={successRegister}
      successRegisterText={successRegisterText}
      handleCondicionesAceptadas={handleCondicionesAceptadas}
      handleRegisterInputChange={handleRegisterInputChange}
      handleChangePassword={handleChangePassword}
      handleChangePasswordConfirm={handleChangePasswordConfirm}
      handleChangeNewPassword={handleChangeNewPassword}
      handleChangeProvincia={handleChangeProvincia}
      handleSendMail={handleSendMail}
      setUsername={setUsername}
      provincia={provincia}
      provincias={provincias}
      firstTime={firstTime}
      setFirstTime={setFirstTime}
      datosSeguridad={props.datosSeguridad}
      datosEstadoPromesa={props.datosEstadoPromesa}
      usuarioInactivo={props.datosUsuarios.usuarioInactivo}
      username={username}
      pass={pass}
      passNew={passNew}
      passConfirm={passConfirm}
      showPassword={showPassword}
      savePwd={savePwd}
      condicionesAceptadas={condicionesAceptadas}
      isMedico={isMedico}
      classes={classes}
      doLogin={props.doLogin}
      doRegister={props.doRegister}
      doResetInactiveUser={props.doResetInactiveUser}
    />
  );
}

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Login);

export default Login;
