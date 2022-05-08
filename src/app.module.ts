import { Module } from '@nestjs/common';
import { CqrsModule } from "@nestjs/cqrs";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
// Modules
import { AuthModule } from './domains/auth/auth.module';
import { ExampleModule } from './domains/example/example.module';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ExampleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
