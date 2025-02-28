import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Anunciante } from './anunciante.entity';
import { TipoAnuncio } from './tipo-anuncio.entity';
import { Imovel } from './imovel.entity';
import { Carro } from './carro.entity';

@Entity('anuncio', { schema: 'toanunciando' })
export class Anuncio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  descricao: string;

  @ManyToOne(() => Anunciante, { nullable: false })
  id_anunciante: Anunciante;

  @Column({ type: 'date', nullable: false })
  data_anuncio: Date;

  @ManyToOne(() => TipoAnuncio, { nullable: false })
  id_tipo_anuncio: TipoAnuncio;

  @Column({ type: 'boolean', default: true, nullable: true })
  st_ativo: boolean;

  @ManyToOne(() => Imovel, { nullable: true })
  id_imovel?: Imovel;

  @ManyToOne(() => Carro, { nullable: true })
  id_carro?: Carro;
}
