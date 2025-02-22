import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CarroAcessoriosService } from '../services/carro-acessorios.service';
import { CarroAcessorios } from '../entities/carro-acessorios.entity';
import { CreateCarroAcessoriosDto } from '../dtos/carro-acessorios.dto';

@Controller('carro-acessorios')
export class CarroAcessoriosController {
  constructor(private readonly carroAcessoriosService: CarroAcessoriosService) {}

  @Get()
  async findAll(): Promise<CarroAcessorios[]> {
    return this.carroAcessoriosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CarroAcessorios> {
    return this.carroAcessoriosService.findOne(id);
  }

  @Post()
  async create(@Body() data: CreateCarroAcessoriosDto): Promise<CarroAcessorios> {
    return this.carroAcessoriosService.create(data);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: Partial<CarroAcessorios>): Promise<CarroAcessorios> {
    return this.carroAcessoriosService.update(id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.carroAcessoriosService.remove(id);
  }

  
}
