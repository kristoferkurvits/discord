import { Test, TestingModule } from '@nestjs/testing';
import { LLMService } from './llm.service';
import { LLaMAService } from './LLaMA/llama.service';
import { LLMModel } from '../constants/model.enum';
import { NotImplementedException } from '@nestjs/common';

describe('LLMService', () => {
  let service: LLMService;
  let mockLLaMAService: Partial<LLaMAService>;

  beforeEach(async () => {
    mockLLaMAService = {
      prompt: jest.fn()
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

  it('should successfully call llamaService.prompt with LLaMA2 model', async () => {
    const context = 'test context';
    const prompt = 'test prompt';
    const expectedResult = 'mocked response';
    let llamaServicePrompt = mockLLaMAService.prompt as jest.Mock;
    llamaServicePrompt.mockReturnValue(expectedResult);
  
    const result = await service.prompt(context, prompt, LLMModel.LLaMA2);
  
    expect(mockLLaMAService.prompt).toHaveBeenCalledWith(context, prompt);
    expect(result).toBe(expectedResult);
  });

  it('should throw NotImplementedException for models other than LLaMA2', async () => {
    const context = 'test context';
    const prompt = 'test prompt';
    const unsupportedModel = LLMModel.MISTRAL;
  
    await expect(service.prompt(context, prompt, unsupportedModel))
      .rejects.toThrow(NotImplementedException);
  });
});
