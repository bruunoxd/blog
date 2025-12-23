import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonDto {
    @ApiProperty({
        description: 'Person email'
    })
    email: string
    @ApiProperty({
        description: 'Person name'
    })
    name: string
    @ApiProperty({
        description: 'Person password'
    })
    password: string
    @ApiProperty({
        description: 'Person isTeacher'
    })
    isTeacher: boolean
    @ApiProperty({
        description: 'Person isStudent'
    })
    isStudent: boolean
    @ApiProperty({
        description: 'Person schoolMaterial'
    })
    schoolMaterial: number
}
