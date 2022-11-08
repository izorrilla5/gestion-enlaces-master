import { Controller, UseGuards, Patch, Post, Put, Get, Body, Request, UseInterceptors, Inject, forwardRef, Req, Param, Res, Redirect } from '@nestjs/common';
import { Crud, Override, ParsedRequest, ParsedBody, CrudRequest, CrudController, CrudRequestInterceptor } from '@nestjsx/crud';
import { Usuario } from './usuario.entity';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioService } from './usuario.service';
import bcrypt = require('bcrypt');
import { Roles } from 'src/auth/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthService } from 'src/auth/auth.service';
import { UsuarioDto } from './usuario.dto';
import { ConfigService } from '@nestjs/config';

const md5 = require('md5');

@Crud({
    model: {
        type: Usuario,
    },
    routes: {
        exclude: ['createManyBase', 'replaceOneBase'],
        getOneBase: {
            decorators: [Roles('Administrador', 'Medico'), UseGuards(AuthGuard('jwt'), RolesGuard)],
        },
        getManyBase: {
            decorators: [Roles('Publico', 'Medico', 'Administrador'), UseGuards(AuthGuard('jwt'), RolesGuard)],
        },
        deleteOneBase: {
            decorators: [Roles('Administrador'), UseGuards(AuthGuard('jwt'), RolesGuard)],
        },
    },
    query: {
        exclude: ['pwd'],
        join: {
            rol: {
                eager: true,
            },
            provincia: {
                eager: true,
            } /*
            listas: {
                eager: true,
            },
            enlaces: {
                eager: true,
            },*/
        },
    },
})
@ApiTags('usuario')
@Controller('usuario')
export class UsuarioController implements CrudController<Usuario> {
    
    constructor(
        public service: UsuarioService,
        private authService: AuthService,
        private configService: ConfigService
    ) { }

    get base(): CrudController<Usuario> {
        return this;
    }

    private saltRounds = 10;
    private CLIENT_URL = this.configService.get<string>('CLIENT_URL') || "https://trailu.es";

    @Override()
    @Roles('Administrador')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    createOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Usuario,
    ) {
        const baseController = this.base;
        return bcrypt.hash(dto.pwd, this.saltRounds).then(function (hash) {
            dto.pwd = hash;
            dto.necesitaCambiarContrasena = true;
            return baseController.createOneBase(req, dto).then(user => {
                const { pwd, ...result } = user;
                return result;
            });
        });
    }

    @Override()
    @Roles('Publico', 'Medico', 'Administrador')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    updateOne(
        @ParsedRequest() req: CrudRequest,
        @ParsedBody() dto: Usuario,
    ) {
        const baseController = this.base;
        if (!dto.pwd) {
            return baseController.updateOneBase(req, dto).then(user => {
                const { pwd, ...result } = user;
                return result;
            });
        }

        return bcrypt.hash(dto.pwd, this.saltRounds).then(function (hash) {
            dto.pwd = hash;
            dto.necesitaCambiarContrasena = true;
            return baseController.updateOneBase(req, dto).then(user => {
                const { pwd, ...result } = user;
                return result;
            });
        });
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Put('update-pass')
    @Roles('Publico', 'Medico', 'Administrador')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    async actualizarPass(@ParsedRequest() req: CrudRequest, @Body() dto: any) {
        const baseController = this.base;
        const usuariosService = this.service;
        const authServ = this.authService;
        return bcrypt.hash(dto.pwd, this.saltRounds).then(function (hash) {
            dto.pwd = hash;
            dto.necesitaCambiarContrasena = false;
            return baseController.updateOneBase(req, dto)
                .then(user => {
                    return user;
                }).then(userBad => {
                    return usuariosService.findOne(
                        {
                            where:
                                { id: dto.id },
                        },
                    ).then(userFound => {
                        if (!userFound) {
                            return null;
                        }
                        const { pwd, ...result } = userFound;
                        return authServ.login(result);
                    });
                });
        });
    }

    @Get('check-user/:username')
    async checkUser(@Param('username') username: string) {
        const user = await this.service.findOne({ username });
        return user ? { existe: 1 } : { existe: 0 };
    }

    @Get('check-user-email/:email')
    async checkEmail(@Param('email') email: string) {
        const user = await this.service.findOne({ email });
        return user ? { existe: 1 } : { existe: 0 };
    }

    @UseInterceptors(CrudRequestInterceptor)
    @Post('register')
    async registrarUsuario(
        @ParsedRequest() req: CrudRequest,
        @Body() dto: UsuarioDto,
    ) {
        return await bcrypt.hash(dto.pwd, this.saltRounds).then(hash => {
            dto.pwd = hash;
            dto.codigoConfirmacion = md5(dto.email + dto.username);
            return this.service.createOne(req, dto);
        })
    }

    @Get('confirm/:codigoConfirmacion')
    async confirmarCuenta(
        @Param('codigoConfirmacion') codigoConfirmacion: string,
        @Res() res
    ) {
        const done = await this.service.confirmarCuenta(codigoConfirmacion);
        res.redirect(done ? `${this.CLIENT_URL}/Login?accountVerified=true` : `${this.CLIENT_URL}/Login?alreadyVerified=true`)
    }

    // TODO: Crear un nuevo método para actualizar solo el idioma y que lo puedan utilizar todos los roles
    // y capar el updateOne para que solo lo pueda utilizar el rol Administrador

}
