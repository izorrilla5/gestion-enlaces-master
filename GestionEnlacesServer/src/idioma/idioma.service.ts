import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Idioma } from './idioma.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class IdiomaService extends TypeOrmCrudService<Idioma> {

    constructor(@InjectRepository(Idioma) repo) {
        super(repo);
    }
}