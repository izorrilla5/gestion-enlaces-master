import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Lista } from './lista.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ListaService extends TypeOrmCrudService<Lista> {

    constructor(@InjectRepository(Lista) repo) {
        super(repo);
    }
}
