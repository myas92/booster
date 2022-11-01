import { UpdatePersonalBasicInfoCommandHandler } from './cqrs/commands/update-personal-basic-info/update-personal-basic-info.command-handler';
import { GetAllProfilesQueryHandler } from './cqrs/queries/get-all-profiles/get-all-profiles.query-handler';
import { uploadFaceImageCommandHandler } from './cqrs/commands/upload-face-image/upload-face-image.command-handler';
import { NationalCardImageCommandHandler } from './cqrs/commands/upload-national-card-image/national-card-image.command-handler';
import { AddPhoneNumberCommandHandler } from './cqrs/commands/add-phone-number/add-phone-number.command-handler';
import { GetProfileQueryHandler } from './cqrs/queries/get-profile/get-profile.query-handler';
import { UpdateNationalCardStatusCommandHandler } from './cqrs/commands/update-national-card-status/update-national-card-status.command-handler';
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
    AddPhoneNumberCommandHandler,
    NationalCardImageCommandHandler,
    uploadFaceImageCommandHandler,
    UpdateNationalCardStatusCommandHandler
];
export const QueriesHandlers = [
];
export const EventHandlers = [
    GetProfileQueryHandler,
    GetAllProfilesQueryHandler

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
