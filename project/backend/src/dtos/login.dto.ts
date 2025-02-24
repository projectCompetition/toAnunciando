import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsCpfCnpj } from '../validators/is-cpf-cnpj-validator';

export class LoginDto {

  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
