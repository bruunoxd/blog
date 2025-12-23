import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class CommentService {

  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto) {
    const comment = this.prisma.comment.create({
      data: {
        content: createCommentDto.content,
        postid: createCommentDto.postid,
        published: createCommentDto.published,
        personid: createCommentDto.personid
      }
    })
    return comment;
  }

  findAll(postId: number) {
    return this.prisma.comment.findMany({
      where: {
        postid: postId,
      }
    });
  }

  findAllExcPublished(postId: number) {
    return this.prisma.comment.findMany({
      where: {
        postid: postId,
        published: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.comment.findFirst({
      where: {id}
    });
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return this.prisma.comment.update({
      where: {id},
      data: {
        content: updateCommentDto.content,
        published: updateCommentDto.published
      }
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({
      where: {id}
    });
  }
}
