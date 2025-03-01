import {
    IsNotEmpty,
    IsString,
    IsNumber,
    IsOptional,
    Length,
  } from 'class-validator';
  
  export class CreateTipoAnuncioDto {
    @IsNotEmpty() @IsString() @Length(1, 1) categoria_anuncio: string;
    @IsNotEmpty() @IsString() @Length(1, 1) tipo_anuncio: string;
    @IsOptional() @IsNumber() saldo?: number;
    @IsOptional() @IsString() @Length(0, 200) descricao?: string;
    @IsOptional() @IsNumber() duracao_dia?: number;
  }