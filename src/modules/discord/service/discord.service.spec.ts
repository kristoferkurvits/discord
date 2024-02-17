import { Test, TestingModule } from '@nestjs/testing';
import { DiscordService } from './discord.service';
import { DiscordClient } from './discord-client.service';
import { MessageService } from './message/message.service';
import { ConfigService } from '@nestjs/config';
import { LLMService } from '../../llm/service/llm.service';
import { Message } from 'discord.js';
import { LLMModel } from '../../llm/constants/model.enum';
import { Logger } from '@nestjs/common';
import { LLaMAService } from '../../llm/service/LLaMA/llama.service';
import { LLaMAClient } from '../../llm/client/llama-client.service';
import { DiscordModule } from '../discord.module';


describe('DiscordService', () => {
  let service: DiscordService;
  let mockDiscordClientService: Partial<DiscordClient>;
  let mockMessageService: Partial<MessageService>;
  let mockConfigService: Partial<ConfigService>;
  let mockLLMService: Partial<LLMService>;
  let logSpy;

  beforeEach(async () => {
    logSpy = jest.fn();
    Logger.prototype.log = logSpy;
    logSpy.mockClear();

    // Create mock implementations or spies for each dependency
    mockDiscordClientService = {
      onReady: jest.fn().mockImplementation((callback) => callback()),
      onMessage: jest.fn(),
    };
    mockMessageService = {
      isValidMessage: jest.fn((message: Message) => {
        let result = true;
        if(!message.content.startsWith("TOIVO!")) {
          result = false;
        }
        if(message.member.user.bot) {
          result = false;
        }
        if(message.channelId !== "correctChannelId") {
          result = false;
        }
        return result;
      }),
    };
    mockConfigService = {
      get: jest.fn().mockImplementation((key: string) => {
        if (key === 'LLAMA_DEFAULT_SYSTEM_MESSAGE') {
          return 'You are a smart assistant';
        }
        if (key === 'CHATBOT_NAME') {
          return 'Botzor';
        }
        return null;
      }),
    };
    mockLLMService = {
      prompt: jest.fn().mockResolvedValue('Mocked Reply'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscordService,
        {
          provide: DiscordClient,
          useValue: mockDiscordClientService,
        },
        {
          provide: MessageService,
          useValue: mockMessageService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: LLMService,
          useValue: mockLLMService,
        },
      ],
    })
    .compile();

    service = module.get<DiscordService>(DiscordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('onMessageListener', () => {
    it('should reply to valid messages', async () => {
      // Simulate a valid Discord message object
      const mockMessage = {
        content: 'TOIVO! Hi there!',
        reply: jest.fn().mockResolvedValue(true),
        member: {
          user: {
            bot: false
          }
        },
        channelId: "correctChannelId"
      } as unknown as Message;

      // Trigger the onMessageListener logic
      await service['onMessageListener']();

      // Invoke the onMessage handler with the mock message
      const onMessage = mockDiscordClientService.onMessage as jest.Mock;
      const onMessageCallback = onMessage.mock.calls[0][0];
      await onMessageCallback(mockMessage);

      // Assertions
      expect(mockMessageService.isValidMessage).toHaveBeenCalledWith(mockMessage);
      expect(mockLLMService.prompt).toHaveBeenCalledWith(
        'You are a smart assistant',
        mockMessage.content,
        LLMModel.LLaMA2,
      );
      expect(mockMessage.reply).toHaveBeenCalledWith('Mocked Reply');
    });

    it('should not reply to invalid messages', async () => {
      // Setup the mock to return false for isValidMessage
      mockMessageService.isValidMessage = jest.fn().mockReturnValue(false);

      // Simulate an invalid Discord message object
      const mockMessage = {
        content: 'Invalid message content',
        reply: jest.fn().mockResolvedValue(true),
      } as unknown as Message;

      // Trigger the onMessageListener logic
      await service['onMessageListener']();

      // Invoke the onMessage handler with the mock message
      const onMessage = mockDiscordClientService.onMessage as jest.Mock;
      const onMessageCallback = onMessage.mock.calls[0][0];
      await onMessageCallback(mockMessage);

      // Assertions
      expect(mockMessageService.isValidMessage).toHaveBeenCalledWith(mockMessage);
      expect(mockLLMService.prompt).not.toHaveBeenCalled();
      expect(mockMessage.reply).not.toHaveBeenCalled();
    });


    it('should handle errors during prompt', async () => {
      // Setup the mock to reject with an error during prompt
      const promptError = new Error('LLM service error');
      mockLLMService.prompt = jest.fn().mockRejectedValue(promptError);

      // Simulate a valid Discord message object
      const mockMessage = {
        content: 'Hi there!',
        reply: jest.fn().mockResolvedValue(true),
        member: {
          user: {
            bot: false
          }
        },
        channelId: "correctChannelId"
      } as unknown as Message;

      // Trigger the onMessageListener logic
      await service['onMessageListener']();

      // Invoke the onMessage handler with the mock message
      const onMessage = mockDiscordClientService.onMessage as jest.Mock;
      const onMessageCallback = onMessage.mock.calls[0][0];

      await onMessageCallback(mockMessage);
      expect(mockMessage.reply).not.toHaveBeenCalled();
    });
  });

  describe('initialize', () => {
    it('should log the startup message', () => {
      service.initialize();

      // Assertions
      expect(mockDiscordClientService.onReady).toHaveBeenCalled();
      expect(mockConfigService.get).toHaveBeenCalledWith("CHATBOT_NAME");
      expect(logSpy).toHaveBeenCalledWith("Botzor reporting for duty!");
    });

    it('should setup message listener', () => {
      service.initialize();

      // Assertions
      expect(mockDiscordClientService.onMessage).toHaveBeenCalled();
    });
  });
});
