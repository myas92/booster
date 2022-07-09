import { Repository, Connection } from 'typeorm';
import { UserEntity } from './../../../entities/user.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../../../user.service';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUsersQuery } from "./get-users.query";
import { HttpException, InternalServerErrorException } from "@nestjs/common";

@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly userService: UserService,
        @InjectConnection() private readonly connection: Connection
    ) {
    }

    async execute(query: GetUsersQuery): Promise<any> {
        try {
            let { limit, offset } = query.req.query;
            limit = limit ? limit : 10;
            offset = offset ? offset : 0
            // First way:
            // let foundedUsers = await this.connection.query('SELECT * FROM USERS;');

            // Second way:
            // let foundedUsers = await this.userRepository.createQueryBuilder("users").getMany();

            // Third way:
            const foundedUsers = await this.userRepository.findAndCount(
                {
                    select: ['id', 'mobile_number', 'email', 'invite_code', 'kyc_info', 'settings'],
                    where: {}, order: { created_at: "DESC" },
                    take: limit,
                    skip: offset
                }
            )


            return { total: foundedUsers[1], data: foundedUsers[0] }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

}