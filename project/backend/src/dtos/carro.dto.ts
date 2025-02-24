import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateCarroDto {
  @IsNotEmpty() @IsString() descricao: string;
  @IsNotEmpty() @IsNumber() valor: number;
  @IsNotEmpty() @IsString() cidade: string;
  @IsNotEmpty() @IsString() uf: string;
  @IsNotEmpty() @IsString() pais: string;
  @IsNotEmpty() @IsString() anoFabricacao: string;
  @IsNotEmpty() @IsNumber() km: number;
  @IsNotEmpty() @IsString() placa: string;
  @IsNotEmpty() @IsString() marca: string;
  @IsNotEmpty() @IsString() tipoModelo: string;
  @IsNotEmpty() @IsString() combustivel: string;
  @IsNotEmpty() @IsString() cor: string;
  @IsOptional() @IsNumber() id_acessorio?: number;
  @IsNotEmpty() @IsNumber() id_anunciante: number; 
}
