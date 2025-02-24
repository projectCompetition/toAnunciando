import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imovel } from '../entities/imovel.entity';
import { ImovelService } from '../services/imovel.service';
import { ImovelController } from '../controllers/imovel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Imovel])],
  controllers: [ImovelController],
  providers: [ImovelService],
  exports: [ImovelService],
})
export class ImovelModule {}