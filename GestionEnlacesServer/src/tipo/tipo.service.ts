import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Tipo } from './tipo.entity';

@Injectable()
export class TipoService extends TypeOrmCrudService<Tipo> {
    /*
    constructor(
        @InjectRepository(Tipo)
        private readonly tipoEnlaceRepository: Repository<Tipo>,
    ) { }
*/
    constructor(@InjectRepository(Tipo) repo) {
        super(repo);
    }

    /*
    async findAll(): Promise<Tipo[]> {
        return this.tipoEnlaceRepository.find();
    }*/

}