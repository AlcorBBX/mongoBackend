import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/jwt/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { LogLikesService } from './log-likes.service';

@Controller('log-likes')
export class LogLikesController {
  constructor(private readonly logLikesService: LogLikesService) { }

  @Get('check-exist/:postId')
  @Auth()
  async checkExist(
    @Param('postId', IdValidationPipe) postId: Types.ObjectId,
    @CurrentUser('_id') userId: Types.ObjectId
  ) {
    return this.logLikesService.checkExist(userId, postId)
  }


  @Get('get-count/:postId')
  async getAllCount(
    @Param('postId', IdValidationPipe) postId: Types.ObjectId
  ) {
    return this.logLikesService.getAllCount(postId)
  }

  @HttpCode(200)
  @Post(':postId')
  @Auth()
  async createLog(
    @Param('postId', IdValidationPipe) postId: Types.ObjectId,
    @CurrentUser('_id') userId: Types.ObjectId
  ) {
    return this.logLikesService.create(userId, postId)
  }

  @HttpCode(200)
  @Delete(':postId')
  @Auth()
  async deleteLog(
    @Param('postId', IdValidationPipe) postId: Types.ObjectId,
    @CurrentUser('_id') userId: Types.ObjectId
  ) {
    return this.logLikesService.delete(userId, postId)
  }
}
