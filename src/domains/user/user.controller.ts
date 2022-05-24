import { UserGuard } from './../../common/guards/user.guard';
import { UpdateUserCommand } from './cqrs/commands/update-user/update-user.command';
import { UpdateUserSubmitDto, UpdateUserResponseDto } from './dto/update-user.dto';
import { RolesGuard } from './../../common/guards/roles.guard';
import { GetUserQuery } from './cqrs/queries/get-user/get-user.query';
import { GetUserResponseDto } from './dto/get-users.dto';
import { AuthResendCodeResponseDto, AuthResendCodeSubmitDto } from './dto/delete-user.dto';
import { Request_Was_Successful } from '../../common/translates/success.translate';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import * as fs from "fs";
import {
    Body,
    Controller,
    Get,
    Headers,
    HttpStatus,
    Param,
    Patch,
    Post,
    Req,
    UseFilters,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiHeader,
    ApiNotFoundResponse,
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
@Roles(Role.User)
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

    @UseGuards(UserGuard)
    @Patch('/:userId')
    @ApiBody({ type: UpdateUserSubmitDto })
    @ApiOkResponse({ type: UpdateUserResponseDto })
    async updateUser(@Body() body: UpdateUserSubmitDto, @Req() req): Promise<UpdateUserResponseDto> {
        const result = await this.commandBus.execute(new UpdateUserCommand(req, body));
        return result as UpdateUserResponseDto
    }


    @Get('/:userId')
    async getUser(@Param("userId") userId, @Req() req): Promise<GetUserResponseDto> {
        // const result = await this.commandBus.execute(new AddUserCommand(req));
        const result = await this.queryBus.execute(new GetUserQuery(req, userId));
        return result as GetUserResponseDto
    }

}
