import { UserEntity } from 'src/domains/user/entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength, Matches, MaxLength, IsMobilePhone, IsEmpty, IsDate, IsDateString } from 'class-validator';

export class StatusProfile {
    @ApiProperty()
    address: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    face_image: string;
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    mobile_number: string;
    @ApiProperty()
    national_card_image: string;
    @ApiProperty()
    national_code: string;
    @ApiProperty()
    phone_number: string;
}

export class GetProfileResultResponseDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    status_email: string;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    birthday: string;

    @ApiProperty()
    commission: string;

    @ApiProperty()
    face_image: string;


    @ApiProperty()
    first_name: string;


    @ApiProperty()
    last_name: string;


    @ApiProperty()
    national_code: string;

    @ApiProperty()
    national_card_image: string;

    @ApiProperty()
    phone_number: string;
    @ApiProperty()
    status_phone_number: string;

    @ApiProperty()
    tracking_id: string;

    @ApiProperty()
    verification: string;

    @ApiProperty()
    invite_code: string;

    @ApiProperty()
    status: StatusProfile

}



export class GetProfileResponseDto {
    @ApiProperty()
    success: boolean
    @ApiProperty()
    result: GetProfileResultResponseDto
    @ApiProperty()
    message: string
}
