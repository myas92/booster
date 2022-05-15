import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { MailerService } from "@nestjs-modules/mailer";

import { AuthController } from './user.controller';
import { AuthService } from './user.service';

import { UserEntity } from "./entities/user.entity";

import { AddUserCommandHandler } from "./cqrs/commands/add-user/add-user.command-handler";
import { DeleteUserCommandHandler } from './cqrs/commands/delete-user/delete-user.command-handler';

import { AuthCheckUsernameQueryHandler } from './cqrs/queries/auth-check-username/auth-check-username.query-handler';

export const CommandHandlers = [
    AddUserCommandHandler,
    DeleteUserCommandHandler
];
export const QueriesHandlers = [
    AuthCheckUsernameQueryHandler
];
export const EventHandlers = [

];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
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
