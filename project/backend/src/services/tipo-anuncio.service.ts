import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAnuncio } from '../entities/tipo-anuncio.entity';
import { CreateTipoAnuncioDto } from '../dtos/tipo-anuncio_create.dto';
import { UpdateTipoAnuncioDto } from '../dtos/tipo-anuncio_update.dto';

@Injectable()
export class TipoAnuncioService {
  constructor(
    @InjectRepository(TipoAnuncio)
    private readonly tipoAnuncioRepository: Repository<TipoAnuncio>,
  ) {}

  async create(dto: CreateTipoAnuncioDto): Promise<TipoAnuncio> {
    const tipoAnuncio = this.tipoAnuncioRepository.create(dto);
    return await this.tipoAnuncioRepository.save(tipoAnuncio);
  }

  async findAll(): Promise<TipoAnuncio[]> {
    return await this.tipoAnuncioRepository.find();
  }

  async findOne(id: number): Promise<TipoAnuncio> {
    const tipoAnuncio = await this.tipoAnuncioRepository.findOne({ where: { id } });
    if (!tipoAnuncio) {
      throw new NotFoundException(`TipoAnuncio com ID ${id} não encontrado`);
    }
    return tipoAnuncio;
  }

  async update(id: number, dto: UpdateTipoAnuncioDto): Promise<TipoAnuncio> {
    const tipoAnuncio = await this.findOne(id);
    Object.assign(tipoAnuncio, dto);
    return await this.tipoAnuncioRepository.save(tipoAnuncio);
  }

  async remove(id: number): Promise<void> {
    const tipoAnuncio = await this.findOne(id);
    await this.tipoAnuncioRepository.remove(tipoAnuncio);
  }
}