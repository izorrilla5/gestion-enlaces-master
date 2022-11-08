import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToOne, JoinColumn, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Entidad } from 'src/entidad/entidad.entity';
import { Campo } from 'src/campo/campo.entity';
import { Idioma } from 'src/idioma/idioma.entity';

@Entity('traduccion')
/*@Index(['idTabla', 'idEntidad', 'idCampo', 'idIdioma'], { unique: true })*/
export class Traduccion {

  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @ApiProperty()
  idTabla: number;

  @Column()
  @ApiProperty()
  idEntidad: number;

  /*
  @ApiProperty()
  @OneToOne(type => Entidad)
  @JoinColumn({ name: 'idEntidad', referencedColumnName: 'id'})
  entidad: Entidad;*/

  @Column()
  @ApiProperty()
  idCampo: number;

  /*
  @ApiProperty()
  @OneToOne(type => Campo)
  @JoinColumn({ name: 'idCampo', referencedColumnName: 'id'})
  campo: Campo;*/

  @Column()
  @ApiProperty()
  idIdioma: number;

  /*
  @ApiProperty()
  @OneToOne(type => Idioma)
  @JoinColumn({ name: 'idIdioma', referencedColumnName: 'id'})
  idioma: Idioma;*/

  @ApiProperty()
  @Column()
  texto: string;
}
