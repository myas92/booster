import { UserModule } from './domains/user/user.module';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CqrsModule } from "@nestjs/cqrs";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// Modules
import { AuthModule } from './domains/auth/auth.module';
import { ExampleModule } from './domains/example/example.module';
import { AccountModule } from './domains/account/account.module';

// Middleware
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { LanguageMiddleware } from './common/middlewares/language.middleware'

import { Connection } from 'typeorm';
import { CartModule } from './domains/cart/cart.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    UserModule,
    AccountModule,
    ExampleModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  constructor(private connection: Connection) {}
  configure(consumer: MiddlewareConsumer, ) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
    consumer
      .apply(LanguageMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL })
  }
}
