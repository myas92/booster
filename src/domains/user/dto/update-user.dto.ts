import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsDate, IsDateString } from 'class-validator';
export class UpdateUserSubmitDto {
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
    @MinLength(8)
    @MaxLength(8)
    birthday: string;
}

// export class UpdateUserResultResponseDto {
//     @ApiProperty()
//     token: string;
// }

export class UpdateUserResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: UpdateUserSubmitDto
    @ApiProperty()
    message: string
}