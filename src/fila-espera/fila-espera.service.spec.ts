import { Test, TestingModule } from '@nestjs/testing';
import { FilaEsperaService } from './fila-espera.service';

describe('FilaEsperaService', () => {
  let service: FilaEsperaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FilaEsperaService],
    }).compile();

    service = module.get<FilaEsperaService>(FilaEsperaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
