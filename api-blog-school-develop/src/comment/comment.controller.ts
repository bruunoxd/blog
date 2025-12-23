import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { CommentModule } from './comment.module';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Create comment' })
  @ApiResponse({ status: 201, description: 'The comment has been successfully created.' })       
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiBody({ type: CreateCommentDto })
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get(':postId')
  @ApiOperation({ summary: 'Find all comment of post id' })
  @ApiResponse({ status: 201, description: 'successfully.' })   
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiParam({name: 'id', description: 'Id of post', required: true, type: String,})
  findAllExcPublished(@Param('postId') postId: string) {
    return this.commentService.findAllExcPublished(+postId);
  }

  @Get('/all/:postId')
  @ApiOperation({ summary: 'Find all comment of post id' })
  @ApiResponse({ status: 201, description: 'successfully.' })   
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiParam({name: 'id', description: 'Id of post', required: true, type: String,})
  findAll(@Param('postId') postId: string) {
    return this.commentService.findAll(+postId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find unique comment' })
  @ApiResponse({ status: 201, description: 'successfully.' })   
  @ApiResponse({ status: 202, description: 'None found.', isArray: true })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.' })
  @ApiParam({name: 'id', description: 'Id of comment', required: true, type: String,})
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({name: 'id', description: 'Id of comment', required: true, type: String,})
  @ApiOperation({ summary: 'Update only a id post' })
  @ApiResponse({ status: 201, description: 'successfully.', type: CommentModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  @ApiBody({ type: UpdateCommentDto })
  update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(+id, updateCommentDto);
  }

  @Delete(':id')
  @ApiParam({name: 'id', description: 'Id of comment', required: true, type: String,})
  @ApiOperation({ summary: 'Delete only a id post' })
  @ApiResponse({ status: 201, description: 'successfully.', type: CommentModule})
  @ApiResponse({ status: 202, description: 'None found.'})
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal error.'})
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
