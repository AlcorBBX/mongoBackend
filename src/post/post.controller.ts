import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/jwt/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { postDto } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  async getAll() {
    return this.postService.getAll()
  }

  @Get('by-userId/:userId')
  async getByUserId(@Param('userId', IdValidationPipe) userId: Types.ObjectId) {
    return this.postService.byUserId(userId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  @Auth()
  async createPost(@CurrentUser('_id') userId: Types.ObjectId, @Body() dto: postDto) {
    return this.postService.create(userId, dto)
  }

  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deletePost(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return this.postService.delete(id)
  }
}
