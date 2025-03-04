import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anuncio } from '../entities/anuncio.entity';
import { AnuncioService } from '../services/anuncio.service';
import { AnuncioController } from '../controllers/anuncio.controller';
import { ConfigModule } from '@nestjs/config';
import { AnuncianteModule } from './anunciante.module';
import { AuthModule } from './auth.module';
import { AvaliacaoModule } from './avaliacao.module';
import { CarroAcessorioModule } from './carro-acessorio.module';
import { CarroModule } from './carro.module';
import { ImovelDetalheModule } from './imovel-detalhe.module';
import { ImovelModule } from './imovel.module';
import { TipoAnuncioModule } from './tipo-anuncio.module';

@Module({
  imports: [TypeOrmModule.forFeature([Anuncio])],
  controllers: [AnuncioController],
  providers: [AnuncioService],
  exports: [AnuncioService],
})
export class AnuncioModule {}
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'masterkey',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AnuncianteModule,
    CarroModule,
    ImovelModule,
    CarroAcessorioModule,
    ImovelDetalheModule,
    AuthModule,
    AvaliacaoModule,
    TipoAnuncioModule,
    AnuncioModule,
  ],
})
export class AppModule {
}

