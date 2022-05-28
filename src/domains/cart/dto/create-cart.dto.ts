import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';
export class CreateCartSubmitDto {
    @ApiProperty()
    @MinLength(16)
    cart_number: string
}


export class CreateCartResultResponseDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    cart_number: string
    @ApiProperty()
    shaba_number: string

}

export class AddCartResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: CreateCartResultResponseDto
    @ApiProperty()
    message: string
}