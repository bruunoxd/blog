import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SchoolMaterialService } from './school-material.service';
import { CreateSchoolMaterialDto } from './dto/create-school-material.dto';
import { UpdateSchoolMaterialDto } from './dto/update-school-material.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { SchoolMaterialModule } from './school-material.module';

@ApiTags('school-material')
@Controller('school-material')
export class SchoolMaterialController {
  constructor(private readonly schoolMaterialService: SchoolMaterialService) { }

  @Post()
  @ApiOperation({ summary: 'Create school-material' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.' })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: CreateSchoolMaterialDto })
  create(@Body() createSchoolMaterialDto: CreateSchoolMaterialDto) {
    return this.schoolMaterialService.create(createSchoolMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all school-material' })
  @ApiResponse({ status: 201, description: 'successfully.' })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  findAll() {
    return this.schoolMaterialService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Id of school-material', required: true, type: Number, })
  @ApiOperation({ summary: 'Find only a id school-material' })
  @ApiResponse({ status: 201, description: 'successfully.', type: SchoolMaterialModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.schoolMaterialService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Id of school-material', required: true, type: Number, })
  @ApiOperation({ summary: 'Update only a id post' })
  @ApiResponse({ status: 201, description: 'successfully.', type: SchoolMaterialModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: UpdateSchoolMaterialDto })
  update(@Param('id') id: string, @Body() updateSchoolMaterialDto: UpdateSchoolMaterialDto) {
    return this.schoolMaterialService.update(+id, updateSchoolMaterialDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Id of school-material', required: true, type: Number, })
  @ApiOperation({ summary: 'Delete only a id school-material' })
  @ApiResponse({ status: 201, description: 'successfully.', type: SchoolMaterialModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  remove(@Param('id') id: string) {
    return this.schoolMaterialService.remove(+id);
  }
}
