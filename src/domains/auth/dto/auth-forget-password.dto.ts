import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty } from 'class-validator';
export class AuthForgetPasswordSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone()
    // @Matches(/^(\+98|0)?9\d{9}$/,
    //     { message: 'Mobile number is not valid' })
    mobile_number: string;

    @ApiProperty()
    @MaxLength(1000)
    captcha: string;
}

export class AuthForgetPasswordResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result
    @ApiProperty()
    message: string
}