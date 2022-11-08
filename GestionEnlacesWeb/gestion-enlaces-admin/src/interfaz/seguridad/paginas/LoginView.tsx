import * as React from 'react';

import { Button, CssBaseline, Grid, Paper, TextField, Link, FormControlLabel, Checkbox } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import Loading from 'interfaz/admin/paginas/Loading';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Autocomplete from '@material-ui/lab/Autocomplete';
import PiePaginaLogin from 'interfaz/admin/paginas/PiePaginaLogin';
import { CookieBanner } from "react-cookie-law-customizable";
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import TermsAndConditions from './TermsAndConditions';


function Alert(props: AlertProps) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

const LoginView = (props: any) => {
  return (
    <div className="CajaLogin">
      < div className="Login" >
        <Grid container component="main" className={props.classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={4} md={7} className={props.classes.image} />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <div
              className="MuiTypography-alignCenter footerLogin"
              style={{ paddingTop: '40px', marginBottom: '-40px', fontSize: '1.1rem' }}
            >
              <b>
                <span
                  style={{ fontSize: '1.2rem' }}
                >
                  TODOS LOS VIDEOS SON RECOMENDADOS POR MÉDICOS COLEGIADOS
                </span>
              </b>
            </div>
            <div className={props.classes.paper}>
              <img className="logoLogin" src="/images/logo-nuevo.png" alt="portada" />

              <form className={props.classes.form} noValidate>
                <Snackbar
                  open={props.errorSendMail}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  autoHideDuration={5000}
                  onClose={props.handleClose}
                  className="modalError"
                >
                  <Alert severity="error">Introduce todos los datos requeridos y acepta las condiciones</Alert>
                </Snackbar>

                <Snackbar
                  open={!props.datosSeguridad.access_token && props.datosSeguridad.error === 'LOGIN_ERROR'
                    && props.datosEstadoPromesa.promesaFinalizada && props.datosEstadoPromesa.finalizadoCorrecto}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  autoHideDuration={1000}
                  onClose={props.handleClose}
                  className="modalError"
                >
                  <Alert severity="error">Tu usuario o contraseña no son correctos</Alert>
                </Snackbar>

                <Snackbar
                  open={props.datosEstadoPromesa.promesaFinalizada && !props.datosEstadoPromesa.finalizadoCorrecto}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  autoHideDuration={5000}
                  onClose={props.handleClose}
                  className="modalError"
                >
                  <Alert severity="error">Ha ocurrido un error en el servidor. Contacte con su proveedor.</Alert>
                </Snackbar>

                <Snackbar
                  open={props.passNew !== props.passConfirm}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  autoHideDuration={5000}
                  onClose={props.handleClose}
                  className="modalError"
                >
                  <Alert severity="error">Debe introducir la misma contraseña en los 2 campos</Alert>
                </Snackbar>


                <div hidden={props.necesitaCambiarContrasena()}>
                  <div className="inputLogin">
                    <TextField
                      variant="filled"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Usuario / Erabiltzailea"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={props.username}
                      onKeyDown={event => props.handleLoginKeyDown(event)}
                      onChange={event => props.setUsername(event.target.value)}
                    />
                    <TextField
                      variant="filled"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Contraseña / Pasahitza"
                      type={props.showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      value={props.pass}
                      onKeyDown={event => props.handleLoginKeyDown(event)}
                      onChange={props.handleChangePassword}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={props.handleClickShowPassword}
                              onMouseDown={props.handleMouseDownPassword}
                              edge="end"
                            >
                              {props.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>

                  {/*<div className="checkboxLogin">
                        <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Recuérdame / Gogorarazi"
                        />
                        </div>*/}

                  <div className="botonEntrar">
                    {
                      props.datosSeguridad.access_token
                        ?
                        <Loading height="100" />
                        :
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={props.classes.submit}
                          onClick={
                            (e) => {
                              e.preventDefault();
                              props.doLogin(props.username, props.pass)
                              props.setFirstTime(false);
                            }
                          }
                        >
                          ENTRAR / SARTU
                        </Button>
                    }

                  </div>

                </div>


                <div className="actualizarPass" hidden={!props.necesitaCambiarContrasena()}>
                  <span>{props.loginModalPassNueva}</span>
                </div>

                <div hidden={!props.necesitaCambiarContrasena()}>

                  <div className="inputLogin">
                    <TextField
                      variant="filled"
                      margin="normal"
                      fullWidth
                      id="emailCambiarPass"
                      label="Contraseña Nueva / Pasahitza Berria"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      error={props.errorPassword()}
                      type={props.showPassword ? "text" : "password"}
                      value={props.passNew}
                      onChange={props.handleChangeNewPassword}
                      required
                      onKeyDown={event => props.handleChangePassKeyDown(event)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={props.handleClickShowPassword}
                              onMouseDown={props.handleMouseDownPassword}
                              edge="end"
                            >
                              {props.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                    <TextField
                      variant="filled"
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Confirmar Contraseña/ Baieztatu Pasahitza"
                      error={props.errorPasswordConfirm()}
                      type={props.showPassword ? "text" : "password"}
                      id="passwordCambiarPass"
                      autoComplete="current-password"
                      value={props.passConfirm}
                      onChange={props.handleChangePasswordConfirm}
                      required
                      onKeyDown={event => props.handleChangePassKeyDown(event)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={props.handleClickShowPassword}
                              onMouseDown={props.handleMouseDownPassword}
                              edge="end"
                            >
                              {props.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  </div>

                  <div className="botonEntrar2">
                    <div className="botonEntrar">
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={props.classes.submit}
                        onClick={
                          (e) => {
                            e.preventDefault();
                            props.savePwd();
                            props.setFirstTime(false);
                          }
                        }
                      >
                        ENTRAR / SARTU
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="MuiTypography-alignCenter footerLogin">
              <span>Si eres un médico y quieres formar parte de Trailumed, </span>
              <Link
                style={{ fontSize: '1.1rem' }}
                id="joinLink"
                className="footerLogin"
                onClick={props.handleClickOpenDialog}
                underline="hover"
                component="button"
                variant="body2"
              >
                haz click aquí
              </Link>
            </div>
          </Grid>
        </Grid>

      </div >

      <PiePaginaLogin />
      <CookieBanner
        styles={{
          dialog: {
            position: 'absolute',
            bottom: '0',
            zIndex: '100000',
            backgroundColor: '#f8f7f7',
            padding: '10px',
            width: '100%'
          },
          selectPane: {
            display: 'none'
          },
        }}
        message="Este portal web únicamente utiliza cookies propias con finalidad técnica, no recaba ni cede datos de carácter personal de los usuarios sin su conocimiento. Sin embargo, contiene enlaces a sitios web de terceros con políticas de privacidad ajenas a esta web, que usted podrá decidir si acepta o no cuando acceda a ellos."
        wholeDomain={true}
        acceptButtonText='Acepto'
        privacyPolicyLinkText='Más información'
        policyLink='../PoliticaCookies'
        onAccept={() => { }}
        onAcceptPreferences={() => { }}
        onAcceptStatistics={() => { }}
        onAcceptMarketing={() => { }}
        showPreferencesOption={false}
        showStatisticsOption={false}
        showMarketingOption={false}
      />

      <Dialog open={props.usuarioInactivo} onClose={props.doResetInactiveUser}>
        <DialogTitle id="form-dialog-title">¡USUARIO INACTIVO!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            El usuario con el que intentas acceder está inactivo en este momento, para activarlo debe seguir las instrucciones que se mandaron a su correo electrónico. Una vez activo podrá iniciar sesión.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="botonEntrarContainer">
          <Button
            className="linkAlLogin"
            fullWidth
            color="primary"
            onClick={props.doResetInactiveUser}
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={props.successRegister} onClose={props.handleSuccessRegisterDialog}>
        <DialogTitle id="form-dialog-title">¡Bienvenido a TRAILU!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.successRegisterText}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="botonEntrarContainer">
          <Button
            className="linkAlLogin"
            fullWidth
            color="primary"
            onClick={props.handleSuccessRegisterDialog}
          >
            CERRAR
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={props.openAccountVerified} onClose={props.handleCloseDialog}>
        <DialogTitle id="form-dialog-title">¡Cuenta verificada!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¡Enhorabuena!, tu cuenta ha sido verificada. Para acceder a la aplicación haz click en enlace que se muetra debajo o haz click fuera de este mensaje
          </DialogContentText>
        </DialogContent>
        <DialogActions className="botonEntrarContainer">
          <Button
            className="linkAlLogin"
            fullWidth
            color="primary"
            onClick={props.handleCloseDialog}
          >
            LLÉVAME AL INICIO DE SESIÓN
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={props.openAlreadyVerified} onClose={props.handleCloseDialog}>
        <DialogTitle id="form-dialog-title">¡Vaya!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tu cuenta ya fue verificada, no hace falta que vuelvas a hacer este paso.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="botonEntrarContainer">
          <Button
            className="linkAlLogin"
            fullWidth
            color="primary"
            onClick={props.handleCloseDialog}
          >
            LLÉVAME AL INICIO DE SESIÓN
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={props.open} onClose={props.handleCloseDialog} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Únete a TRAILUmed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Para entrar a formar parte de TRAILUmed, rellena el siguiente formulario:
              </DialogContentText>
          <div className="inputRegister">
            <TextField
              id="nombreDialog"
              label="Nombre"
              type="text"
              variant="filled"
              margin="normal"
              fullWidth
              name="nombreDialog"
              autoFocus
              value={props.newNombre}
              onChange={props.handleRegisterInputChange}
              inputProps={{ maxLength: 20 }}
              error={props.errorNombreInvalid}
              helperText={props.errorNombreInvalid ? "Escribe un mínimo de 3 caracteres" : ""}
            />
            <TextField
              id="apellidosDialog"
              label="Apellidos"
              type="text"
              variant="filled"
              margin="normal"
              fullWidth
              name="apellidosDialog"
              value={props.newApellido}
              onChange={props.handleRegisterInputChange}
              inputProps={{ maxLength: 30 }}
              error={props.errorApellidoInvalid}
              helperText={props.errorApellidoInvalid ? "Escribe un mínimo de 3 caracteres" : ""}
            />
            <TextField
              id="emailDialog"
              label="Email"
              variant="filled"
              margin="normal"
              fullWidth
              name="emailDialog"
              type="email"
              value={props.newEmail}
              onChange={props.handleRegisterInputChange}
              inputProps={{ maxLength: 30 }}
              error={props.errorEmailInvalid}
              helperText={props.errorEmailInvalid ? props.errorEmailInvalidText : ""}
            />
            <TextField
              id="newUsernameDialog"
              label="Nombre de usuario"
              variant="filled"
              margin="normal"
              fullWidth
              name="newUsernameDialog"
              type="text"
              value={props.newUsername}
              onChange={props.handleRegisterInputChange}
              inputProps={{ maxLength: 20 }}
              error={props.errorUserExists}
              helperText={props.errorUserExists ? props.errorUserExistsText : ""}
            />
            <TextField
              id="newPasswordDialog"
              label="Contraseña"
              variant="filled"
              margin="normal"
              fullWidth
              name="newPasswordDialog"
              type="password"
              value={props.newPassword}
              onChange={props.handleRegisterInputChange}
              inputProps={{ maxLength: 24 }}
              error={props.errorPass}
              helperText={props.errorPass ? props.errorPassText : ""}
            />
            <TextField
              id="newConfirmPasswordDialog"
              label="Confirmar contraseña"
              variant="filled"
              margin="normal"
              fullWidth
              name="newConfirmPasswordDialog"
              type="password"
              value={props.newPasswordConfirm}
              onChange={props.handleRegisterInputChange}
              inputProps={{ maxLength: 24 }}
            />
          </div>
          <div className="categoriasForm" style={props.isMedico ? { "display": "block" } : { "display": "none" }}>
            <TextField
              id="numColegiadoDialog"
              label="Nº colegiado"
              type="text"
              variant="filled"
              margin="normal"
              fullWidth
              name="numColegiadoDialog"
              autoFocus
              value={props.numeroColegiadoMedico}
              onChange={props.handleRegisterInputChange}
            />
            <Autocomplete
              id="combo-option-provincia"
              value={props.provincia}
              options={(props.provincias.sort((a, b) => a.nombre.localeCompare(b.nombre)))}
              getOptionLabel={provincia => (provincia.nombre)}
              onChange={(event: any, value: any) => {
                props.handleChangeProvincia(value);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={props.altaEditarProvincia}
                  variant="filled"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </div>
          <FormControlLabel
            control={<Checkbox value={props.condicionesAceptadas} color="primary" onChange={props.handleChangeRol} />}
            label="Soy médico colegiado"
            checked={props.isMedico}
          />
          <div className="checkboxLogin">
            <FormControlLabel
              control={<Checkbox value={props.condicionesAceptadas} color="primary" onChange={props.handleCondicionesAceptadas} />}
              label="He leído y acepto"
            />
            <Link
              style={{ fontSize: '1.1rem' }}
              id="joinLink"
              className="footerLogin"
              onClick={props.handleClickOpenCondicionesDialog}
              underline="hover"
              component="button"
              variant="body2"
            >
              Leer condiciones
            </Link>
          </div>
        </DialogContent>
        <DialogActions className="botonEntrarContainer">
          <div className="botonesRegistrar">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={props.classes.submit}
              onClick={props.handleCloseDialog}
            >
              Cerrar
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={props.classes.submit}
              onClick={props.handleSendMail}
              disabled={props.errorEmailInvalid || props.errorUserExists || props.errorNombreInvalid || props.errorApellidoInvalid}
            >
              Unirse
            </Button>
          </div >
        </DialogActions>
      </Dialog>
      <Dialog open={props.openCondiciones} onClose={props.handleCloseCondicionesDialog} aria-labelledby="form-dialog-title" fullWidth={true} maxWidth="lg">
        <DialogTitle id="form-dialog-title">CONDICIONES DE ADHESIÓN A LA PLATAFORMA TRAILUMED 2020 SL PARA PROFESIONALES MÉDICOS</DialogTitle>
        <DialogContent>
          <TermsAndConditions />
        </DialogContent>
        <DialogActions>
          <div className="botonEntrar2">
            <div className="botonEntrar">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={props.classes.submit}
                onClick={props.handleCloseCondicionesDialog}
              >
                OK
              </Button>
            </div >
          </div >
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default LoginView;