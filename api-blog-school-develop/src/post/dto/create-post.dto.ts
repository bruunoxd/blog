import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
    @ApiProperty({
        description: 'Post title'
    })
    title: string;
    @ApiProperty({
        description: 'Post content'
    })
    content?: string;
    @ApiProperty({
        description: 'Post publish'
    })
    published: boolean;
    @ApiProperty({
        description: 'Post id person'
    })
    personid: number;
}