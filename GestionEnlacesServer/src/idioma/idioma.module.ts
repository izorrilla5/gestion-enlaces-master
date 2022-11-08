import { Module } from '@nestjs/common';
import { IdiomaController } from './idioma.controller';
import { IdiomaService } from './idioma.service';
import { TraduccionModule } from 'src/traduccion/traduccion.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idioma } from './idioma.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Idioma]), TraduccionModule],
  providers: [IdiomaService],
  controllers: [IdiomaController],
  exports: [IdiomaService],
})
export class IdiomaModule {}
