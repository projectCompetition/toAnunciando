import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ImovelDetalheService } from '../services/imovel-detalhe.service';
import { ImovelDetalhe } from '../entities/imovel-detalhe.entity';
import { CreateImovelDetalheDto } from '../dtos/imovel-detalhe.dto';

@Controller('imovel-detalhe')
export class ImovelDetalheController {
  constructor(private readonly imovelDetalheService: ImovelDetalheService) {}

  @Get()
  findAll(): Promise<ImovelDetalhe[]> {
    return this.imovelDetalheService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<ImovelDetalhe> {
    return this.imovelDetalheService.findOne(id);
  }

  @Post()
  create(@Body() data: CreateImovelDetalheDto): Promise<ImovelDetalhe> {
    return this.imovelDetalheService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: Partial<ImovelDetalhe>): Promise<ImovelDetalhe> {
    return this.imovelDetalheService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.imovelDetalheService.remove(id);
  }
}