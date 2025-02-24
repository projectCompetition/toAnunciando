import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Imovel } from './imovel.entity';

@Entity({ schema: 'toanunciando', name: 'imovel_detalhe' })
export class ImovelDetalhe {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => Imovel, (imovel) => imovel.detalhe)
  @JoinColumn({ name: 'id_imovel' })
  imovel: Imovel;

  @Column({ type: 'int', nullable: true })
  suites?: number;

  @Column({ type: 'int', nullable: true })
  banheiros?: number;

  @Column({ type: 'int', nullable: true })
  garagem?: number;

  @Column({ type: 'int', nullable: true })
  sacada?: number;

  @Column({ type: 'int', nullable: true })
  comodo?: number;

  @Column({ type: 'int', nullable: true })
  sala?: number;

  @Column({ type: 'int', nullable: true })
  quarto?: number;
}
