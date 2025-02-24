import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroAcessorio } from '../entities/carro-acessorio.entity';
import { CarroAcessorioService } from '../services/carro-acessorio.service';
import { CarroAcessorioController } from '../controllers/carro-acessorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CarroAcessorio])],
  controllers: [CarroAcessorioController],
  providers: [CarroAcessorioService],
})
export class CarroAcessorioModule {}

