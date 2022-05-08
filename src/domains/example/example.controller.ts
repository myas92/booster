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
import { AddExampleCommand } from "./cqrs/commands/add-example/add-example.command";
import { AddExampleSubmitDto, AddExampleResponseDto } from "./dto/example.dto";




// import { FormatResponseInterceptor } from "../../infrastructure/interceptors/format-response.interceptor";

// @UseInterceptors(FormatResponseInterceptor)
// @UseFilters(new HttpExceptionFilter())
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
    async register(@Body() body: AddExampleSubmitDto, @Req() req): Promise<AddExampleResponseDto> {
        console.log('--------------',body)
        const result = await this.commandBus.execute(new AddExampleCommand(req, body.name, body.info));
        return new AddExampleResponseDto('example added');
    }


}
