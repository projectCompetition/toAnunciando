import { PartialType } from '@nestjs/mapped-types';
import { CreateAvaliacaoDto } from '../dtos/avaliacao_create.dto';

export class UpdateAvaliacaoDto extends PartialType(CreateAvaliacaoDto) {}
