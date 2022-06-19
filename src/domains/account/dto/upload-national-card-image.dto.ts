import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsDate, IsDateString } from 'class-validator';
export class UploadNationalCardImageSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    national_card_image: string;
}

export class UploadNationalCardImageResultResponseDto {
    image: string
}

export class UploadNationalCardImageResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: UploadNationalCardImageResultResponseDto
    @ApiProperty()
    message: string
}