import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches } from 'class-validator';
export class AuthResendCodeSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^(\+98|0)?9\d{9}$/,
        { message: 'Mobile number is not valid' })
    mobile_number: string;
}

export class AuthResendCodeResponseDto {
    constructor(code: string, message: string) {
        this.message = message;
        this.code = code;
    }

    @ApiProperty()
    message: string
    code: string
}