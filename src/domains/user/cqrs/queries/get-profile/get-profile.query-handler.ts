import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { AuthCheckUsernameQuery } from "./get-profile.query";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@QueryHandler(AuthCheckUsernameQuery)
export class AuthCheckUsernameQueryHandler implements IQueryHandler<AuthCheckUsernameQuery> {

    constructor(
    ) {
    }

    async execute(query: AuthCheckUsernameQuery): Promise<any> {
        try {
            console.log('First Event')
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

}