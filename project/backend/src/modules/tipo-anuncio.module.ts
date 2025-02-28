import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAnuncioService } from '../services/tipo-anuncio.service';
import { TipoAnuncioController } from '../controllers/tipo-anuncio.controller';
import { TipoAnuncio } from '../entities/tipo-anuncio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAnuncio])],
  controllers: [TipoAnuncioController],
  providers: [TipoAnuncioService],
})
export class TipoAnuncioModule {}