import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAnuncioDto } from '../dtos/tipo-anuncio_create.dto';

export class UpdateTipoAnuncioDto extends PartialType(CreateTipoAnuncioDto) {}