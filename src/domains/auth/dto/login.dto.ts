import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength, MaxLength } from 'class-validator';
export class LoginSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^(\+98|0)?9\d{9}$/,
        { message: 'Mobile number is not valid' })
    mobile_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/,
        { message: 'Password is week' })
    password: string;
}

export class LoginResponseDto {
    constructor(code: string, message: string) {
        this.message = message;
        this.code = code;
    }

    @ApiProperty()
    message: string
    code: string
}