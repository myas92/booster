import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength, MaxLength, IsUUID } from 'class-validator';
export class AuthPasswordResetSubmitDto {

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(50)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/,
        { message: 'Password is week' })
    password: string;
}

export class AuthPasswordResetResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result
    @ApiProperty()
    message: string
}