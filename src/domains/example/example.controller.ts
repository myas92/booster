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

import { AddExampleCommand } from "./cqrs/commands/add-example/add-example.command";
import { AddExampleSubmitDto, AddExampleResponseDto } from "./dto/example.dto";
import { AddExampleRollbackCommand } from "./cqrs/commands/add-example-rollback/add-example-rollback.command";
import { FormatResponseInterceptor } from './../../common/interceptors/format-response.interceptor';
import { HttpExceptionFilter } from './../../common/filters/http-exception.filter';






@UseInterceptors(FormatResponseInterceptor)
@UseFilters(new HttpExceptionFilter())
@Controller('api/example')
@ApiTags('Example')
export class ExampleController {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) {
    }

    @Post('add')
    @ApiBody({ type: AddExampleSubmitDto  })
    async addExample(@Body() body: AddExampleSubmitDto, @Req() req): Promise<AddExampleResponseDto> {
        const result = await this.commandBus.execute(new AddExampleCommand(req, body.name));
        return new AddExampleResponseDto('example added');
    }
    @Post('add/rollback')
    @ApiBody({ type: AddExampleSubmitDto  })
    async addExampleRollback(@Body() body: AddExampleSubmitDto, @Req() req): Promise<AddExampleResponseDto> {
        const result = await this.commandBus.execute(new AddExampleRollbackCommand(req, body.name));
        return new AddExampleResponseDto('example added');
    }


}
