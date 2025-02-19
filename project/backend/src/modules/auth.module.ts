import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Anunciante } from '../entities/anunciante.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Anunciante]),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey', // 🔑 Defina uma chave segura
      signOptions: { expiresIn: '1h' }, // ⏳ Expira em 1 hora
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
