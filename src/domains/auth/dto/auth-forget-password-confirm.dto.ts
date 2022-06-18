import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsUUID } from 'class-validator';
export class AuthForgetPasswordConfirmSubmitDto {
    @ApiProperty()
    @IsUUID()
    stream_token: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    code: string;
}

export class AuthForgetPasswordConfirmResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result
    @ApiProperty()
    message: string
}