import { Test, TestingModule } from '@nestjs/testing';
import { ChaveService } from './chave.service';

describe('ChaveService', () => {
  let service: ChaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChaveService],
    }).compile();

    service = module.get<ChaveService>(ChaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
