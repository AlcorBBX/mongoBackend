import { Module } from '@nestjs/common';
import { LogLikesService } from './log-likes.service';
import { LogLikesController } from './log-likes.controller';

@Module({
  controllers: [LogLikesController],
  providers: [LogLikesService]
})
export class LogLikesModule {}
