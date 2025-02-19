import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AnunciantesService } from '../services/anunciante.service';
import { Anunciante } from '../entities/anunciante.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('anunciantes')
export class AnunciantesController {
  constructor(private readonly anunciantesService: AnunciantesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() anunciante: Partial<Anunciante>): Promise<Anunciante> {
    return this.anunciantesService.create(anunciante);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll(): Promise<Anunciante[]> {
    return this.anunciantesService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number): Promise<Anunciante | null> {
    return this.anunciantesService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: number, @Body() data: Partial<Anunciante>): Promise<Anunciante> {
    return this.anunciantesService.update(id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Param('id') id: number): Promise<void> {
    return this.anunciantesService.delete(id);
  }

  @Get('/carros/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAnuncianteWithCarros(@Param('id') id: number): Promise<Anunciante> {
    return this.anunciantesService.findAnuncianteWithCarrosImoveis(id);
  }

  @Get('/imoveis/:id')
  @UseGuards(AuthGuard('jwt'))
  async findAnuncianteWithImoveis(@Param('id') id: number): Promise<Anunciante> {
    return this.anunciantesService.findAnuncianteWithCarrosImoveis(id);
  }
}
