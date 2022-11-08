import * as React from 'react';
import { connect } from 'react-redux';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { LogoMenu } from './LogoMenu';
import { MenuPrivado } from './MenuPrivado';
import { PiePagina } from './PiePagina';
import MenuPublico from './MenuPublico';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';

type AcercaDeTrailuMedProps = IEstadoAplicacion & AcercaDeTrailuMedDispatchProps;

interface AcercaDeTrailuMedDispatchProps {

}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({

});


const _AcercaDeTrailuMed = (props: AcercaDeTrailuMedProps) => {
    

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
                    <h1> Datos personales </h1>
                    <p>A través de este sitio web no se recaban datos de carácter personal de los usuarios sin su conocimiento, ni se ceden a terceros.</p>
                    <br/>
                    <p>Con la finalidad de ofrecerle el mejor servicio y con el objeto de facilitar el uso, se analizan el número de páginas visitadas, el número de visitas, así como la actividad de los visitantes y su frecuencia de utilización. A estos efectos, TRAILUMED 2020 utiliza la información estadística elaborada por el Proveedor de Servicios de Internet.</p>
                    <br/>
                    <p>TRAILUMED 2020 únicamente utiliza cookies propias, de sesión, con finalidad técnica (aquellas que permiten al usuario la navegación a través del sitio web y la utilización de las diferentes opciones y servicios que en ella existen).</p>
                    <br/>
                    <p>El portal del que es titular TRAILUMED 2020 podría contener enlaces a sitios web de terceros, cuyas políticas de privacidad son ajenas a la de TRAILUMED 2020. Al acceder a tales sitios web usted puede decidir si acepta sus políticas de privacidad y de cookies. Con carácter general, si navega por internet usted puede aceptar o rechazar las cookies de terceros desde las opciones de configuración de su navegador.</p>
                    <br/>
                    <h2>Información básica sobre protección de datos</h2><br/>
                    <p>A continuación, le informamos sobre la política de protección de datos de TRAILUMED 2020.</p>
                    <br/><h3>Responsable del tratamiento</h3>
                    <br/><p>Los datos de carácter personal que se pudieran recabar directamente del interesado serán tratados de forma confidencial y quedarán incorporados a la correspondiente actividad de tratamiento titularidad de TRAILUMED 2020.</p>
                    <br/><h3>Finalidad</h3>
                    <br/><p>La finalidad del tratamiento de los datos corresponde a cada una de las actividades de tratamiento que realiza TRAILUMED 2020 conforme al contrato de prestación suscrito con los interesados o con su consentimiento.</p>
                    <br/><h3>Legitimación</h3>
                    <br/><p>El tratamiento de sus datos se realiza para el cumplimiento de la relación contractual u obligaciones legales por parte de TRAILUMED 2020, así como cuando la finalidad del tratamiento requiera el consentimiento del interesado, que habrá de ser prestado mediante una clara acción afirmativa.</p>
                    <br/><h3>Conservación de datos</h3>
                    <br/><p>Los datos personales proporcionados se conservarán durante el tiempo necesario para cumplir con la finalidad para la que se recaban y para determinar las posibles responsabilidades que se pudieran derivar de la finalidad, además de los períodos establecidos en la normativa de archivos y documentación cuando sea legalmente exigible.</p>

                    <br/><h3>Comunicación de datos</h3>
                    <br/><p>Con carácter general no se comunicarán los datos personales a terceros, salvo obligación legal, entre las que pueden estar Jueces y Tribunales o Administración.</p>
                    <br/><h3>Derechos de los interesados</h3>
                    <br/><p> Cualquier persona tiene derecho a obtener confirmación sobre los tratamientos que de sus datos se llevan a cabo por TRAILUMED 2020. Puede ejercer sus derechos de acceso, rectificación, supresión y portabilidad de sus datos, de limitación y oposición a su tratamiento, así como a no ser objeto de decisiones basadas únicamente en el tratamiento automatizado de sus datos, cuando procedan, ante TRAILUMED 2020, C/. Udaberria, 14-00, 48992 de Getxo (Bizkaia).</p>

                </div>
            </div>
            <PiePagina />

        </div>
    )
}


export const AcercaDeTrailuMed = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AcercaDeTrailuMed);

export default AcercaDeTrailuMed;