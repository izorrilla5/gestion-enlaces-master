import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Rol } from 'src/rol/rol.entity';
import { Lista } from 'src/lista/lista.entity';
import { Enlace } from 'src/enlace/enlace.entity';
import { Idioma } from 'src/idioma/idioma.entity';
import { Provincia } from 'src/provincia/provincia.entity';

@Entity('usuario')
export class Usuario {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  nombre: string;

  @ApiProperty()
  @Column()
  apellidos: string;

  @ApiProperty()
  @Column()
  username: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  pwd: string;

  @ApiProperty()
  @Column()
  codigoConfirmacion: string;

  @ManyToOne(type => Rol, {eager: true})
  @JoinColumn({ name: 'idRol', referencedColumnName: 'id'})
  rol: Rol;

  @ApiProperty()
  @Column()
  activo: boolean;

  @OneToMany(type => Lista, lista => lista.usuario, {eager: true})
  @JoinColumn({ referencedColumnName: 'id'})
  listas: Lista[];

  @OneToMany(type => Enlace, enlace => enlace.usuario, {eager: true})
  @JoinColumn({ referencedColumnName: 'id'})
  enlaces: Enlace[];

  @ApiProperty()
  @Column({nullable: false, default: 1})
  idIdiomaSeleccionado: number;

  @ManyToOne(type => Idioma, {eager: true})
  @JoinColumn({ name: 'idIdiomaSeleccionado', referencedColumnName: 'id'})
  idiomaSeleccionado: Idioma;

  @ApiProperty()
  @Column({nullable: false, default:  true})
  necesitaCambiarContrasena: boolean;

  @ApiProperty()
  @Column({nullable: true, default: ''})
  colegiado: string;

  @ManyToOne(type => Provincia, {eager: true})
  @JoinColumn({ name: 'idProvincia', referencedColumnName: 'id'})
  provincia: Provincia;
}
