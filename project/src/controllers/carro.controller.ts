import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CarrosService } from '../services/carro.service';
import { Carro } from '../entities/carro.entity';
import { CreateCarroDto } from 'src/dtos/carro.dto';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) {}

  // ✅ Create a new car
  @Post()
  async create(@Body() data: CreateCarroDto): Promise<Carro> {
    return this.carrosService.create(data);
  }

  // ✅ Get all cars
  @Get()
  async findAll(): Promise<Carro[]> {
    return this.carrosService.findAll();
  }

  // ✅ Get a car by ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Carro> {
    return this.carrosService.findOne(id);
  }

  // ✅ Update a car
  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Carro>): Promise<Carro> {
    return this.carrosService.update(id, data);
  }

  // ✅ Delete a car
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.carrosService.remove(id);
  }
}
