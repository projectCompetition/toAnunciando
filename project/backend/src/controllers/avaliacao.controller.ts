import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { AvaliacaoService } from '../services/avaliacao.service';
import { CreateAvaliacaoDto } from '../dtos/avaliacao_create.dto';
import { UpdateAvaliacaoDto } from '../dtos/avaliacao_update.dto';

@Controller('avaliacao')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  create(@Body() dto: CreateAvaliacaoDto) {
    return this.avaliacaoService.create(dto);
  }

  @Get()
  findAll() {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.avaliacaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateAvaliacaoDto) {
    return this.avaliacaoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.avaliacaoService.remove(id);
  }
}
