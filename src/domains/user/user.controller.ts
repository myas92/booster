import { GetUsersQuery } from './cqrs/queries/get-users/get-users.query';
import { CheckUserIdGuard } from './../../common/guards/user.guard';
import { UpdateUserCommand } from './cqrs/commands/update-user/update-user.command';
import { UpdateUserSubmitDto, UpdateUserResponseDto } from './dto/update-user.dto';
import { RolesGuard } from './../../common/guards/roles.guard';
import { GetUserQuery } from './cqrs/queries/get-user/get-user.query';
import { GetUserResponseDto } from './dto/get-users.dto';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from '@nestjs/passport';
import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";


// import { HttpExceptionFilter } from "../../infrastructure/filters/http-exception.filter";
import { AddUserResponseDto, AddUserSubmitDto } from "./dto/add-user.dto";
import { FormatResponseInterceptor } from "../../common/interceptors/format-response.interceptor";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";

import { AddUserCommand } from "./cqrs/commands/add-user/add-user.command";
import { DeleteUserCommand } from "./cqrs/commands/delete-user/delete-user.command";
import { Roles } from 'src/common/decorators/get-role.decorator';
import { Role } from './entities/enums/user-role.enum';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/v1/user')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    
    @Post('/')
    @ApiBody({ type: AddUserSubmitDto })
    async register(@Body() body: AddUserSubmitDto, @Req() req): Promise<AddUserResponseDto> {
        const result = await this.commandBus.execute(new AddUserCommand(req, body));
        return result as AddUserResponseDto
    }

    @Roles(Role.USER)
    @UseGuards(CheckUserIdGuard)
    @Patch('/:userId')
    @ApiBody({ type: UpdateUserSubmitDto })
    @ApiOkResponse({ type: UpdateUserResponseDto })
    async updateUser(@Body() body: UpdateUserSubmitDto, @Req() req): Promise<UpdateUserResponseDto> {
        const result = await this.commandBus.execute(new UpdateUserCommand(req, body));
        return result as UpdateUserResponseDto
    }

    @Roles(Role.USER)
    @Get('/:userId')
    async getUser(@Param("userId") userId, @Req() req): Promise<GetUserResponseDto> {
        const result = await this.queryBus.execute(new GetUserQuery(req, userId));
        return result as GetUserResponseDto
    }

    @Roles(Role.ADMIN)
    @Get('/')
    async getUsers(@Param("userId") userId, @Req() req): Promise<GetUserResponseDto> {
        const result = await this.queryBus.execute(new GetUsersQuery(req, userId));
        return result as GetUserResponseDto
    }

}
