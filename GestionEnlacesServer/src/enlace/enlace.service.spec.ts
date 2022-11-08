import { Test, TestingModule } from '@nestjs/testing';
import { EnlaceService } from './enlace.service';

describe('EnlaceService', () => {
  let service: EnlaceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnlaceService],
    }).compile();

    service = module.get<EnlaceService>(EnlaceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
