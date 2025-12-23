import { Injectable } from '@nestjs/common';
import { CreateSchoolMaterialDto } from './dto/create-school-material.dto';
import { UpdateSchoolMaterialDto } from './dto/update-school-material.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class SchoolMaterialService {

  constructor(private prisma: PrismaService) { }

  create(createSchoolMaterialDto: CreateSchoolMaterialDto) {
    const shcoolMaterial = this.prisma.schoolMaterial.create({
      data:{
        name: createSchoolMaterialDto.name
      }
    })
    return shcoolMaterial;
  }

  findAll() {
    return this.prisma.schoolMaterial.findMany({});
  }

  findOne(id: number) {
    return this.prisma.schoolMaterial.findUnique({where: {id}});
  }

  update(id: number, updateSchoolMaterialDto: UpdateSchoolMaterialDto) {
    return this.prisma.schoolMaterial.update({
      where: {id},
      data: {
        name: updateSchoolMaterialDto.name
      }
    });
  }

  remove(id: number) {
    return this.prisma.comment.delete({
      where: {id}
    });
  }
}
