import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImovelDetalhe } from '../entities/imovel-detalhe.entity';
import { CreateImovelDetalheDto } from 'src/dtos/imovel-detalhe.dto';

@Injectable()
export class ImovelDetalheService {
  constructor(
    @InjectRepository(ImovelDetalhe)
    private readonly imovelDetalheRepository: Repository<ImovelDetalhe>,
  ) {}

  async findAll(): Promise<ImovelDetalhe[]> {
    return await this.imovelDetalheRepository.find({ relations: ['imovel'] });
  }

  async findOne(id: number): Promise<ImovelDetalhe> {
    const detalhe = await this.imovelDetalheRepository.findOne({
      where: { id },
      relations: ['imovel'],
    });

    if (!detalhe) {
      throw new NotFoundException(`Detalhes do imóvel com ID ${id} não encontrados`);
    }

    return detalhe;
  }

  async create(data: CreateImovelDetalheDto): Promise<ImovelDetalhe> {
    if (!data.id_imovel) {
      throw new Error('id_imovel is required');
    }

    const novoDetalhe = this.imovelDetalheRepository.create({
      ...data,
      imovel: { id: data.id_imovel } as any, 
    });

    return this.imovelDetalheRepository.save(novoDetalhe);
  }

  async update(id: number, data: Partial<ImovelDetalhe>): Promise<ImovelDetalhe> {
    await this.imovelDetalheRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.imovelDetalheRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Detalhes do imóvel com ID ${id} não encontrados`);
    }
  }
}
