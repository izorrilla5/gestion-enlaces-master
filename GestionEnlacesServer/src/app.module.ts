import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoModule } from './tipo/tipo.module';
import { RolModule } from './rol/rol.module';
import { TagModule } from './tag/tag.module';
import { EnlaceModule } from './enlace/enlace.module';
import { VotoModule } from './voto/voto.module';
import { CategoriaModule } from './categoria/categoria.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ListaModule } from './lista/lista.module';
import { AuthModule } from './auth/auth.module';
import { TraduccionModule } from './traduccion/traduccion.module';
import { EntidadModule } from './entidad/entidad.module';
import { CampoModule } from './campo/campo.module';
import { IdiomaModule } from './idioma/idioma.module';
import { ProvinciaModule } from './provincia/provincia.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { EmailSenderService } from './general/emailSender.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: "smtp.trailu.es",
        port: 465,
        secure: true,
        auth: {
          user: "admon@trailu.es",
          pass: "Tomytula5",
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: '"TrailuMed" <admon@trailu.es>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    TipoModule,
    RolModule,
    TagModule,
    EnlaceModule,
    VotoModule,
    CategoriaModule,
    UsuarioModule,
    ListaModule,
    AuthModule,
    TraduccionModule,
    EntidadModule,
    CampoModule,
    IdiomaModule,
    ProvinciaModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, EmailSenderService],
})
export class AppModule {
}
