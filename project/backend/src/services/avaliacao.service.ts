import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from '../entities/avaliacao.entity';
import { CreateAvaliacaoDto } from '../dtos/avaliacao_create.dto';
import { UpdateAvaliacaoDto } from '../dtos/avaliacao_update.dto';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacaoRepository: Repository<Avaliacao>,
  ) {}

  async create(dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const avaliacao = this.avaliacaoRepository.create({
      id_anunciante_avaliado: { id: dto.id_anunciante_avaliado }, 
      id_anunciante_avaliador: { id: dto.id_anunciante_avaliador }, 
      descricao: dto.descricao,
      rating: dto.rating,
    });
  
    return await this.avaliacaoRepository.save(avaliacao);
  }

  async findAll(): Promise<Avaliacao[]> {
    return await this.avaliacaoRepository.find();
  }

  async findOne(id: number): Promise<Avaliacao> {
    const avaliacao = await this.avaliacaoRepository.findOne({ where: { id } });
    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com ID ${id} não encontrada.`);
    }
    return avaliacao;
  }

  async update(id: number, dto: UpdateAvaliacaoDto): Promise<Avaliacao> {
    await this.findOne(id);
  
    const updateData: Partial<Avaliacao> = {
      descricao: dto.descricao,
      rating: dto.rating,
    };
  
    if (dto.id_anunciante_avaliado) {
      updateData.id_anunciante_avaliado = { id: dto.id_anunciante_avaliado } as any;
    }
  
    if (dto.id_anunciante_avaliador) {
      updateData.id_anunciante_avaliador = { id: dto.id_anunciante_avaliador } as any;
    }
  
    await this.avaliacaoRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.avaliacaoRepository.delete(id);
  }
}
