import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsDate, IsDateString, IsString } from 'class-validator';
export class AddPhoneNumberSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    phone_number: string;
}

export class AddPhoneNumberResultResponseDto {
}

export class AddPhoneNumberResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: AddPhoneNumberResultResponseDto
    @ApiProperty()
    message: string
}