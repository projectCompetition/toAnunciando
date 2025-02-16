import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AnunciantesModule } from './modules/anunciante.module';
import { CarrosModule } from './modules/carro.module';

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
    AnunciantesModule,
    CarrosModule,
  ],
})
export class AppModule { }
