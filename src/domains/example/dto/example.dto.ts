import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';
export class AddExampleSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(50)
    name: string;
}

export class AddExampleResponseDto {
    constructor(message: string) {
        this.message = message;
    }

    @ApiProperty()
    message: string
}