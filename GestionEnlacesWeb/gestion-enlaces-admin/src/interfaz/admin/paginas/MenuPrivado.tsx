import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { logoutRequest } from 'interfaz/seguridad/acciones/creators/logout-saga.action.creator';
import { mainPage, listasPage } from '../enlaces/acciones/creators/enlaces.action.creator';
import ResponsiveMenu from 'react-responsive-navbar';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useTranslation } from 'react-i18next';
import Select from "react-select";
import { useState } from 'react';
import { navigateToUsuariosPage, obtenerDatosUsuario } from '../usuarios/acciones/creators/usuarios.action.creator';
import { cambiarIdIdiomaUsuario } from 'interfaz/seguridad/acciones/creators/seguridad.action.creator';
import { IUsuario } from 'dominio/usuario';
import { getLoggedUserData, isLogged } from 'infraestructura/auth/auth-manager';
import { getIdiomas } from 'infraestructura/auth/app-data-manager';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons'

interface AdminDispatchProps {
  doLogout(): any;
  doNavigateToPrivatePage(): any;
  doNavigateToListasPage(): any;
  doNavigateToUsuariosPage(): any;
  doNavigateToUsuarioDetail(usuario: IUsuario, perfilUsuario:boolean): any;
  doChangeLanguage(accessToken: string, usuario: IUsuario): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doLogout: () => {
    dispatch(logoutRequest())
  },
  doNavigateToPrivatePage: () => {
    dispatch(mainPage(1))
  },
  doNavigateToListasPage: () => {
    dispatch(listasPage(1))
  },
  doNavigateToUsuariosPage: () => {
    dispatch(navigateToUsuariosPage())
  },
  doNavigateToUsuarioDetail: (usuario: IUsuario, perfilUsuario: boolean) => {
    dispatch(obtenerDatosUsuario(usuario, perfilUsuario));
  },
  doChangeLanguage: (accessToken: string, usuario: IUsuario) => {
    if (usuario.idIdiomaSeleccionado) {
      dispatch(cambiarIdIdiomaUsuario(accessToken, usuario))
    }
  }
});


type MenuPrivadoProps = IEstadoAplicacion & AdminDispatchProps;



const _MenuPrivado = function prueba(props: MenuPrivadoProps) {

  const { i18n } = useTranslation();

  const { t } = useTranslation();
  const menuEnlaces = t("translation:menu.enlaces");
  const menuListas = t("translation:menu.listas");
  const menuUsuarios = t("translation:menu.usuarios");
  /*const menuCategorias = t("translation:menu.categorias");*/

  /*   
    const [clase, setClase] = React.useState('menu');
  
    const handleClase = () => {
      setClase('scrollFix');
    };
  
    const handleQuitarClase = () => {
      setClase('scroll');
    };
  
    function handleScroll(event:any) {
      let scrollTop = event.srcElement.scrollingElement.scrollTop;
    
       
          if(scrollTop > 5){
            handleClase();
          } else{
            handleQuitarClase();
          }
    }
  
    React.useEffect(() => {
  
      window.addEventListener('scroll', handleScroll);
  
      setClase('scroll');
    }); 
   */

  // estilo select idioma

  const customStyles = {

    option: (provided, state) => ({
      ...provided,
      borderBottom: 'none',
      color: state.isSelected ? '#23ada9' : 'rgb(90, 90, 90);',
      backgroundColor: state.isFocused ? '' : '',
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
      borderRadius: state.isFocused ? 0 : 0,
      borderColor: state.isFocused ? "transparent" : "transparent",
      boxShadow: state.isFocused ? null : null,
      backgroundColor: 'transparent',
      cursor: 'pointer',
      "&:hover": {
        borderColor: state.isFocused ? "transparent" : "transparent",
        boxShadow: 'none'
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

  const onChangeLanguage = (lng: string) => {
    i18n.changeLanguage(lng.toLowerCase());
  }

  const [selectedOption, setSelectedOption] = useState();

  const handleTypeSelect = e => {
    const codIdioma = e.codigo || e.value;

    if (e.value && getIdiomas() != undefined) {
      let usuario: IUsuario = Object.assign({ id: getLoggedUserData().sub, idIdiomaSeleccionado: getIdiomas().find(x => x.codigo == e.value)?.id });
      props.doChangeLanguage(props.datosSeguridad.access_token, usuario);
    }

    setSelectedOption(codIdioma);
    onChangeLanguage(codIdioma);
  };


  let usuarioSession: IUsuario = Object.assign({ id: Number(getLoggedUserData().sub)});
  let perfilUsuario = true;
 

  return (

    <ResponsiveMenu
      menuOpenButton={< MenuIcon />}
      menuCloseButton={< CloseIcon />}
      changeMenuOn="800px"
      largeMenuClassName="menu"
      smallMenuClassName="menuResponsive"
      menu={


        < ul className="navBar" >
          <div className="cajaLogo">
            <img className="logo" src="/images/logo-nuevo.png" alt="portada" onClick={(e) => { e.preventDefault(); props.doNavigateToPrivatePage(); }} />
          </div>

          {isLogged() ?
          <div className="cajaTabs">
            <li onClick={(e) => { e.preventDefault(); props.doNavigateToPrivatePage(); }}> {menuEnlaces} </li>
            <li onClick={(e) => { e.preventDefault(); props.doNavigateToListasPage(); }}>{menuListas}</li>
            {getLoggedUserData().rol.id === 3 ?
              <li onClick={(e) => { e.preventDefault(); props.doNavigateToUsuariosPage(); }}>{menuUsuarios}</li> :
              null
            }
            {/*<li>{menuCategorias}</li>*/}




            <li>
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
            </li>
            <li className="iconoUser">
              <FontAwesomeIcon icon={faUserCircle} onClick={(e) => { e.preventDefault(); props.doNavigateToUsuarioDetail(usuarioSession, perfilUsuario) }} />
            </li>
            <li>
              <div className="logout">
                <FontAwesomeIcon icon={faSignOutAlt} onClick={(e) => { e.preventDefault(); props.doLogout() }} />
              </div>
            </li>


          </div>
          : null }
        </ul >


      }
    />
  );
}



{/* 
        <div className="menu" id="myMenu" >
        <div className={clase}> 

      <header className="caja-navBar">

        <img className="App-logo" alt="trailu" />


        <ul className="navBar">
          <li onClick={(e) => { e.preventDefault(); props.doNavigateToPrivatePage(); }}> ENLACES </li>
          <li>LISTAS</li>
          <li>USUARIOS</li>
          <li>CATEGORÍAS</li>

          </ul>

        <span className="logout">
          <span hidden={true}>
            {props.datosSeguridad.usuario}
          </span>
          <ExitToAppIcon className="logout" onClick={(e) => { e.preventDefault(); props.doLogout() }} />
        </span>

      </header>
    </div>
     </div>  
  );
} */}




export const MenuPrivado = connect(
  mapStateToProps,
  mapDispatchToProps
)(_MenuPrivado);

export default MenuPrivado;
