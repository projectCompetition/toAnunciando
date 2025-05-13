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

  // ✅ Endpoint de login
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // ✅ Endpoint para obter dados do usuário autenticado
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async getProfile(@Request() req) {
    const { id } = req.user; // Obtém o ID do usuário do token JWT

    // Busca o anunciante no banco de dados
    const anunciante = await this.anunciantesRepository.findOne({
      where: { id },
      select: ['id', 'nome', 'email', 'cpfcnpj'], // Seleciona os campos desejados
    });

    if (!anunciante) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    // Retorna os dados do anunciante
    return {
      id: anunciante.id,
      nome: anunciante.nome,
      email: anunciante.email,
      cpfcnpj: anunciante.cpfcnpj,
    };
  }
}