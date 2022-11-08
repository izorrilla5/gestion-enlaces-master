import { Module } from '@nestjs/common';
import { EnlaceService } from './enlace.service';
import { EnlaceController } from './enlace.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enlace } from './enlace.entity';
import { CategoriaModule } from '../categoria/categoria.module';
import { TraduccionModule } from 'src/traduccion/traduccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enlace]), CategoriaModule, TraduccionModule],
  providers: [EnlaceService],
  controllers: [EnlaceController],
  exports:[EnlaceService]
})
export class EnlaceModule {}
