import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { createUsersDto } from './dto/createUsers.dto';
import { updateUsersDto } from './dto/updateUsers.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }

  async create(data: createUsersDto) {
    try {
      const salt = await bcrypt.genSalt(2);
      const pass = await bcrypt.hash(data.password, salt);
      const createdUser = await this.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password: pass,
        },
      });
      return createdUser;
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async update(id: number, data: updateUsersDto) {
    try {
      const salt = await bcrypt.genSalt(2);
      const pass = await bcrypt.hash(data.password, salt);
      const updatedUser = await this.prisma.user.update({
        data: {
          name: data.name,
          email: data.email,
          password: pass,
        },
        where: { id: id },
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.user.delete({ where: { id: id } });
    } catch (error) {
      throw new Error(`Failed to delete user: ${error.message}`);
    }
  }
}
