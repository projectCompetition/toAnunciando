import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anunciante } from '../entities/anunciante.entity';
import { AnuncianteService } from '../services/anunciante.service';
import { AnuncianteController } from '../controllers/anunciante.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Anunciante])],
  controllers: [AnuncianteController],
  providers: [AnuncianteService],
  exports: [TypeOrmModule],
})
export class AnuncianteModule {}
