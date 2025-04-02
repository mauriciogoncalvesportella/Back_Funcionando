import { Test, TestingModule } from '@nestjs/testing';
import { FilaEsperaController } from './fila-espera.controller';

describe('FilaEspera Controller', () => {
  let controller: FilaEsperaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilaEsperaController],
    }).compile();

    controller = module.get<FilaEsperaController>(FilaEsperaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
