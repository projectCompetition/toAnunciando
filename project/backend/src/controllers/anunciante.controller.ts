import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AnuncianteService } from '../services/anunciante.service';
import { Anunciante } from '../entities/anunciante.entity';
import { CreateAnuncianteDto } from '../dtos/anunciante.dto';

@Controller('anunciante')
export class AnuncianteController {
  constructor(private readonly anuncianteService: AnuncianteService) {}

  @Post()
  create(@Body() createAnuncianteDto: CreateAnuncianteDto): Promise<Anunciante> {
    return this.anuncianteService.create(createAnuncianteDto);
  }

  @Get()
  findAll(): Promise<Anunciante[]> {
    return this.anuncianteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Anunciante | null> {
    return this.anuncianteService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<Anunciante>): Promise<Anunciante> {
    return this.anuncianteService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<void> {
    return this.anuncianteService.delete(id);
  }

  @Get('/:id/carro')
  async findAnuncianteWithCarro(@Param('id') id: number): Promise<Anunciante> {
    return this.anuncianteService.findAnuncianteWithCarro(id);
  }

  @Get('/:id/imovel')
  async findAnuncianteWithImovel(@Param('id') id: number): Promise<Anunciante> {
    return this.anuncianteService.findAnuncianteWithImovel(id);
  }
}



