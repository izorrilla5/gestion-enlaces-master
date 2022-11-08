import { Test, TestingModule } from '@nestjs/testing';
import { IdiomaController } from './idioma.controller';

describe('Idioma Controller', () => {
  let controller: IdiomaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IdiomaController],
    }).compile();

    controller = module.get<IdiomaController>(IdiomaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
