import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anuncio } from '../entities/anuncio.entity';
import { CreateAnuncioDto } from '../dtos/anuncio_create.dto';
import { UpdateAnuncioDto } from '../dtos/anuncio_update.dto';

@Injectable()
export class AnuncioService {
  constructor(
    @InjectRepository(Anuncio)
    private readonly anuncioRepository: Repository<Anuncio>,
  ) {}

  async create(dto: CreateAnuncioDto): Promise<Anuncio> {
    const anuncio = this.anuncioRepository.create({
      descricao: dto.descricao,
      data_anuncio: dto.data_anuncio,
      id_anunciante: { id: dto.id_anunciante },
      id_tipo_anuncio: { id: dto.id_tipo_anuncio },
      st_ativo: dto.st_ativo,
      id_imovel: dto.id_imovel ? { id: dto.id_imovel } : undefined,
      id_carro: dto.id_carro ? { id: dto.id_carro } : undefined,
    });

    return await this.anuncioRepository.save(anuncio);
  }

  async findAll(): Promise<Anuncio[]> {
    return await this.anuncioRepository.find();
  }

  async findOne(id: number): Promise<Anuncio> {
    const anuncio = await this.anuncioRepository.findOne({ where: { id } });
    if (!anuncio) {
      throw new NotFoundException(`Anúncio com ID ${id} não encontrado.`);
    }
    return anuncio;
  }

  async update(id: number, dto: UpdateAnuncioDto): Promise<Anuncio> {
    await this.findOne(id);
  
    const updateData: Partial<Anuncio> = {
      descricao: dto.descricao,
      st_ativo: dto.st_ativo,
    };
  
    if (dto.data_anuncio) {
      updateData.data_anuncio = new Date(dto.data_anuncio); // Conversão da string para Date
    }
  
    if (dto.id_anunciante) {
      updateData.id_anunciante = { id: dto.id_anunciante } as any;
    }
  
    if (dto.id_tipo_anuncio) {
      updateData.id_tipo_anuncio = { id: dto.id_tipo_anuncio } as any;
    }
  
    if (dto.id_imovel) {
      updateData.id_imovel = { id: dto.id_imovel } as any;
    }
  
    if (dto.id_carro) {
      updateData.id_carro = { id: dto.id_carro } as any;
    }
  
    await this.anuncioRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.anuncioRepository.delete(id);
  }
}
