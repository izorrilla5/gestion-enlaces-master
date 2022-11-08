import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';
import { TraduccionModule } from 'src/traduccion/traduccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tag]), TraduccionModule],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
