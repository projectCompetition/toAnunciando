import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateImovelDetalheDto {
  @IsNotEmpty() @IsNumber() id_imovel: number;
  @IsOptional() @IsNumber() suites?: number;
  @IsOptional() @IsNumber() banheiros?: number;
  @IsOptional() @IsNumber() garagem?: number;
  @IsOptional() @IsNumber() sacada?: number;
  @IsOptional() @IsNumber() comodo?: number;
  @IsOptional() @IsNumber() sala?: number;
  @IsOptional() @IsNumber() quarto?: number;
}