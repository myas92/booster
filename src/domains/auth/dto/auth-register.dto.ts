import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone } from 'class-validator';
export class AuthRegisterSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    // @IsMobilePhone()
    @Matches(/^(\+98|0)?9\d{9}$/,
    {message: 'Mobile number is not valid'})
    mobileNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/,
    {message: 'Password is week'})
    password: string;
}

export class AuthRegisterResponseDto {
    constructor(message: string) {
        this.message = message;
    }

    @ApiProperty()
    message: string
}