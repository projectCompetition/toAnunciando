import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anuncio } from '../entities/anuncio.entity';
import { AnuncioService } from '../services/anuncio.service';
import { AnuncioController } from '../controllers/anuncio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Anuncio])],
  controllers: [AnuncioController],
  providers: [AnuncioService],
  exports: [AnuncioService],
})
export class AnuncioModule {}
