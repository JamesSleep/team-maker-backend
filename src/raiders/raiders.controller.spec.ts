import { Test, TestingModule } from '@nestjs/testing';
import { RaidersController } from './raiders.controller';

describe('RaidersController', () => {
  let controller: RaidersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RaidersController],
    }).compile();

    controller = module.get<RaidersController>(RaidersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
