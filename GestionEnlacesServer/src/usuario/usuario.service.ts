import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Usuario } from './usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsuarioService extends TypeOrmCrudService<Usuario> {

    constructor(@InjectRepository(Usuario) repo) {
        super(repo);
    }

    async confirmarCuenta(codigoConfirmacion: string) {
        const toUpdate = await this.repo.findOne({ codigoConfirmacion });
        if (toUpdate.activo) {
            return 0;
        }
        toUpdate.activo = true;
        this.repo.save(toUpdate)
        return 1;
    }
}
