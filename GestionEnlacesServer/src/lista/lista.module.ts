import { Module } from '@nestjs/common';
import { ListaController } from './lista.controller';
import { ListaService } from './lista.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lista } from './lista.entity';
import { CategoriaModule } from './../categoria/categoria.module';
import { EnlaceModule } from './../enlace/enlace.module';
import { TraduccionModule } from 'src/traduccion/traduccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Lista]), CategoriaModule, EnlaceModule, TraduccionModule],
  controllers: [ListaController],
  providers: [ListaService],
  exports:[ListaService]
})
export class ListaModule {}
