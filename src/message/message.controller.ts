import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Types } from 'mongoose';
import { Auth } from 'src/auth/jwt/auth.decorator';
import { IdValidationPipe } from 'src/pipes/id.validation.pipe';
import { CurrentUser } from 'src/user/decorators/user.decorator';
import { messageDto } from './message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Get('recent-list')
  @Auth()
  async getRecentMessages(@CurrentUser('_id') userId: Types.ObjectId) {
    return this.messageService.byUserFromId(userId)
  }

  async getByUserId(
    @Param('userId', IdValidationPipe) userToId: Types.ObjectId,
    @CurrentUser('_id') userFromId: Types.ObjectId
  ) {
    return this.messageService.byUserToId(userFromId, userToId)
  }


  async createMessage(
    @CurrentUser('_id') userId: Types.ObjectId,
    @Body() dto: messageDto
  ) {
    return this.messageService.create(userId, dto)
  }

  async deleteMessage(@Param('id', IdValidationPipe) id: Types.ObjectId) {
    return this.messageService.delete(id)
  }

  // @UsePipes(new ValidationPipe())

  // @HttpCode(200)
  // @Delete(':userId')
  // @Auth()
}
