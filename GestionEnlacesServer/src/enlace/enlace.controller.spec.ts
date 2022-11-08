import { Test, TestingModule } from '@nestjs/testing';
import { EnlaceController } from './enlace.controller';

describe('Enlace Controller', () => {
  let controller: EnlaceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnlaceController],
    }).compile();

    controller = module.get<EnlaceController>(EnlaceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
