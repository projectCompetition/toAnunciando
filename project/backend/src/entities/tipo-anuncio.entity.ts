import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('tipo_anuncio', { schema: 'toanunciando' })
@Unique(['categoria_anuncio']) 
@Unique(['tipo_anuncio']) 
export class TipoAnuncio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 1, nullable: false })
  categoria_anuncio: string;

  @Column({ length: 1, nullable: false })
  tipo_anuncio: string;

  @Column({ nullable: true })
  saldo: number;

  @Column({ length: 200, nullable: true })
  descricao: string;

  @Column({ nullable: true })
  duracao_dia: number;
}