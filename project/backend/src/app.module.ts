import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AnuncianteModule } from './modules/anunciante.module';
import { CarroModule } from './modules/carro.module';
import { ImovelModule } from './modules/imovel.module';
import { CarroAcessorioModule } from './modules/carro-acessorio.module';
import { ImovelDetalheModule } from './modules/imovel-detalhe.module';
import { AuthModule } from './modules/auth.module';
import { AvaliacaoModule } from './modules/avaliacao.module';
import { TipoAnuncioModule } from './modules/tipo-anuncio.module';
import { AnuncioModule } from './modules/anuncio.module';

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
export class AppModule { }
