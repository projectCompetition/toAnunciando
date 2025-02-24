import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anunciante } from '../entities/anunciante.entity';

@Injectable()
export class AnuncianteService {
  constructor(
    @InjectRepository(Anunciante)
    private readonly anuncianteRepository: Repository<Anunciante>,
  ) {}

  findAll(): Promise<Anunciante[]> {
    return this.anuncianteRepository.find();
  }

  findOne(id: number): Promise<Anunciante | null> {
    return this.anuncianteRepository.findOne({ where: { id } });
  }

  create(anunciante: Partial<Anunciante>): Promise<Anunciante> {
    const newAnunciante = this.anuncianteRepository.create(anunciante);
    return this.anuncianteRepository.save(newAnunciante);
  }

  async update(id: number, data: Partial<Anunciante>): Promise<Anunciante> {
    const anunciante = await this.anuncianteRepository.findOne({ where: { id } });
  
    if (!anunciante) {
      throw new Error(`Anunciante with ID ${id} not found`);
    }
  
    await this.anuncianteRepository.update(id, data);
  
    const updatedAnunciante = await this.anuncianteRepository.findOne({ where: { id } });
  
    if (!updatedAnunciante) {
      throw new Error(`Failed to update anunciante with ID ${id}`);
    }
  
    return updatedAnunciante;
  }

  async findAnuncianteWithCarro(id: number): Promise<Anunciante> {
    const anunciante = await this.anuncianteRepository.findOne({
      where: { id },
      relations: ['carros'], 
    });

    if (!anunciante) {
      throw new NotFoundException(`Anunciante with ID ${id} not found`);
    }

    return anunciante;
  }

  async findAnuncianteWithImovel(id: number): Promise<Anunciante> {
    const anunciante = await this.anuncianteRepository.findOne({
      where: { id },
      relations: ['imoveis'], 
    });

    if (!anunciante) {
      throw new NotFoundException(`Anunciante with ID ${id} not found`);
    }

    return anunciante;
  }
  
  async delete(id: number): Promise<void> {
    await this.anuncianteRepository.delete(id);
  }
}
