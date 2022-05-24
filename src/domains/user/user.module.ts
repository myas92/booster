import { RolesGuard } from './../../common/guards/roles.guard';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";

import { UserController } from './user.controller';
import { UserService } from './user.service';

import { UserEntity } from "./entities/user.entity";

import { AddUserCommandHandler } from "./cqrs/commands/add-user/add-user.command-handler";
import { DeleteUserCommandHandler } from './cqrs/commands/delete-user/delete-user.command-handler';

import { GetUserQueryHandler } from './cqrs/queries/get-user/get-user.query-handler';
import { APP_GUARD } from '@nestjs/core';

export const CommandHandlers = [
    AddUserCommandHandler,
    DeleteUserCommandHandler
];
export const QueriesHandlers = [
    GetUserQueryHandler
];
export const EventHandlers = [

];

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        CqrsModule,
    ],
    controllers: [UserController],
    providers: [
        UserService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers],
    exports: [
        UserService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers]
})


export class UserModule {
}
