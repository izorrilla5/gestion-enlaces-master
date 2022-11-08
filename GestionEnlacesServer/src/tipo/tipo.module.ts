import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipo } from './tipo.entity';
import { TipoController } from './tipo.controller';
import { TipoService } from './tipo.service';
import { TraduccionModule } from 'src/traduccion/traduccion.module';

@Module({
    imports: [TypeOrmModule.forFeature([Tipo]), TraduccionModule],
    controllers: [TipoController],
    providers: [TipoService],
})
export class TipoModule { }
