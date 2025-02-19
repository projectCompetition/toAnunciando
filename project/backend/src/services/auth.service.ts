import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anunciante } from '../entities/anunciante.entity';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Anunciante)
    private readonly anunciantesRepository: Repository<Anunciante>,
    private readonly jwtService: JwtService, // ✅ Injeta o serviço JWT
  ) {}

  // ✅ Método de login
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { email, senha } = loginDto;

    // 🔍 Busca anunciante pelo e-mail (e inclui a senha)
    const anunciante = await this.anunciantesRepository.findOne({
      where: { email },
      select: ['id', 'email', 'senha'], // ⚠️ Precisamos incluir a senha na consulta
    });

    if (!anunciante) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // 🔐 Verifica se a senha está correta
    const isPasswordValid = await bcrypt.compare(senha, anunciante.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // ✅ Gera o token JWT
    const payload = { id: anunciante.id, email: anunciante.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
