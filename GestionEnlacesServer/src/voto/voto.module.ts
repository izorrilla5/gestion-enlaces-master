import { Module } from '@nestjs/common';
import { VotoService } from './voto.service';
import { VotoController } from './voto.controller';
import { Voto } from './voto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnlaceModule } from 'src/enlace/enlace.module';

@Module({
  imports: [TypeOrmModule.forFeature([Voto]), EnlaceModule],
  providers: [VotoService],
  controllers: [VotoController],
})
export class VotoModule {}
