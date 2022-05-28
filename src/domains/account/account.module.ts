import { GetAccountQueryHandler } from './cqrs/queries/get-profile/get-profile.query-handler';
import { AddCartCommandHandler } from './cqrs/commands/add-cart/add-cart.command-handler';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";
import { MailerService } from "@nestjs-modules/mailer";

import { AccountController } from './account.controller';
import { AccountService } from './account.service';

import { AccountEntity } from "./entities/account.entity";


import { APP_GUARD } from '@nestjs/core';

export const CommandHandlers = [
    AddCartCommandHandler
];
export const QueriesHandlers = [
];
export const EventHandlers = [
    GetAccountQueryHandler
];

@Module({
    imports: [
        TypeOrmModule.forFeature([AccountEntity]),
        CqrsModule,
    ],
    controllers: [AccountController],
    providers: [
        AccountService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers],
    exports: [
        AccountService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers]
})


export class AccountModule {
}
