import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty({
        description: 'Comment content'
    })
    content: string;
    @ApiProperty({
        description: 'Comment published'
    })
    published: boolean;
    @ApiProperty({
        description: 'Comment postId'
    })
    postid: number;
    @ApiProperty({
        description: 'Comment personId'
    })
    personid: number;
}