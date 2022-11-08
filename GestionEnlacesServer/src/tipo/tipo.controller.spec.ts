import { Test, TestingModule } from '@nestjs/testing';
import { TipoController } from './tipo-enlace.controller';

describe('Tipo Controller', () => {
  let controller: TipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TipoController],
    }).compile();

    controller = module.get<TipoController>(TipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
