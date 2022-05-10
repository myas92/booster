import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AggregateRoot} from "@nestjs/cqrs";


export enum ExampleStatusTypeEnum{
    ACTIVE="active",
    INACTIVE="inactive"
}