import { IsBoolean, IsDateString, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateAnuncioDto {
  @IsString() @IsNotEmpty() descricao: string;
  @IsInt() id_anunciante: number;
  @IsDateString() data_anuncio: string;
  @IsInt() id_tipo_anuncio: number;
  @IsOptional() @IsBoolean() st_ativo?: boolean;
  @IsOptional() @IsInt() id_imovel?: number;
  @IsOptional() @IsInt() id_carro?: number;
}
