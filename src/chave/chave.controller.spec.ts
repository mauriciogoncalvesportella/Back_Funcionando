import { Test, TestingModule } from '@nestjs/testing';
import { ChaveController } from './chave.controller';

describe('Chave Controller', () => {
  let controller: ChaveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChaveController],
    }).compile();

    controller = module.get<ChaveController>(ChaveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
