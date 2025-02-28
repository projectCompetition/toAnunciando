import { PartialType } from '@nestjs/mapped-types';
import { CreateAnuncioDto } from './anuncio_create.dto';

export class UpdateAnuncioDto extends PartialType(CreateAnuncioDto) {}
