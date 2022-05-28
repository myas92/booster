import { BadRequestException } from '@nestjs/common';
import { imageFileFilter } from './../../common/utils/image-file-filter';
import { editFileName } from './../../common/utils/helpers';
import { CheckUserIdGuard } from './../../common/guards/user.guard';
import { Role } from './../user/entities/enums/user-role.enum';
import { GetProfileResultResponseDto } from './dto/get-profile.dto';
import { GetProfileQuery } from './cqrs/queries/get-profile/get-profile.query';
import { AddCartCommand } from './cqrs/commands/add-cart/add-cart.command';
import { AddCartSubmitDto, AddCartResponseDto } from './dto/add-cart.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
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
    UploadedFile,
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
    ApiParam,
    ApiTags
} from "@nestjs/swagger";

import { FormatResponseInterceptor } from "../../common/interceptors/format-response.interceptor";
import { HttpExceptionFilter } from "../../common/filters/http-exception.filter";


import { Roles } from 'src/common/decorators/get-role.decorator';

import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { Express } from 'express';
import LocalFilesInterceptor from 'src/common/interceptors/local-file.interceptor';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.USER)
@Controller('api/v1/account')
@ApiTags('Account')
export class AccountController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @UseGuards(CheckUserIdGuard)
    @Get('/profile/:userId')
    @ApiParam({ name: 'userId', type: 'uuid' })
    @ApiOkResponse({ type: GetProfileResultResponseDto })
    async getProfile(@Param("userId") userId, @Req() req): Promise<GetProfileResultResponseDto> {
        const result = await this.queryBus.execute(new GetProfileQuery(req, userId));
        return result as GetProfileResultResponseDto
    }

    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const userId = '12313123'
                    const dir = `./upload/user-${userId}/profile`;
                    const checkFullPath = fs.existsSync(dir);
                    if (!checkFullPath) {
                        let result;
                        let check = fs.existsSync(`./upload/user-${userId}`);
                        if (!check) {
                            result = fs.mkdirSync(`./upload/user-${userId}`, { recursive: true });
                            result = fs.mkdirSync(dir, { recursive: true });
                        }
                        else {
                            result = fs.mkdirSync(dir, { recursive: true });
                        }
                        return cb(null, result)
                    }
                    return cb(null, dir)
                },
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    @Post('/national-cart-image')
    @ApiBody({ type: AddCartSubmitDto })
    async uploadNationalCartImage(@Body() body: AddCartSubmitDto, @Req() req): Promise<AddCartResponseDto> {
        const result = await this.commandBus.execute(new AddCartCommand(req, body));
        return result as AddCartResponseDto
    }

    @Post('/upload')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const userId = req.user["id"];
                    const dir = `./upload/${userId}/national-image`;
                    const checkFullPath = fs.existsSync(dir);
                    if (!checkFullPath) {
                        let result;
                        let check = fs.existsSync(`./upload/${userId}`);
                        if (!check) {
                            result = fs.mkdirSync(`./upload/${userId}`, { recursive: true });
                            result = fs.mkdirSync(dir, { recursive: true });
                        }
                        else {
                            result = fs.mkdirSync(dir, { recursive: true });
                        }
                        return cb(null, result)
                    }
                    return cb(null, dir)
                },
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async upload(@UploadedFile() file: Express.Multer.File, @Req() req) {    
        const result = {}
        return result
    }

}
