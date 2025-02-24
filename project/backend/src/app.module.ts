import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AnuncianteModule } from './modules/anunciante.module';
import { CarroModule } from './modules/carro.module';
import { ImovelModule } from './modules/imovel.module';
import { CarroAcessorioModule } from './modules/carro-acessorio.module';
import { ImovelDetalheModule } from './modules/imovel-detalhe.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load environment variables
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'masterkey',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
    }),
    AnuncianteModule,
    CarroModule,
    ImovelModule,
    CarroAcessorioModule,
    ImovelDetalheModule,
  ],
})
export class AppModule { }
