import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DiscordService } from './discord/service/discord.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const discordService = app.get(DiscordService);
  discordService.initialize();
  const port = configService.getOrThrow<number>("SERVER_PORT");
  await app.listen(port);
  Logger.log("Application is running on port " + port);
}
bootstrap();