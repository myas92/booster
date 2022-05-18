import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength, MaxLength } from 'class-validator';
import { UserEntity } from "src/domains/user/entities/user.entity";
export class AuthLoginSubmitDto {
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

export class AuthLoginUserResponseDto {
    @ApiProperty()
    token: string;
}

export class AuthLoginResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: AuthLoginUserResponseDto
    @ApiProperty()
    message: string
}