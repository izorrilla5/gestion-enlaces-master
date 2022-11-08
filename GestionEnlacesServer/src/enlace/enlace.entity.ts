import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Tipo } from 'src/tipo/tipo.entity';
import { Voto } from 'src/voto/voto.entity';
import { Usuario } from 'src/usuario/usuario.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { Tag } from 'src/tag/tag.entity';
import { Lista } from 'src/lista/lista.entity';
import { Entidad } from 'src/entidad/entidad.entity';
import { Traduccion } from 'src/traduccion/traduccion.entity';

@Entity('enlace')
export class Enlace {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  titulo: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @ManyToOne(type => Tipo, {eager: true})
  @JoinColumn({ name: 'idTipo', referencedColumnName: 'id'})
  tipo: Tipo;

  @OneToMany(type => Voto, voto => voto.enlace, {eager: true, onDelete: 'CASCADE'})
  @JoinColumn({ referencedColumnName: 'id'})
  votos: Voto[];

  @ApiProperty()
  @Column()
  idUsuario: number;

  @ManyToOne(type => Usuario)
  @JoinColumn({ name: 'idUsuario', referencedColumnName: 'id'})
  usuario: Usuario;

  @ApiProperty()
  @Column()
  idCategoria: number;

  @ManyToOne(type => Categoria, {eager: true})
  @JoinColumn({ name: 'idCategoria', referencedColumnName: 'id'})
  categoria: Categoria;

  @ManyToMany(type => Tag, tag => tag.enlaces, {eager: true})
  @JoinTable({name: 'enlaceTag',
    joinColumn: {name: 'idEnlace', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'idTag', referencedColumnName: 'id'},
  })
  tags: Tag[];

  @ManyToMany(type => Lista, lista => lista.enlaces, {eager: true})
  listas: Lista[];

  @ApiProperty()
  @Column({nullable: true, default: null})
  fechaCreacion: Date;

  @ApiProperty()
  @Column({nullable: true, default: 0.0})
  mediaVotos: number = 0.0;

  @ApiProperty()
  @Column({nullable: false, default: false})
  patrocinado: boolean = false;

  @ApiProperty()
  @Column({nullable: false, default: 1})
  idEntidad: number;

  @ApiProperty()
  @ManyToOne(type => Entidad)
  @JoinColumn({ name: 'idEntidad', referencedColumnName: 'id'})
  entidad: Entidad;

  @ApiProperty()
  traducciones: Traduccion[] = [];

}
