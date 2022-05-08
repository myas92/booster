import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { diskStorage } from 'multer';
import * as fs from "fs";
import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    UseFilters,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiConflictResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

// import { HttpExceptionFilter } from "../../infrastructure/filters/http-exception.filter";
import { AuthRegisterCommand } from "./cqrs/commands/auth-register/auth-register.command";
import { AuthRegisterResponseDto, AuthRegisterSubmitDto } from "./dto/auth-register.dto";




// import { FormatResponseInterceptor } from "../../infrastructure/interceptors/format-response.interceptor";

// @UseInterceptors(FormatResponseInterceptor)
// @UseFilters(new HttpExceptionFilter())
@Controller('api/auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    @Post('register')
    @ApiBody({ type: AuthRegisterSubmitDto  })
    async register(@Body() body: AuthRegisterSubmitDto, @Req() req): Promise<AuthRegisterResponseDto> {
        console.log('--------------',body)
        const result = await this.commandBus.execute(new AuthRegisterCommand(req, body.email, body.username, body.password));
        return new AuthRegisterResponseDto('please check your email');
    }


}
