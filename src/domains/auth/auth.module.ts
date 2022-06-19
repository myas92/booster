import { AuthPasswordResetCommandHandler } from './cqrs/commands/auth-password-reset/auth-password-reset.command-handler';
import { AuthForgetPasswordConfirmCommandHandler } from './cqrs/commands/auth-forget-password-confirm/auth-forget-password-confirm.command-handler';
import { AuthForgetPasswordCommandHandler } from './cqrs/commands/auth-forget-password/auth-forget-password.command-handler';
import { AuthEventEntity } from './entities/auth-event.entity';
import { AuthSendCodeSmsEventHandler } from './cqrs/events/auth-send-code-sms.event-handler';
import { AccountEntity } from './../account/entities/account.entity';
import { AccountService } from './../account/account.service';
import { JwtStrategy } from './../../common/auth-strategies/jwt.strategy';
import { AuthLoginConfirmCommandHandler } from './cqrs/commands/auth-login-confirm-code/auth-login-confirm.command-handler';
import { LoginVerificationEntity } from './entities/auth-login-verification.entity';
import { AuthLoginCommandHandler } from './cqrs/commands/auth-login/auth-login.command-handler';
import { AuthConfirmCommandHandler } from './cqrs/commands/auth-confirm/auth-confirm.command-handler';
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
import { AuthResendCodeCommandHandler } from './cqrs/commands/auth-resend-code/auth-resend-code.command-handler';
import { UserModule } from '../user/user.module'

export const CommandHandlers = [
    AuthRegisterCommandHandler,
    AuthResendCodeCommandHandler,
    AuthConfirmCommandHandler,
    AuthLoginCommandHandler,
    AuthLoginConfirmCommandHandler,
    AuthForgetPasswordCommandHandler,
    AuthForgetPasswordConfirmCommandHandler,
    AuthPasswordResetCommandHandler
];
export const QueriesHandlers = [
    AuthCheckUsernameQueryHandler
];
export const EventHandlers = [
    AuthSendCodeSmsEventHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([AuthVerificationEntity, LoginVerificationEntity, AccountEntity, AuthEventEntity]),
        CqrsModule,
        UserModule,
        JwtModule.register({
            secret: process.env.TOKEN_SECRET,
            signOptions: { expiresIn: process.env.TOKEN_EXPIRE },
        }),
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        AuthService,
        AccountService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers],
    exports: [
        JwtStrategy,
        AuthService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers]
})


export class AuthModule {
}
