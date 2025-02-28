import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Anunciante } from './anunciante.entity';

@Entity('avaliacao', { schema: 'toanunciando' })
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Anunciante, { nullable: false })
  id_anunciante_avaliado: Anunciante;

  @Column({ type: 'varchar', length: 200, nullable: true })
  descricao?: string;

  @Column({ type: 'int', nullable: true })
  rating?: number;

  @ManyToOne(() => Anunciante, { nullable: false })
  id_anunciante_avaliador: Anunciante;
}
