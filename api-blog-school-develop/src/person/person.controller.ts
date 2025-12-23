import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpException } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { PersonModule } from './person.module';

@ApiTags('person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) { }

  @Post()
  @ApiOperation({ summary: 'Create person' })
  @ApiResponse({ status: 201, description: 'The person has been successfully created.' })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: CreatePersonDto })
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all person' })
  @ApiResponse({ status: 201, description: 'successfully.' })
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  findAll() {
    return this.personService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Id of person', required: true, type: Number, })
  @ApiOperation({ summary: 'Find only a id person' })
  @ApiResponse({ status: 201, description: 'successfully.', type: PersonModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  findOne(@Param('id') id: string) {
    return this.personService.findOne(+id);
  }

  @Post('/login')
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiResponse({
    status: 200,
    description: 'Login successful.',
    type: PersonModule,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  async login(@Body() body: { email: string; password: string }) {
    const result = await this.personService.login(body.email, body.password);

    if (!result.isSuccess) {
      throw new HttpException(
        { achou: false, pessoa: null },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return {
      achou: true,
      pessoa: result.person,
    };
  }


  @Patch(':id')
  @ApiParam({ name: 'id', description: 'Id of person', required: true, type: Number, })
  @ApiOperation({ summary: 'Update only a id person' })
  @ApiResponse({ status: 201, description: 'successfully.', type: PersonModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: UpdatePersonDto })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Id of person', required: true, type: Number, })
  @ApiOperation({ summary: 'Delete only a id person' })
  @ApiResponse({ status: 201, description: 'successfully.', type: PersonModule })
  @ApiResponse({ status: 202, description: 'None found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  remove(@Param('id') id: string) {
    return this.personService.remove(+id);
  }
}
