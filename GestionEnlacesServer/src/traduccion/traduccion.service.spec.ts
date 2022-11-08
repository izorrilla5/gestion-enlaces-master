import { Test, TestingModule } from '@nestjs/testing';
import { TraduccionService } from './traduccion.service';

describe('TraduccionService', () => {
  let service: TraduccionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TraduccionService],
    }).compile();

    service = module.get<TraduccionService>(TraduccionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
