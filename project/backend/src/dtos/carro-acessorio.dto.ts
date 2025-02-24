import { IsNotEmpty, IsNumber, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCarroAcessorioDto {
  @IsOptional() @IsNumber() id_carro?: number;
  @IsOptional() @IsString() cambio?: string;
  @IsOptional() @IsNumber() portas?: number;
  @IsNotEmpty() @IsBoolean() air_bag: boolean;
  @IsOptional() @IsString() alarme?: string;
  @IsNotEmpty() @IsBoolean() ar_condicionado: boolean;
  @IsOptional() @IsString() direcao?: string;
  @IsNotEmpty() @IsBoolean() freio_abs: boolean;
  @IsOptional() @IsString() travas?: string;
  @IsOptional() @IsString() vidros?: string;
  @IsNotEmpty() @IsBoolean() ar_quente: boolean;
  @IsNotEmpty() @IsBoolean() computador_bordo: boolean;
  @IsOptional() @IsString() tipo_roda?: string;
  @IsNotEmpty() @IsBoolean() teto_solar: boolean;
  @IsNotEmpty() @IsBoolean() tracao_4x4: boolean;
}
