import { Module } from '@nestjs/common';
import { DiscordModule } from './discord/discord.module';
import { ConfigModule } from '@nestjs/config';
import { envValidations } from './app.validations';

@Module({
  imports: [
    DiscordModule,
    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `.env.${process.env.NODE_ENV}`,
        validationSchema: envValidations
      })
]
})
export class AppModule {}