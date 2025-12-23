import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { SearchPostsDto } from './dto/search-posts.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PostService {

  constructor(private prisma: PrismaService) {}
  
  create(createPostDto: CreatePostDto) {
    const post = this.prisma.post.create({
      data: {
        title: createPostDto.title,
        published: createPostDto.published,
        content: createPostDto.content,
        personid: createPostDto.personid,
      }
    })
    return post;
  }

  findAll() {
    return this.prisma.post.findMany();
  }

  findAllExcPublished() {
    return this.prisma.post.findMany({
      where: {
        published: true
      }
    });
  }

  findOne(id: number) {
    return this.prisma.post.findUnique({
      where: {id}
    });
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    const postUpdate = this.prisma.post.update({
      where: {id},
      data: {
        title: updatePostDto.title,
        content: updatePostDto.content,
        published: updatePostDto.published,
      }
    })
    return postUpdate;
  }

  remove(id: number) {
    return this.prisma.post.delete({
      where: {id}
    });
  }

  async search(searchPostsDto: SearchPostsDto) {
    return this.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: searchPostsDto.query} },
          { content: { contains: searchPostsDto.query} }
        ]
      },
      include: {
        person: {
          select: {
            name: true,
            email: true
          }
        }
      }
    });
  }
}
