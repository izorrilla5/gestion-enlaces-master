import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Entidad } from 'src/entidad/entidad.entity';
import { Traduccion } from 'src/traduccion/traduccion.entity';

@Entity('idioma')
export class Idioma {

    @ApiProperty()
    @PrimaryColumn()
    id: number;

    @ApiProperty()
    @Column()
    codigo: string;

    @ApiProperty()
    @Column()
    nombre: string;

    @ApiProperty()
    @Column({nullable: false, default: 7})
    idEntidad: number;

    @ApiProperty()
    @ManyToOne(type => Entidad)
    @JoinColumn({ name: 'idEntidad', referencedColumnName: 'id'})
    entidad: Entidad;

    @ApiProperty()
    traducciones: Traduccion[] = [];
}
