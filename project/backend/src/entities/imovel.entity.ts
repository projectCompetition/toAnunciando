import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Anunciante } from './anunciante.entity';
import { ImovelDetalhe } from './imovel-detalhe.entity';

@Entity({ schema: 'toanunciando', name: 'imovel' })
export class Imovel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Anunciante, (anunciante) => anunciante.imoveis, { nullable: false })
  @JoinColumn({ name: 'id_anunciante' })
  anunciante: Anunciante;

  @Column({ type: 'varchar', length: 100 })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @Column({ type: 'varchar', length: 1 })
  tipo_imovel: string;

  @Column({ type: 'varchar', length: 1 })
  tipo_negocio: string;

  @Column({ type: 'numeric', precision: 15, scale: 2 })
  valor: number;

  @Column({ type: 'varchar', length: 100 })
  endereco: string;

  @Column({ type: 'varchar', length: 40 })
  cidade: string;

  @Column({ type: 'varchar', length: 2 })
  uf: string;

  @Column({ type: 'varchar', length: 2 })
  pais: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  area_privativa?: number;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  area_construida?: number;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  area_externa?: number;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: true })
  area_total?: number;

  @OneToOne(() => ImovelDetalhe, (detalhe) => detalhe.imovel, { nullable: true })
  @JoinColumn({ name: 'id_detalhe' })
  detalhe?: ImovelDetalhe;
}

