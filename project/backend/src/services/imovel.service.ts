import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Imovel } from '../entities/imovel.entity';
import { CreateImovelDto } from '../dtos/imovel.dto';

@Injectable()
export class ImoveisService {
  constructor(
    @InjectRepository(Imovel)
    private imoveisRepository: Repository<Imovel>,
  ) {}

  async create(data: CreateImovelDto): Promise<Imovel> {
    if (!data.id_anunciante) {
      throw new Error('id_anunciante is required');
    }

    const novoImovel = this.imoveisRepository.create({
      ...data,
      anunciante: { id: data.id_anunciante } as any,
    });

    return this.imoveisRepository.save(novoImovel);
  }

  async findAll(): Promise<Imovel[]> {
    return this.imoveisRepository.find();
  }

  async findOne(id: number): Promise<Imovel> {
    const imovel = await this.imoveisRepository.findOne({
      where: { id },
      relations: ['anunciante'],
    });

    if (!imovel) {
      throw new NotFoundException(`Imóvel with ID ${id} not found`);
    }

    return imovel;
  }

  async update(id: number, data: Partial<Imovel>): Promise<Imovel> {
    const imovel = await this.findOne(id); 
    Object.assign(imovel, data); 
    return this.imoveisRepository.save(imovel); 
  }

  async remove(id: number): Promise<void> {
    await this.imoveisRepository.delete(id);
  }
}