import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CarroService } from '../services/carro.service';
import { Carro } from '../entities/carro.entity';
import { CreateCarroDto } from '../dtos/carro.dto';

@Controller('carro')
export class CarroController {
  constructor(private readonly carroService: CarroService) {}

  @Post()
  async create(@Body() data: CreateCarroDto): Promise<Carro> {
    return this.carroService.create(data);
  }

  @Get()
  async findAll(): Promise<Carro[]> {
    return this.carroService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Carro> {
    return this.carroService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<Carro>): Promise<Carro> {
    return this.carroService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.carroService.remove(id);
  }

  @Get('/:id/acessorio')
  async findCarroWithAcessorios(@Param('id') id: number): Promise<Carro> {
    return this.carroService.findCarroWithAcessorios(id);
  }
}
