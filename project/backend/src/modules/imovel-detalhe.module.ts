import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImovelDetalhe } from '../entities/imovel-detalhe.entity';
import { ImovelDetalheService } from '../services/imovel-detalhe.service';
import { ImovelDetalheController } from '../controllers/imovel-detalhe.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ImovelDetalhe])],
  controllers: [ImovelDetalheController],
  providers: [ImovelDetalheService],
  exports: [ImovelDetalheService],
})
export class ImovelDetalheModule {}