import { Module } from '@nestjs/common';
import { DiscordModule } from './discord/discord.module';
import { ConfigModule } from '@nestjs/config';
import { envValidations } from './app.validations';
import { LLMService } from './llm/service/llm.service';
import { LLMModule } from './llm/llm.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    DiscordModule,
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`,
        validationSchema: envValidations
      }),
    LLMModule,
    CommonModule
],
  providers: [LLMService]
})
export class AppModule {}