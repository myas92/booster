import { generalConfig } from 'src/config/general.config';
import moment from "moment"
import { BadRequestException, ConflictException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { CommandBus, CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Connection, Repository } from "typeorm";
import { hashSync } from "bcrypt";

import { AddExampleRollbackCommand } from "./add-example-rollback.command"
import { ExampleEntity } from "../../../entities/example.entity";
import { ExampleStatusTypeEnum } from 'src/domains/example/entities/example-status-type.enum';


@CommandHandler(AddExampleRollbackCommand)
export class AddExampleRollbackCommandHandler implements ICommandHandler<AddExampleRollbackCommand> {

    constructor(
        private readonly commandBus: CommandBus,
        @InjectRepository(ExampleEntity)
        private readonly exampleRepository: Repository<ExampleEntity>,
        private readonly connection: Connection
    ) {
    }

    async execute(command: AddExampleRollbackCommand): Promise<any> {
        try {
            const { name } = command
            let firstExample = new ExampleEntity();
            firstExample.name = `first: ${name}`;
            firstExample.status = ExampleStatusTypeEnum.ACTIVE;

            let secondExample = new ExampleEntity();
            secondExample.name = `second: ${name}`;
            secondExample.status = ExampleStatusTypeEnum.INACTIVE;

            let thirdExampleQuery = `
            INSERT INTO example_entity(name, status)
            VALUES ('third: ${name}', '${ExampleStatusTypeEnum.INACTIVE}');`

            const queryRunner = this.connection.createQueryRunner();

            await queryRunner.connect();
            await queryRunner.startTransaction();
            try {
                await queryRunner.manager.save(firstExample);
                await queryRunner.manager.save(secondExample);
                await queryRunner.query(thirdExampleQuery);

                await queryRunner.commitTransaction();
            } catch (err) {
                await queryRunner.rollbackTransaction();
            } finally {
                await queryRunner.release();
            }

        } catch (error) {
            throw new HttpException(error, error.status);
        }
    }

}
