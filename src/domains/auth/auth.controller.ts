import { TrimPipe } from './../../common/pipes/trim.pipe';
import { AuthLoginCommand } from './cqrs/commands/auth-login/auth-login.command';
import { AuthLoginSubmitDto, AuthLoginResponseDto } from './dto/auth-login.dto';
import { AuthConfirmSubmitDto, AuthConfirmResponseDto } from './dto/auth-confirm.dto';
import { AuthConfirmCommand } from './cqrs/commands/auth-confirm/auth-confirm.command';
import { AuthResendCodeResponseDto, AuthResendCodeSubmitDto } from './dto/auth-resend-code.dto';
import { Request_Was_Successful } from './../../common/translates/success.translate';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { diskStorage } from 'multer';
import * as fs from "fs";
import {
    Body,
    Controller,
    Headers,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseFilters,
    UseInterceptors,
    UsePipes,
} from '@nestjs/common';
import {
    ApiBody,
    ApiOkResponse,
    ApiTags
} from "@nestjs/swagger";

// import { HttpExceptionFilter } from "../../infrastructure/filters/http-exception.filter";
import { AuthRegisterCommand } from "./cqrs/commands/auth-register/auth-register.command";
import { AuthRegisterResponseDto, AuthRegisterSubmitDto } from "./dto/auth-register.dto";
import { FormatResponseInterceptor } from "../../common/interceptors/format-response.interceptor";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";
import { AuthService } from "./auth.service";
import { AuthResendCodeCommand } from "./cqrs/commands/auth-resend-code/auth-resend-code.command";




// import { FormatResponseInterceptor } from "../../infrastructure/interceptors/format-response.interceptor";

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('api/v1/auth')
@ApiTags('Auth')
export class AuthController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        private readonly authService: AuthService
    ) {
    }

    @Post('register')
    @HttpCode(200)
    @ApiBody({ type: AuthRegisterSubmitDto })
    @ApiOkResponse({ type: AuthRegisterResponseDto })
    async register(@Body() body: AuthRegisterSubmitDto, @Req() req): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new AuthRegisterCommand(req, body));
        return result as AuthRegisterResponseDto;
    }
    
    @Post('resend-code')
    @HttpCode(200)
    @ApiBody({ type: AuthResendCodeSubmitDto })
    @ApiOkResponse({type: AuthRegisterResponseDto})
    async resendToken(@Body() body: AuthResendCodeSubmitDto, @Req() req): Promise<AuthRegisterResponseDto> {
        const result = await this.commandBus.execute(new AuthResendCodeCommand(req, body.mobile_number));
        return result as AuthRegisterResponseDto
    }
    @Post('confirm')
    @HttpCode(200)
    @UsePipes(new TrimPipe())
    @ApiBody({ type: AuthConfirmResponseDto })
    @ApiOkResponse({ type: AuthLoginResponseDto })
    async confirmResendCode(@Body() body: AuthConfirmSubmitDto, @Req() req): Promise<AuthConfirmResponseDto> {
        const result = await this.commandBus.execute(new AuthConfirmCommand(req, body));
        return result as AuthConfirmResponseDto
    }
    @Post('login')
    @HttpCode(200)
    @UsePipes(new TrimPipe())
    @ApiBody({ type: AuthLoginSubmitDto })
    @ApiOkResponse({ type: AuthLoginResponseDto })
    async login(@Body() body: AuthLoginSubmitDto, @Req() req, @Headers('language') language): Promise<AuthLoginResponseDto> {
        const result = await this.commandBus.execute(new AuthLoginCommand(req, body));
        return result as AuthLoginResponseDto
    }


}
