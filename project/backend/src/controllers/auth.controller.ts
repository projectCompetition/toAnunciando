import { Controller, Post, Body, UseGuards, Get, Request, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { Anunciante } from '../entities/anunciante.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(Anunciante)
    private readonly anunciantesRepository: Repository<Anunciante>,
  ) { }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    const { id } = req.user; 

    const anunciante = await this.anunciantesRepository.findOne({
      where: { id },
      select: ['id', 'nome', 'email', 'cpfcnpj'], 
    });

    if (!anunciante) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    return {
      id: anunciante.id,
      nome: anunciante.nome,
      email: anunciante.email,
      cpfcnpj: anunciante.cpfcnpj,
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string; cpfCnpj: string }) {
    const { email, cpfCnpj } = body;
    await this.authService.sendPasswordResetEmail(email, cpfCnpj);
    return { message: 'E-mail de recuperação enviado.' };
  }
}