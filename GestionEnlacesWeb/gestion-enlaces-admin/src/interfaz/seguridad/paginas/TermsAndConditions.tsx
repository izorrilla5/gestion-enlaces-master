import * as React from 'react';
import { DialogContentText } from "@material-ui/core"

import { part1, part2, part3, part4, part5, part6 } from './Terms';

const TermsAndConditions = () => {
  const generateList = (array: string[]) => {
    const list = array.map((p, index) => {
      return (
        p === "" ?
          <br />
          :
          <p key={index} style={p.charAt(0) == '-' ? { marginBottom: "0" } : { marginBottom: "5px" }}>{p}</p>
      )
    })
    return list;
  }

  const part1list = generateList(part1.paragraphs);
  const part2list = generateList(part2.paragraphs);
  const part3list = generateList(part3.paragraphs);
  const part4list = generateList(part4.paragraphs);
  const part5list = generateList(part5.paragraphs);
  const part6list = generateList(part6.paragraphs);

  return (
    <DialogContentText>
      <p>
        <b>{part1.title}</b>
      </p>
      <br />
      {part1list}
      <p>
        <b>{part2.title}</b>
      </p>
      <br />
      {part2list}
      <br />
      <p>
        <b>{part3.title}</b>
      </p>
      <br />
      {part3list}
      <br />
      <p>
        <b>{part4.title}</b>
      </p>
      <br />
      <p>
        {part4list}
      </p>
      <br />
      <p>
        <b>{part5.title}</b>
      </p>
      <br />
      <p>
        {part5list}
      </p>
      <br />
      <p>
        <b>{part6.title}</b>
      </p>
      <br />
      <p>
        {part6list}
      </p>
      <br />
      <p>
        INFORMACIÓN BÁSICA SOBRE PROTECCIÓN DE DATOS: En cumplimiento de la normativa
        legal vigente en materia de protección de datos personales, se le informa que El Responsable
        del Tratamiento de sus datos personales es TRAILUMED 2020, S.L. La Finalidad del
        tratamiento es materializar la relación contractual y la Legitimación es el contrato, o el
        consentimiento, cuando proceda. No se cederán los datos a terceros ni serán usados para
        otras finalidades, salvo los legalmente previstos o los necesarios para materializar la relación
        contractual. Puede ejercer sus Derechos a acceder, rectificar, oponerse, limitar, portar y
        suprimir los datos, escribiendo al titular del sitio. Ud. se responsabiliza de que los enlaces a
        otras páginas web que Ud. dé de alta en TRAILUmed no están protegidos por propiedad
        intelectual. Información adicional, visitando: http://www.trailu.es/AcercaDe. Puede contactar en
        cualquier momento con el Delegado de Protección de datos en dpd@trailumed.com, o escribir
        a Trailumed 2020, C/. Udaberria, 14, 48992. Getxo (Bizkaia)
        Las mismas obligaciones anteriores se aplican a la firma de este documento.
                </p>

    </DialogContentText>
  )
}


export default TermsAndConditions