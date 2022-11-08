import * as React from 'react';
import { connect } from 'react-redux';
import { IEstadoAplicacion } from 'dominio/estado/estado-aplicacion';
import { mapStateToProps } from 'configuracion/store/initial-state';
import { LogoMenu } from './LogoMenu';
import { MenuPrivado } from './MenuPrivado';
import { PiePagina } from './PiePagina';
import MenuPublico from './MenuPublico';
import { getLoggedUserData } from 'infraestructura/auth/auth-manager';

type AvisoLegalProps = IEstadoAplicacion & AvisoLegalDispatchProps;

interface AvisoLegalDispatchProps {

}

const mapDispatchToProps = (dispatch: React.Dispatch<any>) => ({

});


const _AvisoLegal = (props: AvisoLegalProps) => {
    
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
                    <h1> Aviso legal </h1>
                    <p> Este portal, cuyo titular es TRAILUMED 2020, con NIF B-02846954, domicilio c/Udaberia, 14 lonja, 48992-Getxo (Bizkaia), está constituido por este sitio web.</p>
                    <br/>
                    <h3> Propiedad intelectual e industrial </h3><br/>
                    <p>Este sitio web y sus códigos fuente, así como su logo, marca y demás signos distintivos que aparecen en el mismo pertenecen a TRAILUMED 2020 y están protegidos por los correspondientes derechos de propiedad intelectual e industrial.</p>
                    <br/>
                    <h3> Responsabilidad de los contenidos </h3><br/>
                    <p>TRAILUMED 2020 no se hace responsable de la legalidad de otros sitios web de terceros desde los que pueda accederse a este sitio ni tampoco responde por la legalidad de otros sitios web de terceros, que pudieran estar vinculados o enlazados desde este sitio web.</p>
                    <br/>
                    <p>TRAILUMED 2020 se reserva el derecho a realizar cambios en el sitio web sin previo aviso, al objeto de mantener actualizada su información, añadiendo, modificando, corrigiendo o eliminando los contenidos publicados o el diseño del portal.</p>
                    <br/>
                    <p>El titular de este sitio web no será responsable del uso que terceros hagan de la información publicada aquí, ni tampoco de los daños sufridos o pérdidas económicas que, de forma directa o indirecta, produzcan o puedan producir perjuicios económicos, materiales o sobre datos, provocados por el uso de dicha información.</p>
                    <br/>
                    <h3> Reproducción de contenidos </h3><br/>
                    <p>Se prohíbe la reproducción total o parcial de los contenidos publicados en este sitio web.  </p>
                    <br/>
                    <h3> Ley aplicable </h3><br/>
                    <p>La ley aplicable en caso de disputa o conflicto de interpretación de los términos que conforman este aviso legal, así como cualquier cuestión relacionada con los servicios del presente portal, será la ley española.</p>
                </div>
            </div>
            <PiePagina />

        </div>
    )
}


export const AvisoLegal = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AvisoLegal);

export default AvisoLegal;