import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsDate, IsDateString } from 'class-validator';
export class UpdatePersonalInfoSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(10)
    national_code: string;

    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
        { message: 'birthday must be a Date format' })
    birthday: string;
}

export class UpdatePersonalInfoResultResponseDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    national_code: string;
    @ApiProperty()
    birthday: string;
}

export class UpdatePersonalInfoResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: UpdatePersonalInfoResultResponseDto
    @ApiProperty()
    message: string
}