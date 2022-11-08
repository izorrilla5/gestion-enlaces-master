import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

const md5 = require('md5');

@Injectable()
export class EmailSenderService {
    constructor(
        private readonly mailerService: MailerService,
        private configService: ConfigService
    ) { }

    private EMAIL_FROM = this.configService.get('EMAIL_FROM') || "admon@trailu.es";
    private EMAIL_TO = this.configService.get('EMAIL_TO') || "admon@trailu.es";
    private API_URL = this.configService.get('API_URL') || "https://trailu.es";

    public sendJoinMail(body: any): any {
        if (body.numerocolegiado) { // Médico
            return this
                .mailerService
                .sendMail({
                    to: this.EMAIL_TO,
                    from: this.EMAIL_FROM,
                    subject: 'Nuevo acceso a TRAILUmed',
                    html: '<b>Nueva petición de acceso a TRAILUmed</b><p>Nombre: ' + body.nombre + " " + body.apellidos +
                        '</p><p>Nº Colegiado: ' + body.numerocolegiado +
                        '</p><p>Email: ' + body.email +
                        '</p><p>Provincia: ' + body.provincia + '</p>',
                })
                .then((resp) => {
                    console.log(resp);
                    return resp;
                })
                .catch((e) => {
                    console.error(e);
                    return e;
                });
        }
        else { // Usuario paciente
            const hashConfirmacion = md5(body.email + body.username);
            return this
                .mailerService
                .sendMail({
                    to: this.EMAIL_TO,
                    from: this.EMAIL_FROM,
                    subject: `Bienvenido a TRAILUmed`,
                    html:
                        `
                        <h3>Estos son tus datos de la nueva cuenta de TRAILUmed:</h3>
                        <p>
                            <b>Nombre:</b> ${body.nombre} ${body.apellidos}
                        </p>
                        <p>
                            <b>Nombre de usuario:</b> ${body.username}
                        </p>
                        <p>
                            <b>Email:</b> ${body.email}
                        </p>
                        <p>
                            Debes activar tu cuenta para poder usarla,
                            <a href="${this.API_URL}/api/usuario/confirm/${hashConfirmacion}">puedes activarla aquí</a>
                        </p>
                        `,
                })
                .then((resp) => {
                    console.log(resp);
                    return resp;
                })
                .catch((e) => {
                    console.error(e);
                    return e;
                });
        }
    }


    public sendContactMail(body: any): any {
        return this
            .mailerService
            .sendMail({
                to: this.EMAIL_TO,
                from: this.EMAIL_FROM,
                subject: body.asunto,
                html: '<b>Contacto con TrailuMed</b><p>Nombre: ' + body.nombre +
                    '</p><p>Email: ' + body.email +
                    '</p><p>Contenido: ' + body.cuerpo + '</p>',
            })
            .then((resp) => {
                console.log(resp);
                return resp;
            })
            .catch((e) => {
                console.error(e);
                return e;
            });
    }
}