import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { AuthRegisterCommandHandler } from "./cqrs/commands/auth-register/auth-register.command-handler";
import { AuthVerificationEntity } from "./entities/auth-verification.entity";

import { AuthCheckUsernameQueryHandler } from './cqrs/queries/auth-check-username/auth-check-username.query-handler';
import { ResendCodeCommandHandler } from './cqrs/commands/resend-code/resend-code.command-handler';
import { UserModule } from '../user/user.module'

export const CommandHandlers = [
    AuthRegisterCommandHandler,
    ResendCodeCommandHandler
];
export const QueriesHandlers = [
    AuthCheckUsernameQueryHandler
];
export const EventHandlers = [

];

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthVerificationEntity]),
        CqrsModule,
        JwtModule.register({
            secret: process.env.TOKEN_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRE },
        }),
        UserModule
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
