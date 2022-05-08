import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ExampleGenderTypeEnum } from "./example-gender-type.enum";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ExampleEntity extends AggregateRoot {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;

    @Column()
    @ApiProperty()
    name: string;


    @ApiProperty()
    @Column({ nullable: true })
    info: ExampleGenderTypeEnum;

}