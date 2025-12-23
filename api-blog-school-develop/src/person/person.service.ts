import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Person } from './entities/person.entity';

@Injectable()
export class PersonService {

  constructor(private prisma: PrismaService) { }

  create(createPersonDto: CreatePersonDto) {
    const person = this.prisma.person.create({
      data: {
        email: createPersonDto.email,
        isStudent: createPersonDto.isStudent,
        isTeacher: createPersonDto.isTeacher,
        name: createPersonDto.name,
        password: createPersonDto.password,
      }
    })
    return person;
  }

  findAll() {
    return this.prisma.person.findMany();
  }

  findOne(id: number) {
    return this.prisma.person.findFirst({
      where: { id }
    });
  }

  async login(email: string, password: string): Promise<{ isSuccess: boolean; person: Person | null }> {
    const person = await this.prisma.person.findUnique({
      where: {
        email,
        password,
      },
    });

    return {
      isSuccess: !!person,
      person: person ?? null,
    };
  }

  update(id: number, updatePersonDto: UpdatePersonDto) {
    return this.prisma.person.update({
      where: { id },
      data: {
        email: updatePersonDto.email,
        isStudent: updatePersonDto.isStudent,
        isTeacher: updatePersonDto.isTeacher,
        name: updatePersonDto.name,
        password: updatePersonDto.password,
      }
    });
  }

  remove(id: number) {
    return this.prisma.person.delete({where: {id}});
  }
}
