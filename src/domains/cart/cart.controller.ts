import { AddCartCommand } from './cqrs/commands/add-cart/add-cart.command';
import { AddCartResponseDto } from './../account/dto/add-cart.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseFilters, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartSubmitDto } from './dto/create-cart.dto';
import { CheckUserIdGuard } from './../../common/guards/user.guard';
import { Role } from './../user/entities/enums/user-role.enum';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Request_Was_Successful } from '../../common/translates/success.translate';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AuthGuard } from '@nestjs/passport';
import { diskStorage } from 'multer';
import * as fs from "fs";
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


@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.USER)
@Controller('api/v1/account')
@ApiTags('Account')
@Controller('cart')
export class CartController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }


  @UseGuards(CheckUserIdGuard)
  @Post('/')
  @ApiOkResponse({ type: AddCartResponseDto })
  async AddCart(@Body() body: CreateCartSubmitDto, @Req() req): Promise<AddCartResponseDto> {
    const result = await this.commandBus.execute(new AddCartCommand(req, body))
    return result as AddCartResponseDto
  }
}
