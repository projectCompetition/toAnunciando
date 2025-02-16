import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anunciante } from '../entities/anunciante.entity';

@Injectable()
export class AnunciantesService {
  constructor(
    @InjectRepository(Anunciante)
    private readonly anunciantesRepository: Repository<Anunciante>,
  ) {}

  findAll(): Promise<Anunciante[]> {
    return this.anunciantesRepository.find();
  }

  findOne(id: number): Promise<Anunciante | null> {
    return this.anunciantesRepository.findOne({ where: { id } });
  }

  create(anunciante: Partial<Anunciante>): Promise<Anunciante> {
    const newAnunciante = this.anunciantesRepository.create(anunciante);
    return this.anunciantesRepository.save(newAnunciante);
  }

  async update(id: number, data: Partial<Anunciante>): Promise<Anunciante> {
    const anunciante = await this.anunciantesRepository.findOne({ where: { id } });
  
    if (!anunciante) {
      throw new Error(`Anunciante with ID ${id} not found`);
    }
  
    await this.anunciantesRepository.update(id, data);
  
    const updatedAnunciante = await this.anunciantesRepository.findOne({ where: { id } });
  
    if (!updatedAnunciante) {
      throw new Error(`Failed to update anunciante with ID ${id}`);
    }
  
    return updatedAnunciante;
  }

  async findAnuncianteWithCarros(id: number): Promise<Anunciante> {
    const anunciante = await this.anunciantesRepository.findOne({
      where: { id },
      relations: ['carros'], // Load related carros
    });

    if (!anunciante) {
      throw new NotFoundException(`Anunciante with ID ${id} not found`);
    }

    return anunciante;
  }
  
  async delete(id: number): Promise<void> {
    await this.anunciantesRepository.delete(id);
  }
}
