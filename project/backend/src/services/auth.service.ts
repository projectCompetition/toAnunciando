import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anunciante } from '../entities/anunciante.entity';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { cpf, cnpj } from 'cpf-cnpj-validator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Anunciante)
    private readonly anunciantesRepository: Repository<Anunciante>,
    private readonly jwtService: JwtService, // ✅ Injeta o serviço JWT
  ) { }

  // ✅ Método de login
  async login(loginDto: LoginDto): Promise<{ accessToken: string }> {
    const { login, senha } = loginDto;
    let anunciante: Anunciante | null;

    if (login.includes('@')) {
      // 🔍 Valida como e-mail
      anunciante = await this.anunciantesRepository.findOne({
        where: { email: login },
        select: ['id', 'email', 'cpfcnpj', 'senha'],
      });
    } else {
      // 🔍 Valida como CPF ou CNPJ
      const isCpfValid = cpf.isValid(login);
      const isCnpjValid = cnpj.isValid(login);

      if (!isCpfValid && !isCnpjValid) {
        throw new UnauthorizedException('CPF ou CNPJ inválido');
      }

      anunciante = await this.anunciantesRepository.findOne({
        where: { cpfcnpj: login },
        select: ['id', 'email', 'cpfcnpj', 'senha'],
      });
    }

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
