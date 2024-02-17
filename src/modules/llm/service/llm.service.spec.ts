import { Test, TestingModule } from '@nestjs/testing';
import { LLMService } from './llm.service';
import { LLaMAService } from './LLaMA/llama.service';

describe('LLMService', () => {
  let service: LLMService;
  let mockLLaMAService: Partial<LLaMAService>; // Partial makes all properties optional, allowing for partial mocking

  beforeEach(async () => {

    mockLLaMAService = {

    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LLMService,
        {
          provide: LLaMAService,
          useValue: mockLLaMAService,
        },
      ],
    }).compile();

    service = module.get<LLMService>(LLMService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
