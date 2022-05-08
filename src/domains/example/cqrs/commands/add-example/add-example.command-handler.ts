import { generalConfig } from 'src/config/general.config';
import moment from "moment"
import { BadRequestException, ConflictException, InternalServerErrorException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AddExampleCommand } from "./add-example.command";
import { ExampleEntity } from "../../../entities/example.entity";


@CommandHandler(AddExampleCommand)
export class AddExampleCommandHandler implements ICommandHandler<AddExampleCommand> {

    constructor(
        private readonly commandBus: CommandBus,
    ) {
    }

    async execute(command: AddExampleCommand): Promise<any> {
        try {
            const {name, info} = command
            console.log('command', command)
            console.log('body', name);
            console.log('body', info)
            console.log('FIRST API')
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
