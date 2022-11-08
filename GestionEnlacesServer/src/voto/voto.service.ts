import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Voto } from './voto.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class VotoService extends TypeOrmCrudService<Voto> {

    constructor(@InjectRepository(Voto) repo) {
        super(repo);
    }
}
