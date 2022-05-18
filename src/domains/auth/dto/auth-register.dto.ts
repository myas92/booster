import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty } from 'class-validator';
export class AuthRegisterSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    // @IsMobilePhone()
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

    @ApiProperty()
    @MaxLength(20)
    invite_code: string;

    @ApiProperty()
    @MaxLength(1000)
    captcha: string;
}

export class AuthRegisterResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result
    @ApiProperty()
    message: string
}