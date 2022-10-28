import { Test, TestingModule } from '@nestjs/testing';
import { LogLikesController } from './log-likes.controller';
import { LogLikesService } from './log-likes.service';

describe('LogLikesController', () => {
  let controller: LogLikesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogLikesController],
      providers: [LogLikesService],
    }).compile();

    controller = module.get<LogLikesController>(LogLikesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
