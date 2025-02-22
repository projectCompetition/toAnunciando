import { IsEmail, IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsCpfCnpj } from '../validators/is-cpf-cnpj-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @Validate(IsCpfCnpj) 
  cpfCnpj: string;

  @IsString()
  @IsNotEmpty()
  senha: string;
}
