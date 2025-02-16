import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carro } from '../entities/carro.entity';
import { CreateCarroDto } from '../dtos/carro.dto';

@Injectable()
export class CarrosService {
  constructor(
    @InjectRepository(Carro)
    private readonly carrosRepository: Repository<Carro>,
  ) {}

  // ✅ Create a new car
  async create(data: CreateCarroDto): Promise<Carro> {
    // Ensure the anunciante ID is set correctly
    if (!data.id_anunciante) {
      throw new Error('id_anunciante is required');
    }
  
    const novoCarro = this.carrosRepository.create({
      ...data,
      anunciante: { id: data.id_anunciante } as any, // ✅ Properly set the relationship
    });
  
    return this.carrosRepository.save(novoCarro);
  }

  // ✅ Get all cars
  async findAll(): Promise<Carro[]> {
    return this.carrosRepository.find({ relations: ['anunciante'] });
  }

  // ✅ Get a car by ID
  async findOne(id: number): Promise<Carro> {
    const carro = await this.carrosRepository.findOne({ where: { id }, relations: ['anunciante'] });
    if (!carro) {
      throw new NotFoundException(`Carro with ID ${id} not found`);
    }
    return carro;
  }

  // ✅ Update a car
  async update(id: number, data: Partial<Carro>): Promise<Carro> {
    const carro = await this.findOne(id);
    Object.assign(carro, data);
    return this.carrosRepository.save(carro);
  }

  // ✅ Delete a car
  async remove(id: number): Promise<void> {
    const carro = await this.findOne(id);
    await this.carrosRepository.remove(carro);
  }
}
