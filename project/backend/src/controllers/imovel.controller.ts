import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ImoveisService } from '../services/imovel.service';
import { Imovel } from '../entities/imovel.entity';
import { CreateImovelDto } from 'src/dtos/imovel.dto';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) {}

  @Post()
  async create(@Body() data: CreateImovelDto): Promise<Imovel> {
    return this.imoveisService.create(data);
  }

  @Get()
  async findAll(): Promise<Imovel[]> {
    return this.imoveisService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Imovel> {
    return this.imoveisService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() imovel: Imovel): Promise<Imovel> {
    return this.imoveisService.update(id, imovel);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.imoveisService.remove(id);
  }
}