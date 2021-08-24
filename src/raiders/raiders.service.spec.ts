import { Test, TestingModule } from '@nestjs/testing';
import { RaidersService } from './raiders.service';

describe('RaidersService', () => {
  let service: RaidersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RaidersService],
    }).compile();

    service = module.get<RaidersService>(RaidersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
