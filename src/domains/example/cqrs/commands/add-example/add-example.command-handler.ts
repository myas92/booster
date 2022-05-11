import { ExampleStatusTypeEnum } from './../../../entities/example-status-type.enum';
import { generalConfig } from 'src/config/general.config';
import moment from "moment"
import { BadRequestException, ConflictException, HttpException, InternalServerErrorException } from "@nestjs/common";
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
        @InjectRepository(ExampleEntity)
        private readonly exampleRepository: Repository<ExampleEntity>
    ) {
    }

    async execute(command: AddExampleCommand): Promise<any> {
        try {
            const {name} = command
            let example = new ExampleEntity();
            example.name = name;
            example.status = ExampleStatusTypeEnum.ACTIVE;
            await this.exampleRepository.save(example);
            return example

        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}
