import { Module } from '@nestjs/common';
import { DiscordModule } from './modules/discord/discord.module';
import { envValidations } from './app.validations';
import { LLMModule } from './modules/llm/llm.module';
import { ConfigModule } from '@nestjs/config';
import { AppConfigModule } from './config/config.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { ContentTypeInterceptor } from './common/interceptors/content-type.interceptor';

/*
providers: Array of providers that will be instantiated by the Nest injector and that can be shared at least across this module.
controllers: Array of controllers that should be instantiated within the module.
imports: List of modules required by this module. Any exported providers from these modules will be available in our module via dependency injection.
exports: Array of providers to export to other modules.
*/
@Module({
  imports: [
    DiscordModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: envValidations
    }),
    LLMModule,
    AppConfigModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ContentTypeInterceptor,
    }
  ]
})
export class AppModule {}