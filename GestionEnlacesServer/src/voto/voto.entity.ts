import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Enlace } from 'src/enlace/enlace.entity';

@Entity('voto')
export class Voto {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  idEnlace: number;

  @ManyToOne(type => Enlace, enlace => enlace.votos)
  @JoinColumn({ name: 'idEnlace'})
  enlace: Enlace;

  @ApiProperty()
  @Column()
  valor: number;
}
