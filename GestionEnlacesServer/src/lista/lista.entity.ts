import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Usuario } from 'src/usuario/usuario.entity';
import { Categoria } from 'src/categoria/categoria.entity';
import { Tag } from 'src/tag/tag.entity';
import { Enlace } from 'src/enlace/enlace.entity';
import { Entidad } from 'src/entidad/entidad.entity';
import { Traduccion } from 'src/traduccion/traduccion.entity';

@Entity('lista')
export class Lista {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nombre: string;

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

  @ManyToMany(type => Tag, tag => tag.listas)
  @JoinTable({name: 'listaTag',
    joinColumn: {name: 'idLista', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'idTag', referencedColumnName: 'id'},
  })
  tags: Tag[];

  @ManyToMany(type => Enlace, enlace => enlace.listas)
  @JoinTable({name: 'listaEnlace',
    joinColumn: {name: 'idLista', referencedColumnName: 'id'},
    inverseJoinColumn: {name: 'idEnlace', referencedColumnName: 'id'},
  })
  enlaces: Enlace[];

  @ApiProperty()
  @Column({nullable: false, default: 2})
  idEntidad: number;

  @ApiProperty()
  @ManyToOne(type => Entidad)
  @JoinColumn({ name: 'idEntidad', referencedColumnName: 'id'})
  entidad: Entidad;

  @ApiProperty()
  traducciones: Traduccion[] = [];
}
