import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAvaliacaoDto {
  @IsInt() id_anunciante_avaliado: number;
  @IsOptional() @IsString() descricao?: string;
  @IsOptional() @IsInt() @Min(0) @Max(5) rating?: number;
  @IsInt() id_anunciante_avaliador: number;
}
