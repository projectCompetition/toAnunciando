import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imovel } from '../entities/imovel.entity';
import { CreateImovelDto } from '../dtos/imovel.dto';

@Injectable()
export class ImovelService {
  constructor(
    @InjectRepository(Imovel)
    private readonly imovelRepository: Repository<Imovel>,
  ) {}

  async findAll(): Promise<Imovel[]> {
    return this.imovelRepository.find({ relations: ['anunciante', 'detalhe'] });
  }

  async findOne(id: number): Promise<Imovel> {
    const imovel = await this.imovelRepository.findOne({ where: { id }, relations: ['anunciante', 'detalhe'] });
    if (!imovel) {
      throw new NotFoundException(`Imóvel com ID ${id} não encontrado`);
    }
    return imovel;
  }

  async create(data: CreateImovelDto): Promise<Imovel> {
    if (!data.id_anunciante) {
      throw new Error('id_anunciante is required');
    }

    const novoImovel = this.imovelRepository.create({
      ...data,
      anunciante: { id: data.id_anunciante } as any,
    });

    return this.imovelRepository.save(novoImovel);
  }

  async update(id: number, data: Partial<CreateImovelDto>): Promise<Imovel> {
    await this.imovelRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.imovelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Imóvel com ID ${id} não encontrado`);
    }
  }

  async findImovelWithDetalhe(id: number): Promise<Imovel> {
    const imovel = await this.imovelRepository.findOne({
      where: { id },
      relations: ['detalhe'], 
    });
  
    if (!imovel) {
      throw new NotFoundException(`Imóvel com ID ${id} não encontrado`);
    }
  
    return imovel;
  } 
}