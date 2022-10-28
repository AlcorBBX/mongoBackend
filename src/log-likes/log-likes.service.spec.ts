import { Test, TestingModule } from '@nestjs/testing';
import { LogLikesService } from './log-likes.service';

describe('LogLikesService', () => {
  let service: LogLikesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogLikesService],
    }).compile();

    service = module.get<LogLikesService>(LogLikesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
