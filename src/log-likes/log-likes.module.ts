import { Module } from '@nestjs/common';
import { LogLikesService } from './log-likes.service';
import { LogLikesController } from './log-likes.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { LogLikesModel } from './log-likes.model';

@Module({
  controllers: [LogLikesController],
  providers: [LogLikesService],
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: LogLikesModel,
        schemaOptions: {
          collection: 'LogLikes'
        }
      }])]
})
export class LogLikesModule {}
