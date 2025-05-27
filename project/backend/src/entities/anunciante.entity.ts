import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Imovel } from './imovel.entity';
import { Carro } from './carro.entity';
import * as bcrypt from 'bcrypt';

@Entity({ schema: 'toanunciando', name: 'anunciante' })
export class Anunciante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, nullable: false })
  nome: string;

  @Column({ type: 'varchar', length: 14, unique: true, nullable: false })
  cpfcnpj: string;

  @Column({ type: 'varchar', length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  endereco: string;

  @Column({ type: 'varchar', length: 40, nullable: false})
  cidade: string;

  @Column({ type: 'varchar', length: 2, nullable: false})
  uf: string;

  @Column({ type: 'varchar', length: 2, nullable: false })
  pais: string;

  @Column({ type: 'varchar', length: 15, nullable: false })
  telefone: string;

  @Column({ type: 'varchar', length: 255, nullable: false, select: false }) 
  senha: string;

  @Column({ type: 'int', nullable: true, default: 0 })
  creditos?: number;

  @Column({ type: 'varchar', length: 75, nullable: true})
  complemento?: string;

  @Column({ type: 'int', nullable: true})
  cep?: number;

  @OneToMany(() => Imovel, (imovel) => imovel.anunciante)
  imoveis: Imovel[];

  @OneToMany(() => Carro, (carro) => carro.anunciante)
  carros: Carro[];

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}
