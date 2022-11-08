import * as React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import BusquedaPrivada from './BusquedaPrivada';
import Destacados from './Destacados';
import { crearNuevoEnlace } from '../enlaces/acciones/creators/enlaces.action.creator';
import { useTranslation } from 'react-i18next';
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface EnlacesAdminDispatchProps {
  doNavigateToEnlaceDetail(): any;
}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({
  doNavigateToEnlaceDetail: () => {
    dispatch(crearNuevoEnlace({ titulo: '', url: '', votos: [], tags: [] }, 1))
  }
});

type EnlacesAdminProps = IEstadoAplicacion & EnlacesAdminDispatchProps;




const _Admin = function prueba(props: EnlacesAdminProps) {

  const { t } = useTranslation();
  const enlacesPrivadoNuevo = t("translation:enlacesPrivado.nuevo");
  /*   const [clase, setClase] = React.useState('columnaDestacados');
  
    const handleClase = () => {
      setClase('scrollFix');
    };
  
    const handleQuitarClase = () => {
      setClase('scroll');
    };
  
    function handleScroll(event:any) {
      let scrollTop = event.srcElement.scrollingElement.scrollTop,
          itemTranslate = Math.min(0, scrollTop/3 - 240);
    
          console.log('scrollTop', event.srcElement.scrollingElement.scrollTop);
          console.log('itemTranslate', itemTranslate);
          if(itemTranslate === 0){
            handleClase();
            //setClase('columnaDestacados scrollFix');
          } else{
            handleQuitarClase();
          }
     
    }
  
    React.useEffect(() => {
  
      window.addEventListener('scroll', handleScroll);
  
    }); */
  /*
  var columnaFija = $("#columnaFija");

  columnaFija.on("scroll", function(e) {
      
    if (this.scrollTop > 120) {
      columnaFija.addClass("scrollFix");
    } else {
      columnaFija.removeClass("scrollFix");
    }
  });

});*/


  return (
    <div className="principal" >
      <div className="organizacionPrincipal">
        <div className="organizacionSecundaria">
          <BusquedaPrivada />
        </div>
        {/*   <div className={clase}> */}
        <div className="columnaDestacados">
          <div
            className="botonNuevo"
            onClick={(e) => {
              e.preventDefault();
              props.doNavigateToEnlaceDetail();
            }}
          >
            <span>
              {enlacesPrivadoNuevo}
            </span>
            <FontAwesomeIcon icon={faPen} />
          </div>
          <Destacados />
        </div>
      </div>
    </div>
    /*    </div > */

  );
}


export const EnlacesAdmin = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Admin);

export default EnlacesAdmin;
