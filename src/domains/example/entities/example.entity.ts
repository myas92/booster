import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { AggregateRoot } from "@nestjs/cqrs";
import { ExampleStatusTypeEnum } from "./example-status-type.enum";
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
    status: ExampleStatusTypeEnum;

}