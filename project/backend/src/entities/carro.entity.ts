import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  ManyToOne, 
  OneToOne, 
  JoinColumn 
} from 'typeorm';
import { Anunciante } from './anunciante.entity';
import { CarroAcessorio } from './carro-acessorio.entity';

@Entity({ schema: 'toanunciando', name: 'carro' })
export class Carro {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Anunciante, (anunciante) => anunciante.carros, { nullable: false })
  @JoinColumn({ name: 'id_anunciante' })
  anunciante: Anunciante;

  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @Column({ type: 'text', nullable: true })
  observacao?: string;

  @Column({ type: 'numeric', precision: 15, scale: 2, nullable: false })
  valor: number;

  @Column({ type: 'varchar', length: 40, nullable: false })
  cidade: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  uf: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  pais: string;

  @Column({ type: 'varchar', length: 9, nullable: false, name: 'ano_fabricacao' })
  anoFabricacao: string;

  @Column({ type: 'int', nullable: false })
  km: number;

  @Column({ type: 'varchar', length: 8, nullable: false })
  placa: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  marca: string;

  @Column({ type: 'varchar', length: 1, nullable: false, name: 'tipo_modelo' })
  tipoModelo: string;

  @Column({ type: 'varchar', length: 1, nullable: false })
  combustivel: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  cor: string;

  @OneToOne(() => CarroAcessorio, (acessorio) => acessorio.carro, { nullable: true })
  @JoinColumn({ name: 'id_acessorio' })
  acessorio?: CarroAcessorio;
}

