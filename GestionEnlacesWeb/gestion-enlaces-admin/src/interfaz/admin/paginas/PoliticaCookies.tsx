import * as React from 'react';
import { connect } from 'react-redux';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { LogoMenu } from './LogoMenu';
import { MenuPrivado } from './MenuPrivado';
import { PiePagina } from './PiePagina';
import MenuPublico from './MenuPublico';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';

type PoliticaCookiesProps = IEstadoAplicacion & PoliticaCookiesPropsDispatchProps;

interface PoliticaCookiesPropsDispatchProps {

}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({

});


const _PoliticaCookies = (props: PoliticaCookiesProps) => {
    
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
                    <h1> Política de cookies </h1>
                    <p>A través de este sitio web no se recaban datos de carácter personal de los usuarios sin su conocimiento y consentimiento, ni se ceden a terceros.
                    </p><br/>
                    <p>Con la finalidad de ofrecerle el mejor servicio y con el objeto de facilitar el uso, es posible que se analicen el número de páginas visitadas, el número de visitas, así como la actividad de los visitantes y su frecuencia de utilización. A estos efectos, el titular de este sitio web utiliza la información estadística elaborada por el Proveedor de Servicios de Internet.
                    </p><br/>
                    <p>El titular de este sitio web no utiliza cookies para recoger información de los usuarios, ni registra las direcciones IP de acceso. Únicamente se utilizan cookies propias, de sesión, con finalidad técnica (aquellas que permiten al usuario la navegación a través del sitio web y la utilización de las diferentes opciones y servicios que en ella existen).
                    </p><br/>
                    <p>El portal del titular de este sitio web contiene enlaces a sitios web de terceros, cuyas políticas de privacidad son ajenas al titular de este sitio web. Al acceder a tales sitios web usted puede decidir si acepta sus políticas de privacidad y de cookies. Con carácter general, si navega por internet usted puede aceptar o rechazar las cookies de terceros desde las opciones de configuración de su navegador.
                    </p><br/>
                </div>
            </div>
            <PiePagina /> 

        </div>
    )
}


export const PoliticaCookies = connect(
    mapStateToProps,
    mapDispatchToProps
)(_PoliticaCookies);

export default PoliticaCookies;