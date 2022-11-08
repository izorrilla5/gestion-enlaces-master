import { Module } from '@nestjs/common';
import { TraduccionService } from './traduccion.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Traduccion } from './traduccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Traduccion])],
  providers: [TraduccionService],
  exports: [TraduccionService],
})
export class TraduccionModule {}
