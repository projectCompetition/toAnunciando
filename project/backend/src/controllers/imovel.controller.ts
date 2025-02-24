import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ImovelService } from '../services/imovel.service';
import { Imovel } from '../entities/imovel.entity';
import { CreateImovelDto } from '../dtos/imovel.dto';

@Controller('imovel')
export class ImovelController {
  constructor(private readonly imovelService: ImovelService) {}

  @Post()
  async create(@Body() data: CreateImovelDto): Promise<Imovel> {
    return this.imovelService.create(data);
  }

  @Get()
  async findAll(): Promise<Imovel[]> {
    return this.imovelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Imovel> {
    return this.imovelService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() imovel: Imovel): Promise<Imovel> {
    return this.imovelService.update(id, imovel);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.imovelService.remove(id);
  }

  @Get('/:id/detalhe')
  async findImovelWithDetalhe(@Param('id') id: number): Promise<Imovel> {
    return this.imovelService.findImovelWithDetalhe(id);
  }
}