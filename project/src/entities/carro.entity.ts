import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Anunciante } from './anunciante.entity'; // Import the related entity

@Entity({ schema: 'toanunciando', name: 'carros' })
export class Carro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Anunciante, (anunciante) => anunciante.carros, { nullable: false })
  @JoinColumn({ name: 'id_anunciante' })
  anunciante: Anunciante;

  @Column({ length: 100 })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  valor: number;

  @Column({ length: 40 })
  cidade: string;

  @Column({ length: 2 })
  uf: string;

  @Column({ length: 2 })
  pais: string;

  @Column({ length: 9, name: 'ano_fabricacao' })
  anoFabricacao: string;

  @Column({ type: 'int' })
  km: number;

  @Column({ length: 8 })
  placa: string;

  @Column({ length: 20 })
  marca: string;

  @Column({ length: 1, name: 'tipo_modelo' })
  tipoModelo: string;

  @Column({ length: 1 })
  combustivel: string;

  @Column({ length: 20 })
  cor: string;
}
