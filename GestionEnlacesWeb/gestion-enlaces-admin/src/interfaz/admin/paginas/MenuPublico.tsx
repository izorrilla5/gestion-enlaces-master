import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { logoutRequest } from 'interfaz/seguridad/acciones/creators/logout-saga.action.creator';
import { useTranslation } from 'react-i18next';
import Select from "react-select";
import { useState } from 'react';
import { getIdiomas } from 'infraestructura/auth/app-data-manager';
import { IUsuario } from 'dominio/usuario';
import { getLoggedUserData, isLogged } from 'infraestructura/auth/auth-manager';
import { cambiarIdIdiomaUsuario } from 'interfaz/seguridad/acciones/creators/seguridad.action.creator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { mainPublicPage } from '../enlaces/acciones/creators/enlaces.action.creator';

interface AdminDispatchProps {
  doLogout(): any;
  doChangeLanguage(accessToken: string, usuario: IUsuario): any;
  doNavigateToPublicPage(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doLogout: () => {
    dispatch(logoutRequest())
  },
  doChangeLanguage: (accessToken: string, usuario: IUsuario) => {
    if (usuario.idIdiomaSeleccionado) {
      dispatch(cambiarIdIdiomaUsuario(accessToken, usuario))
    }
  },
  doNavigateToPublicPage: () => {
    dispatch(mainPublicPage())
  }
});

type MenuPublicoProps = IEstadoAplicacion & AdminDispatchProps;


const _MenuPublico = function prueba(props: MenuPublicoProps) {

  const customStyles = {

    option: (provided, state) => ({
      ...provided,
      borderBottom: 'none',
      color: state.isSelected ? '#23ada9' : 'rgb(90, 90, 90);',
      backgroundColor: state.isFocused ? 'rgba(255, 255, 255.0)' : 'rgba(255, 255, 255.0)',
      paddingRight: 5,
      paddingLeft: 5,
      border: 0,
      boxShadow: state.isFocused ? null : null,
      borderRadius: state.isFocused ? 0 : 0,
      "&:hover": {
        borderColor: state.isFocused ? "transparent" : "transparent"
      }
    }),

    container: base => ({
      ...base,
      width: 70,
      minWidth: 65,
      maxWidth: 100,
      display: 'inline-block',
      fontFamily: "Poppins",
      outline: "none",
      backgroundColor: 'transparent'
    }),

    control: (base, state) => ({
      ...base,
      backgroundColor: 'transparent',
      borderRadius: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? "transparent" : "transparent",
      boxShadow: state.isFocused ? null : null,
      cursor: 'pointer',
      "&:hover": {
        borderColor: state.isFocused ? "transparent" : "transparent"
      }
    }),

    indicatorSeparator: (provided, state) => ({
      ...provided,
      width: 'none',
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
      return { ...provided, opacity, transition };
    },

    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen && 'rotate(180deg)'
    })

  }

  // pidiendo datos select idioma

  React.useEffect(() => {
    handleTypeSelect(getIdiomas().find(x => x.id == getLoggedUserData().idIdiomaSeleccionado));
  }, []);


  const { i18n } = useTranslation();

  const onChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng.toLowerCase());
  }

  const [selectedOption, setSelectedOption] = useState();

  const handleTypeSelect = e => {
    if (e){
      const codIdioma = e.codigo || e.value;
  
      if (e.value && getIdiomas() != undefined) {
        let usuario: IUsuario = Object.assign({ id: getLoggedUserData().sub, idIdiomaSeleccionado: getIdiomas().find(x => x.codigo == e.value)?.id });
        props.doChangeLanguage(props.datosSeguridad.access_token, usuario);
      }
  
      setSelectedOption(codIdioma);
      onChangeLanguage(codIdioma);
    }
  };

  return (
    <div className="menuPublic" >

      <div className="caja-navBar">
        <div className="cajaLogo">
          <img className="logo" src="/images/logo-nuevo.png" alt="portada" onClick={(e) => { e.preventDefault(); props.doNavigateToPublicPage(); }} />
        </div>

        {isLogged() ?
          <div className="cajaLan-Log">
            <Select
              className="idioma-drop"
              styles={customStyles}
              options={getIdiomas().map(x => { return { value: x.codigo, label: x.codigo.toUpperCase() } })}
              onChange={handleTypeSelect}
              value={getIdiomas().map(x => { return { value: x.codigo, label: x.codigo.toUpperCase() } }).find(function (option) {
                return option.value === selectedOption;
              })}
              label="select idioma"
              isSearchable={false}
              autoFocus={false}
              placeholder="Idioma"
            />

            <div className="logout"><FontAwesomeIcon icon={faSignOutAlt} onClick={(e) => { e.preventDefault(); props.doLogout() }} /></div>
          </div> :
          null
        }

      </div>

    </div >

  );
}


export const MenuPublico = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MenuPublico);

export default MenuPublico;
