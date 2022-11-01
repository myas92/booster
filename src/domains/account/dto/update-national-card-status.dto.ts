import { UserEntity } from 'src/domains/user/entities/user.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from 'class-validator';
export class UpdateNationalCardStatusSubmitDto {
    @ApiProperty()
    @IsNotEmpty()
    status_national_card_image: string;
}