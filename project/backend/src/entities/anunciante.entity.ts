import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert } from 'typeorm';
import { Carro } from './carro.entity';
import { Imovel } from './imovel.entity';
import * as bcrypt from 'bcrypt';

@Entity({ schema: 'toanunciando', name: 'anunciantes' })
export class Anunciante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ name: 'CPF/CNPJ', length: 14, unique: true })
  cpfCnpj: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 100 })
  endereco: string;

  @Column({ length: 40 })
  cidade: string;

  @Column({ length: 2 })
  uf: string;

  @Column({ length: 2 })
  pais: string;

  @Column({ length: 15 })
  telefone: string;

  @Column({ length: 255 })
  senha: string;

  @Column({ type: 'int', nullable: true })
  creditos?: number;

  @OneToMany(() => Carro, (carro) => carro.anunciante)
  carros: Carro[];

  @OneToMany(() => Imovel, (imovel) => imovel.anunciante)
  imoveis: Imovel[];

  @BeforeInsert()
  async hashPassword() {
    this.senha = await bcrypt.hash(this.senha, 10);
  }
}
