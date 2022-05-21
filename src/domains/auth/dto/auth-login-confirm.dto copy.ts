import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Matches, MinLength, MaxLength, IsUUID } from 'class-validator';
export class AuthLoginConfirmSubmitDto {

    @ApiProperty()
    @IsUUID()
    stream_token: string

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(6)
    code: string;
}

export class AuthLoginConfirmResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result
    @ApiProperty()
    message: string
}