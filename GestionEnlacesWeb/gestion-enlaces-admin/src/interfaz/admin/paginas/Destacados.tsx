import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { List, ListItem, Divider } from '@material-ui/core';

import ListItemAvatar from '@material-ui/core/ListItemAvatar';

import { getUltimosEnlaces, getMasVotados, getEnlacesPatrocinados } from '../enlaces/acciones/creators/enlaces.action.creator';
import { ITipoEnlace } from 'dominio/tipo-enlace';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import LanguageIcon from '@material-ui/icons/Language';
import NoSimOutlinedIcon from '@material-ui/icons/NoSimOutlined';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useTranslation } from 'react-i18next';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';


interface DestacadosDispatchProps {
  getUltimosEnlaces(idIdiomaUsuario?: number): any;
  getMasVotados(idIdiomaUsuario?: number): any;
  getEnlacesPatrocinados(idIdiomaUsuario?: number): any;
}
const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  getUltimosEnlaces: (idIdiomaUsuario?: number) => {
    dispatch(getUltimosEnlaces(idIdiomaUsuario))
  },
  getMasVotados: (idIdiomaUsuario?: number) => {
    dispatch(getMasVotados(idIdiomaUsuario))
  },
  getEnlacesPatrocinados: (idIdiomaUsuario?: number) => {
    dispatch(getEnlacesPatrocinados(idIdiomaUsuario))
  }
});


type DestacadosProps = IEstadoAplicacion & DestacadosDispatchProps;



const _Destacados = (props: DestacadosProps) => {

  const { t } = useTranslation();
  const destacadosUltimos = t("translation:destacados.ultimos");
  const destacadosValorados = t("translation:destacados.valorados");
  const destacadosSinUltimos = t("translation:destacados.sinUltimos");
  const destacadosSinValorados = t("translation:destacados.sinValorados");

  React.useEffect(() => {
    props.getUltimosEnlaces(getLoggedUserData().idIdiomaSeleccionado);
    props.getMasVotados(getLoggedUserData().idIdiomaSeleccionado);
    props.getEnlacesPatrocinados(getLoggedUserData().idIdiomaSeleccionado);
  }, []);

  function openInNewTab(url: string) {
    url = url.match(/^http[s]?:\/\//) ? url : 'http://' + url;
    window.open(url, '_blank');
  }

  const iconosTipo = (tipo: ITipoEnlace | undefined) => {
    if (tipo == undefined) {
      return <NoSimOutlinedIcon />
    } else {
      if (tipo.id == 1) {
        return <LanguageIcon />
      } else if (tipo.id == 2) {
        return <PlayCircleOutlineIcon />
      } else if (tipo.id == 3) {
        return <VolumeUpIcon />
      }
    }
    return;
  }


  return (
    <div className="cajaDestacados" >

      <div className="enlacesPatrocinados">
        <h3>Enlaces patrocinados</h3>
        <Divider />
        {/* <p>{JSON.stringify(props.datosEnlaces.enlacesPatrocinados)}</p> */}
        {
          props.datosEnlaces.enlacesPatrocinados.length == 0 ?
            <div className="noResultado">No hay enlaces patrocinados</div>
            :
            <List component="nav" aria-label="mailbox folders">
              {props.datosEnlaces.enlacesPatrocinados.map((enlace, index) => (
                <div key={"en_" + enlace.id} >

                  <ListItem button disableRipple disableTouchRipple onClick={(event) => openInNewTab(enlace.url)}>

                    <div className="iconoDestacados">
                      <ListItemAvatar>
                        <div>
                          {iconosTipo(enlace.tipo)}
                        </div>
                      </ListItemAvatar>
                    </div>

                    <div className="titleNameDestacados"> {enlace.titulo} </div>

                  </ListItem>
                  {/*  <Divider light /> */}
                </div>))}
            </List>
        }
      </div>

      <div className="ultimosEnlaces">
        <h3>{destacadosUltimos}</h3>
        <Divider />
        {
            props.datosEnlaces.ultimosEnlaces.length == 0 ?
              <div className="noResultado">{destacadosSinUltimos}</div>
              :
              <List component="nav" aria-label="mailbox folders">
                {props.datosEnlaces.ultimosEnlaces.map((enlace, index) => (
                  <div key={"en_" + enlace.id} >

                    <ListItem button disableRipple disableTouchRipple onClick={(event) => openInNewTab(enlace.url)}>

                      <div className="iconoDestacados">
                        <ListItemAvatar>
                          <div>
                            {iconosTipo(enlace.tipo)}
                          </div>
                        </ListItemAvatar>
                      </div>

                      <div className="titleNameDestacados"> {enlace.titulo} </div>

                    </ListItem>
                  </div>))}
              </List>
        }
      </div>

      <div className="masVotados">
        <h3>{destacadosValorados}</h3>
        <Divider />
        {
          // props.datosEstadoPromesa.promesaFinalizada ?
          props.datosEnlaces.masVotadosEnlaces.length == 0 ?
            <div className="noResultado">{destacadosSinValorados}</div>
            :
            <List component="nav" aria-label="mailbox folders">
              {props.datosEnlaces.masVotadosEnlaces.map((enlace, index) => (
                <div key={"en_" + enlace.id} >

                  <ListItem button disableRipple disableTouchRipple onClick={(event) => openInNewTab(enlace.url)}>

                    <div className="iconoDestacados">
                      <ListItemAvatar>
                        <div>
                          {iconosTipo(enlace.tipo)}
                        </div>
                      </ListItemAvatar>
                    </div>

                    <div className="titleNameDestacados"> {enlace.titulo} </div>

                  </ListItem>

                </div>))}
            </List>
        }
      </div>

    </div >

  );
}


export const Destacados = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Destacados);

export default Destacados;
