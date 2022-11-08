import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Tag } from './tag.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TagService extends TypeOrmCrudService<Tag> {

    constructor(@InjectRepository(Tag) repo) {
        super(repo);
    }
}
