import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { CommentModule } from './comment/comment.module';
import { PersonModule } from './person/person.module';
import { SchoolMaterialModule } from './school-material/school-material.module';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [PostModule, CommentModule, PersonModule, SchoolMaterialModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}
