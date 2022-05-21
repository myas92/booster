import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetUserQuery } from "./get-user.query";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

@QueryHandler(GetUserQuery)
export class GetUserQueryHandler implements IQueryHandler<GetUserQuery> {

    constructor(
    ) {
    }

    async execute(query: GetUserQuery): Promise<any> {
        try {
            console.log('First Event')
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }

    }

}