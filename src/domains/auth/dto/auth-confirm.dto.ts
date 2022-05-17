import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength, MaxLength, Matches } from 'class-validator';
export class AuthConfirmSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    // @IsMobilePhone()
    @Matches(/^(\+98|0)?9\d{9}$/,
        { message: 'Mobile number is not valid' })
    mobile_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    code: string;
}

export class AuthConfirmResponseDto {
    constructor(code: string, message: string) {
        this.message = message;
        this.code = code;
    }

    @ApiProperty()
    message: string
    code: string
}