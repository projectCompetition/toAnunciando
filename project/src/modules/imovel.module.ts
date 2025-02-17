import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imovel } from '../entities/imovel.entity';
import { ImoveisService } from '../services/imovel.service';
import { ImoveisController } from '../controllers/imovel.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Imovel])],
  controllers: [ImoveisController],
  providers: [ImoveisService],
  exports: [ImoveisService],
})
export class ImoveisModule {}