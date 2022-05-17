import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty } from 'class-validator';
export class AddUserSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    // @IsMobilePhone()
    @Matches(/^(\+98|0)?9\d{9}$/,
        { message: 'Mobile number is not valid' })
    mobile_number: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,50}$/,
        { message: 'Password is week' })
    password: string;

    @ApiProperty()
    @IsEmpty()
    @MaxLength(20)
    invite_code: string;
}

export class AddUserResponseDto {
    constructor(code: string, message: string) {
        this.message = message;
        this.code = code;
    }

    @ApiProperty()
    message: string
    code: string
}