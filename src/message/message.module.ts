import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { MessageModel } from './message.model';

@Module({
  controllers: [MessageController],
  providers: [MessageService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: MessageModel,
        schemaOptions: {
          collection: 'Message'
        }
      }])]
})
export class MessageModule {}
