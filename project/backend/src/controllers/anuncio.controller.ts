import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AnuncioService } from '../services/anuncio.service';
import { CreateAnuncioDto } from '../dtos/anuncio_create.dto';
import { UpdateAnuncioDto } from '../dtos/anuncio_update.dto';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Post()
  create(@Body() dto: CreateAnuncioDto) {
    return this.anuncioService.create(dto);
  }

  @Get()
  findAll() {
    return this.anuncioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.anuncioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAnuncioDto) {
    return this.anuncioService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.anuncioService.remove(id);
  }
}
