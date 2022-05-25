import { UserEntity } from 'src/domains/user/entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsDate, IsDateString } from 'class-validator';
export class AddCartSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    cart_number: string;
}

export class AddCartResultResponseDto {
}

export class AddCartResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: UserEntity
    @ApiProperty()
    message: string
}