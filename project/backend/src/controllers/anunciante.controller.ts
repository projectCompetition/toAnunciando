import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AnunciantesService } from '../services/anunciante.service';
import { Anunciante } from '../entities/anunciante.entity';

@Controller('anunciantes')
export class AnunciantesController {
  constructor(private readonly anunciantesService: AnunciantesService) {}

  @Post()
  create(@Body() anunciante: Partial<Anunciante>): Promise<Anunciante> {
    return this.anunciantesService.create(anunciante);
  }

  @Get()
  findAll(): Promise<Anunciante[]> {
    return this.anunciantesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Anunciante | null> {
    return this.anunciantesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Anunciante>): Promise<Anunciante> {
    return this.anunciantesService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.anunciantesService.delete(id);
  }

  @Get('/carros/:id')
  async findAnuncianteWithCarros(@Param('id') id: number): Promise<Anunciante> {
    return this.anunciantesService.findAnuncianteWithCarrosImoveis(id);
  }

  @Get('/imoveis/:id')
  async findAnuncianteWithImoveis(@Param('id') id: number): Promise<Anunciante> {
    return this.anunciantesService.findAnuncianteWithCarrosImoveis(id);
  }
}
