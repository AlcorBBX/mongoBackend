import { Controller } from '@nestjs/common';
import { LogLikesService } from './log-likes.service';

@Controller('log-likes')
export class LogLikesController {
  constructor(private readonly logLikesService: LogLikesService) {}
}
