import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsDate, IsDateString } from 'class-validator';
export class UploadFaceImageSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    national_card_image: string;
}

export class UploadFaceImageResultResponseDto {
    face_image: string
}

export class UploadFaceImageResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: UploadFaceImageResultResponseDto
    @ApiProperty()
    message: string
}