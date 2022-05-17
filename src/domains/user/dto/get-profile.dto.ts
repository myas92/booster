import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty } from 'class-validator';
export class GetProfileSubmitDto {
}

export class GetProfileResponseDto {
    constructor(code: string, message: string) {
        this.message = message;
        this.code = code;
    }

    @ApiProperty()
    message: string
    code: string
}