import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateImovelDto {
  @IsNotEmpty() @IsString() descricao: string;
  @IsOptional() @IsString() observacao?: string;
  @IsNotEmpty() @IsString() tipo_imovel: string;
  @IsNotEmpty() @IsString() tipo_negocio: string;
  @IsNotEmpty() @IsNumber() valor: number;
  @IsNotEmpty() @IsString() endereco: string;
  @IsNotEmpty() @IsString() cidade: string;
  @IsNotEmpty() @IsString() uf: string;
  @IsNotEmpty() @IsString() pais: string;
  @IsOptional() @IsNumber() area_privativa?: number;
  @IsOptional() @IsNumber() area_construida?: number;
  @IsOptional() @IsNumber() area_externa?: number;
  @IsOptional() @IsNumber() area_total?: number;
  @IsNotEmpty() @IsNumber() id_anunciante: number;
}