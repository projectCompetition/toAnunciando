import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carro } from './carro.entity';

@Entity({ schema: 'toanunciando', name: 'carro_acessorios' })
export class CarroAcessorios {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Carro, (carro) => carro.acessorios)
  @JoinColumn({ name: 'id_carro' })
  carro: Carro;

  @Column({ type: 'varchar', length: 1, nullable: true })
  cambio?: string;

  @Column({ type: 'int', nullable: true })
  portas?: number;

  @Column({ type: 'boolean', default: false })
  air_bag: boolean;

  @Column({ type: 'varchar', length: 1, nullable: true })
  alarme?: string;

  @Column({ type: 'boolean', default: false })
  ar_condicionado: boolean;

  @Column({ type: 'varchar', length: 1, nullable: true })
  direcao?: string;

  @Column({ type: 'boolean', default: false })
  freio_abs: boolean;

  @Column({ type: 'varchar', length: 1, nullable: true })
  travas?: string;

  @Column({ type: 'varchar', length: 1, nullable: true })
  vidros?: string;

  @Column({ type: 'boolean', default: false })
  ar_quente: boolean;

  @Column({ type: 'boolean', default: false })
  computador_bordo: boolean;

  @Column({ type: 'varchar', length: 1, nullable: true })
  tipo_roda?: string;

  @Column({ type: 'boolean', default: false })
  teto_solar: boolean;

  @Column({ type: 'boolean', default: false })
  tracao_4x4: boolean;
}
