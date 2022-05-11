import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule } from "@nestjs/config";

import { ExampleController } from './example.controller';
import { ExampleService } from './example.service';

import { AddExampleCommandHandler } from "./cqrs/commands/add-example/add-example.command-handler";
import { ExampleEntity } from "./entities/example.entity";

import { AuthCheckUsernameQueryHandler } from './cqrs/queries/auth-check-username/auth-check-username.query-handler';
import { AddExampleRollbackCommandHandler } from './cqrs/commands/add-example-rollback/add-example-rollback.command-handler';


export const CommandHandlers = [
    AddExampleCommandHandler,
    AddExampleRollbackCommandHandler
];
export const QueriesHandlers = [
    AuthCheckUsernameQueryHandler
];
export const EventHandlers = [

];

@Module({
    imports: [
        TypeOrmModule.forFeature([ExampleEntity]),
        ConfigModule.forRoot(),
        CqrsModule
    ],
    controllers: [ExampleController],
    providers: [
        ExampleService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers],
    exports: [
        ExampleService,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueriesHandlers]
})


export class ExampleModule {
}
