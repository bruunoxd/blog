import { PartialType } from '@nestjs/swagger';
import { CreateSchoolMaterialDto } from './create-school-material.dto';

export class UpdateSchoolMaterialDto extends PartialType(CreateSchoolMaterialDto) {}
