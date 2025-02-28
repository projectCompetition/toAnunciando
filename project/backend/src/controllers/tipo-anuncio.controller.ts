import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
  } from '@nestjs/common';
  import { TipoAnuncioService } from '../services/tipo-anuncio.service';
  import { CreateTipoAnuncioDto } from '../dtos/tipo-anuncio_create.dto';
  import { UpdateTipoAnuncioDto } from '../dtos/tipo-anuncio_update.dto';
  
  @Controller('tipo-anuncio')
  export class TipoAnuncioController {
    constructor(private readonly tipoAnuncioService: TipoAnuncioService) {}
  
    @Post()
    create(@Body() createTipoAnuncioDto: CreateTipoAnuncioDto) {
      return this.tipoAnuncioService.create(createTipoAnuncioDto);
    }
  
    @Get()
    findAll() {
      return this.tipoAnuncioService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.tipoAnuncioService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateTipoAnuncioDto: UpdateTipoAnuncioDto,) {
      return this.tipoAnuncioService.update(+id, updateTipoAnuncioDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.tipoAnuncioService.remove(+id);
    }
  }