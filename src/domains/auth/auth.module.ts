import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { AuthRegisterCommandHandler } from "./cqrs/commands/auth-register/auth-register.command-handler";
import { AuthMailVerificationEntity } from "./entities/auth-mail-verification.entity";

import { AuthCheckUsernameQueryHandler } from './cqrs/queries/auth-check-username/auth-check-username.query-handler';


export const CommandHandlers = [
    AuthRegisterCommandHandler,
];
export const QueriesHandlers = [
    AuthCheckUsernameQueryHandler
];
export const EventHandlers = [

];

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthMailVerificationEntity]),
        ConfigModule.forRoot(),
        CqrsModule,
        JwtModule.register({
            secret: process.env.TOKEN_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRE },
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers],
    exports: [
        AuthService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers]
})


export class AuthModule {
}