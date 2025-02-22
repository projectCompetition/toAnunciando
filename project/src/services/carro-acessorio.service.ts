import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarroAcessorio } from '../entities/carro-acessorio.entity';
import { CreateCarroAcessorioDto } from 'src/dtos/carro-acessorio.dto';

@Injectable()
export class CarroAcessorioService {
  constructor(
    @InjectRepository(CarroAcessorio)
    private readonly carroAcessorioRepository: Repository<CarroAcessorio>,
  ) {}

  async findAll(): Promise<CarroAcessorio[]> {
    return await this.carroAcessorioRepository.find({ relations: ['carro'] });
  }

  async findOne(id: number): Promise<CarroAcessorio> {
    const acessorio = await this.carroAcessorioRepository.findOne({
      where: { id },
      relations: ['carro'],
    });

    if (!acessorio) {
      throw new NotFoundException(`Acessórios do carro com ID ${id} não encontrados`);
    }

    return acessorio;
  }

  async create(data: CreateCarroAcessorioDto): Promise<CarroAcessorio> {
    if (!data.id_carro) {
      throw new Error('id_carro is required');
    }
  
    const novoAcessorio = this.carroAcessorioRepository.create({
      ...data,
      carro: { id: data.id_carro } as any, 
    });
  
    return this.carroAcessorioRepository.save(novoAcessorio);
  }
  
  async update(id: number, data: Partial<CarroAcessorio>): Promise<CarroAcessorio> {
    await this.carroAcessorioRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.carroAcessorioRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Acessórios do carro com ID ${id} não encontrados`);
    }
  }
}
