import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Anunciante } from '../entities/anunciante.entity';
import { LoginDto } from '../dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Anunciante)
    private readonly anunciantesRepository: Repository<Anunciante>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
  ) { }

  async login(loginDto: LoginDto): Promise<{
    accessToken: string;
    anunciante: { nome: string };
  }> {
    const { login, senha } = loginDto;
    let anunciante: Anunciante | null;

    if (login.includes('@')) {
      // E-mail
      anunciante = await this.anunciantesRepository.findOne({
        where: { email: login },
        select: ['id', 'email', 'cpfcnpj', 'senha', 'nome'],
      });
    } else {
      // CPF ou CNPJ
      const isCpfValid = cpf.isValid(login);
      const isCnpjValid = cnpj.isValid(login);

      if (!isCpfValid && !isCnpjValid) {
        throw new UnauthorizedException('CPF ou CNPJ inválido');
      }

      anunciante = await this.anunciantesRepository.findOne({
        where: { cpfcnpj: login },
        select: ['id', 'email', 'cpfcnpj', 'senha', 'nome'],
      });
    }

    if (!anunciante) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const isPasswordValid = await bcrypt.compare(senha, anunciante.senha);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { id: anunciante.id, email: anunciante.email };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, anunciante: { nome: anunciante.nome } };
  }

  async sendPasswordResetEmail(
    email: string,
    cpfCnpj: string,
  ): Promise<void> {
    const anunciante = await this.anunciantesRepository.findOne({
      where: { email, cpfcnpj: cpfCnpj },
      select: ['id', 'nome', 'email'],
    });

    if (!anunciante) {
      throw new NotFoundException('E-mail ou CPF/CNPJ não encontrado.');
    }

    const token = this.jwtService.sign(
      { id: anunciante.id },
      { expiresIn: '1h' },
    );

    const resetLink = `https://seusite.com/redefinir-senha?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      subject: 'Recuperação de Senha',
      template: 'forgot-password',
      context: {
        nome: anunciante.nome,
        resetLink,
      },
    });
  }

  async resetPassword(token: string, novaSenha: string): Promise<void> {
    let payload: any;
    try {
      payload = this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    const anunciante = await this.anunciantesRepository.findOne({
      where: { id: payload.id },
    });

    if (!anunciante) {
      throw new NotFoundException('Usuário não encontrado.');
    }

    anunciante.senha = await bcrypt.hash(novaSenha, 10);
    await this.anunciantesRepository.save(anunciante);
  }
}
