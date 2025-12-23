import { ApiProperty } from '@nestjs/swagger';

export class CreateSchoolMaterialDto {
    @ApiProperty({
        description: 'School Material title',
        type: String
    })
    name: string
}
