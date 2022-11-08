import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Enlace } from './enlace.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EnlaceService extends TypeOrmCrudService<Enlace> {

    constructor(@InjectRepository(Enlace) repo) {
        super(repo);
    }
}
