import { UpdatePersonalBasicInfoCommand } from './cqrs/commands/update-personal-basic-info/update-personal-basic-info.command';
import { UpdatePersonalInfoSubmitDto, UpdatePersonalInfoResponseDto } from './dto/update-personal-info.dto';
import { GetAllProfilesQuery } from './cqrs/queries/get-all-profiles/get-all-profiles.query';
import { UploadNationalCardImageResponseDto } from './dto/upload-national-card-image.dto';
import { UploadFaceImageResponseDto } from './dto/upload-face-image.dto';
import { uploadFaceImageCommand } from './cqrs/commands/upload-face-image/upload-face-image.command';
import { NationalCardImageCommand } from './cqrs/commands/upload-national-card-image/national-card-image.command';
import { AddPhoneNumberSubmitDto, AddPhoneNumberResponseDto } from './dto/add-phone-number.dto';
import { AddPhoneNumberCommand } from './cqrs/commands/add-phone-number/add-phone-number.command';
import { storageImage, editFileName } from './../../common/utils/upload-image';
import { BadRequestException } from '@nestjs/common';
import { imageFileFilter } from './../../common/utils/image-file-filter';
import { CheckUserIdGuard } from './../../common/guards/user.guard';
import { Role } from './../user/entities/enums/user-role.enum';
import { GetProfileResultResponseDto } from './dto/get-profile.dto';
import { GetProfileQuery } from './cqrs/queries/get-profile/get-profile.query';
import { AddCartSubmitDto, AddCartResponseDto } from './dto/add-cart.dto';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Request_Was_Successful } from '../../common/translates/success.translate';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import * as fs from "fs";
import { Express } from 'express';
import { Multer } from 'multer';
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
import LocalFilesInterceptor from 'src/common/interceptors/local-file.interceptor';

@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('api/v1/account')
@ApiTags('Account')
export class AccountController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    // ------------------------- Admin Role -------------------------

    @Roles(Role.ADMIN)
    @UseGuards(CheckUserIdGuard)
    @Get('/profiles')
    @ApiParam({ name: 'userId', type: 'uuid' })
    @ApiOkResponse({ type: GetProfileResultResponseDto })
    async getAllProfiles(@Param("userId") userId, @Req() req): Promise<GetProfileResultResponseDto> {
        const result = await this.queryBus.execute(new GetAllProfilesQuery(req));
        return result as GetProfileResultResponseDto
    }

    // ---------------------- Admin & User Role ------------------------


   // ------------------------- User Role ------------------------------

    @Roles(Role.USER)
    @UseGuards(CheckUserIdGuard)
    @Get('/profile/:userId')
    @ApiParam({ name: 'userId', type: 'uuid' })
    @ApiOkResponse({ type: GetProfileResultResponseDto })
    async getProfile(@Param("userId") userId, @Req() req): Promise<GetProfileResultResponseDto> {
        const result = await this.queryBus.execute(new GetProfileQuery(req, userId));
        return result as GetProfileResultResponseDto
    }


    @Roles(Role.USER)
    @Post('/phone-number')
    @ApiBody({ type: AddPhoneNumberSubmitDto })
    async addPhoneNumber(@Body() body: AddPhoneNumberSubmitDto, @Req() req): Promise<AddPhoneNumberResponseDto> {
        const result = await this.commandBus.execute(new AddPhoneNumberCommand(req, body));
        return result as AddPhoneNumberResponseDto
    }

    @Roles(Role.USER)
    @Post('/national-card-image')
    @UseInterceptors(
        FileInterceptor('national_card_image', {
            storage: diskStorage({
                destination: storageImage,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadNationalCarrdImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
        const result = await this.commandBus.execute(new NationalCardImageCommand(req, file));
        return result as AddPhoneNumberResponseDto
    }

    @Roles(Role.USER)
    @Post('/face-image')
    @UseInterceptors(
        FileInterceptor('face_image', {
            storage: diskStorage({
                destination: storageImage,
                filename: editFileName,
            }),
            fileFilter: imageFileFilter,
        }),
    )
    async uploadImageFace(@UploadedFile() file: Express.Multer.File, @Req() req) {
        const result = await this.commandBus.execute(new uploadFaceImageCommand(req, file));
        return result as UploadNationalCardImageResponseDto
    }

    @Roles(Role.USER)
    @UseGuards(CheckUserIdGuard)
    @Patch('/personal-basic-info/:userId')
    @ApiBody({ type: UpdatePersonalInfoSubmitDto })
    @ApiOkResponse({ type: UpdatePersonalInfoResponseDto })
    async updatePersonalInfo(@Body() body: UpdatePersonalInfoSubmitDto, @Req() req): Promise<UpdatePersonalInfoResponseDto> {
        const result = await this.commandBus.execute(new UpdatePersonalBasicInfoCommand(req, body));
        return result as UpdatePersonalInfoResponseDto
    }

}
