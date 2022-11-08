import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Entidad } from 'src/entidad/entidad.entity';
import { Traduccion } from 'src/traduccion/traduccion.entity';

@Entity('rol')
export class Rol {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nombre: string;

  @ApiProperty()
  @Column({nullable: false, default: 6})
  idEntidad: number;

  @ApiProperty()
  @ManyToOne(type => Entidad)
  @JoinColumn({ name: 'idEntidad', referencedColumnName: 'id'})
  entidad: Entidad;

  @ApiProperty()
  traducciones: Traduccion[] = [];
}
