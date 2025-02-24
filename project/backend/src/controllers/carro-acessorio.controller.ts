import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CarroAcessorioService } from '../services/carro-acessorio.service';
import { CarroAcessorio } from '../entities/carro-acessorio.entity';
import { CreateCarroAcessorioDto } from '../dtos/carro-acessorio.dto';

@Controller('carro-acessorio')
export class CarroAcessorioController {
  constructor(private readonly carroAcessorioService: CarroAcessorioService) {}

  @Get()
  async findAll(): Promise<CarroAcessorio[]> {
    return this.carroAcessorioService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CarroAcessorio> {
    return this.carroAcessorioService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateCarroAcessorioDto): Promise<CarroAcessorio> {
    return this.carroAcessorioService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: Partial<CarroAcessorio>): Promise<CarroAcessorio> {
    return this.carroAcessorioService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.carroAcessorioService.remove(id);
  }
}
