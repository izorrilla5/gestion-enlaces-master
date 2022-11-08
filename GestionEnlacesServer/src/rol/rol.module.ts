import { Module } from '@nestjs/common';
import { RolController } from './rol.controller';
import { RolService } from './rol.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './rol.entity';
import { TraduccionModule } from 'src/traduccion/traduccion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Rol]), TraduccionModule],
  controllers: [RolController],
  providers: [RolService],
})
export class RolModule {}
