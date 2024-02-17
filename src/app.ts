import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DiscordService } from './modules/discord/service/discord.service';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

const configService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter);
  const discordService = app.get(DiscordService);
  discordService.initialize();
  const port = configService.getOrThrow<number>("SERVER_PORT");
  await app.listen(port);
  Logger.log("Application is running on port " + port);
}
bootstrap();