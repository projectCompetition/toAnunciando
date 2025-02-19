import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarroAcessorios } from '../entities/carro-acessorios.entity';
import { CarroAcessoriosService } from '../services/carro-acessorios.service';
import { CarroAcessoriosController } from '../controllers/carro-acessorios.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CarroAcessorios])],
  controllers: [CarroAcessoriosController],
  providers: [CarroAcessoriosService],
})
export class CarroAcessoriosModule {}

