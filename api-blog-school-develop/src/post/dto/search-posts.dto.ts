import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class SearchPostsDto {
    @ApiProperty({
        description: 'Search query to find posts by title or content',
        example: 'nodejs tutorial',
        required: true
    })
    @IsString({ message: 'O termo de busca deve ser uma string' })
    @IsNotEmpty({ message: 'O termo de busca não pode estar vazio' })
    query: string;
}
