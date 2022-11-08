import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Rol } from './rol.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RolService  extends TypeOrmCrudService<Rol> {

    constructor(@InjectRepository(Rol) repo) {
        super(repo);
    }
}
