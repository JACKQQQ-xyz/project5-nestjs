import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { createUsersDto } from './createUsers.dto';

export class updateUsersDto extends PartialType(createUsersDto) {
    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    role: string;

    @IsOptional()
    @IsString()
    CreatedAt: string
}