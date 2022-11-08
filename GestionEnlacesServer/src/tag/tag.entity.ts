import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Enlace } from 'src/enlace/enlace.entity';
import { Lista } from 'src/lista/lista.entity';
import { Entidad } from 'src/entidad/entidad.entity';
import { Traduccion } from 'src/traduccion/traduccion.entity';

@Entity('tag')
export class Tag {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nombre: string;

  @ManyToMany(type => Enlace, enlace => enlace.tags)
  enlaces: Enlace[];

  @ManyToMany(type => Lista, lista => lista.tags)
  listas: Lista[];

  @ApiProperty()
  @Column({nullable: false, default: 4})
  idEntidad: number;

  @ApiProperty()
  @ManyToOne(type => Entidad)
  @JoinColumn({ name: 'idEntidad', referencedColumnName: 'id'})
  entidad: Entidad;

  @ApiProperty()
  traducciones: Traduccion[] = [];
}
