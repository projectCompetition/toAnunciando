import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarroAcessorios } from '../entities/carro-acessorios.entity';
import { CreateCarroAcessoriosDto } from 'src/dtos/carro-acessorios.dto';

@Injectable()
export class CarroAcessoriosService {
  constructor(
    @InjectRepository(CarroAcessorios)
    private readonly carroAcessoriosRepository: Repository<CarroAcessorios>,
  ) {}

  async findAll(): Promise<CarroAcessorios[]> {
    return await this.carroAcessoriosRepository.find({ relations: ['carro'] });
  }

  async findOne(id: number): Promise<CarroAcessorios> {
    const acessorio = await this.carroAcessoriosRepository.findOne({
      where: { id },
      relations: ['carro'],
    });

    if (!acessorio) {
      throw new NotFoundException(`Acessórios do carro com ID ${id} não encontrados`);
    }

    return acessorio;
  }

  async create(data: CreateCarroAcessoriosDto): Promise<CarroAcessorios> {
    if (!data.id_carro) {
      throw new Error('id_carro is required');
    }
  
    const novoAcessorio = this.carroAcessoriosRepository.create({
      ...data,
      carro: { id: data.id_carro } as any, // Relaciona o acessório com o carro
    });
  
    return this.carroAcessoriosRepository.save(novoAcessorio);
  }
  

  async update(id: number, data: Partial<CarroAcessorios>): Promise<CarroAcessorios> {
    await this.carroAcessoriosRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.carroAcessoriosRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Acessórios do carro com ID ${id} não encontrados`);
    }
  }
}
