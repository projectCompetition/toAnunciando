import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateAnuncianteDto {
  @IsNotEmpty() @IsString() nome: string;
  @IsNotEmpty() @IsString() cpfcnpj: string;
  @IsNotEmpty() @IsEmail() email: string;
  @IsNotEmpty() @IsString() endereco: string;
  @IsNotEmpty() @IsString() cidade: string;
  @IsNotEmpty() @IsString() uf: string;
  @IsNotEmpty() @IsString() pais: string;
  @IsNotEmpty() @IsPhoneNumber() telefone: string;
  @IsNotEmpty() @IsString() senha: string;
  @IsOptional() @IsNumber() creditos?: number;
  @IsOptional() @IsString() complemento?: string;
  @IsOptional() @IsNumber() cep?: number;
}