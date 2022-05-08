import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength } from 'class-validator';
export class AuthRegisterSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    @Matches(/^[\w-]+(\.[\w-]+)*@([a-z0-9-]+(\.[a-z0-9-]+)*?\.[a-z]{2,6}|(\d{1,3}\.){3}\d{1,3})(:\d{4})?$/,
    {message: 'Email is not valid'})
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(50)
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,50}$/,
    {message: 'Password is week'})
    password: string;
    
    @ApiProperty()
    @IsNotEmpty()
    @Matches(/^(?=[a-zA-Z0-9._]{3,50}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
    {message: 'Username is not valid'})
    username: string;
}

export class AuthRegisterResponseDto {


    constructor(message: string) {
        this.message = message;
    }

    @ApiProperty()
    message: string
}