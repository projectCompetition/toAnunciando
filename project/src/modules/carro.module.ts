import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carro } from '../entities/carro.entity';
import { CarrosService } from '../services/carro.service';
import { CarrosController } from '../controllers/carro.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Carro])],
  controllers: [CarrosController],
  providers: [CarrosService],
  exports: [CarrosService],
})
export class CarrosModule {}
