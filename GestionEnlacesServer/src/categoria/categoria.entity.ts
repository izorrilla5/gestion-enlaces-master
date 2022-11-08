import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Entidad } from 'src/entidad/entidad.entity';
import { Traduccion } from 'src/traduccion/traduccion.entity';

@Entity('categoria')
export class Categoria {
  @ApiProperty()
  @PrimaryColumn()
  id: number;

  @ApiProperty()
  @Column()
  nombre: string;

  @ManyToOne(type => Categoria)
  @JoinColumn({ name: 'idCategoriaPadre', referencedColumnName: 'id' })
  padre: Categoria;

  @ApiProperty()
  @Column()
  idCategoriaPadre: number;
  
  @ApiProperty()
  @Column({nullable: false, default: 3})
  idEntidad: number;

  @ApiProperty()
  @ManyToOne(type => Entidad)
  @JoinColumn({ name: 'idEntidad', referencedColumnName: 'id'})
  entidad: Entidad;

  @ApiProperty()
  traducciones: Traduccion[] = [];
}
