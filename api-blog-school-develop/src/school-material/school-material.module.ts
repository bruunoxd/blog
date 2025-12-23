import { Module } from '@nestjs/common';
import { SchoolMaterialService } from './school-material.service';
import { SchoolMaterialController } from './school-material.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [SchoolMaterialController],
  providers: [SchoolMaterialService, PrismaService],
})
export class SchoolMaterialModule {}
