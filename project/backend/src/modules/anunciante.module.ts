import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anunciante } from '../entities/anunciante.entity';
import { AnunciantesService } from '../services/anunciante.service';
import { AnunciantesController } from '../controllers/anunciante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Anunciante])],
  controllers: [AnunciantesController],
  providers: [AnunciantesService],
  exports: [TypeOrmModule],
})
export class AnunciantesModule {}
