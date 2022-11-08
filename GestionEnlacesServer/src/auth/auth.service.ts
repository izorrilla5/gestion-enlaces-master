import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import bcrypt = require('bcrypt');

@Injectable()
export class AuthService {

    constructor(private readonly usuariosService: UsuarioService,
        private readonly jwtService: JwtService) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usuariosService.findOne(
            {
                where:
                    { username: username },
            },
        );

        if (!user) {
            return null;
        }
        if (!user.activo) {
            return user;
        }

        const match = await bcrypt.compare(pass, user.pwd);
        if (match) {
            const { pwd, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            sub: user.id, nombre: user.nombre, username: user.username, email: user.email, rol: user.rol,
            idIdiomaSeleccionado: user.idIdiomaSeleccionado, necesitaCambiarContrasena: user.necesitaCambiarContrasena
        };
        const token = this.jwtService.sign(payload);
        return {
            access_token: token,
            refresh_token: token,
        };
    }

    async refreshToken(token: any) {
        return this.jwtService.verifyAsync(token)
            .then(decodedToken => {
                return this.usuariosService.findOne(
                    {
                        where:
                            { username: decodedToken.username },
                    },
                ).then(user => {
                    return this.login(user);
                });
            })
            .catch(err => {
                throw new HttpException(err, HttpStatus.UNAUTHORIZED);
            });
    }
}
