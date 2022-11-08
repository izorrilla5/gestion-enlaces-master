import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Traduccion } from './traduccion.entity';

@Injectable()
export class TraduccionService extends TypeOrmCrudService<Traduccion> {

    constructor(@InjectRepository(Traduccion) repo) {
        super(repo);
    }
}