import {
  Get,
  Controller,
  Post,
  Put,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { stat } from 'fs';
import { createUsersDto } from './dto/createUsers.dto';
import { User } from 'generated/prisma/client';
import { updateUsersDto } from './dto/updateUsers.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) {}
  
  @Get()
  async findAll() {
    try {
      const users = await this.UsersService.findAll();

      return {
        status: '200',
        succes: true,
        message: 'User data found successfully',
        data: users,
      };
    } catch (error) {
      return {
        status: '500',
        succes: false,
        message: `Error when get user: ${error}`,
        data: null,
      };
    }
  }

  @Post()
  async create(@Body() data: createUsersDto) {
    try {
      const result = await this.UsersService.create(data);
      return {
        status: '200',
        succes: true,
        message: 'User created successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: '500',
        succes: false,
        message: `Internal server error`,
        data: error.message,
      };
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: updateUsersDto) {
    try {
      const result = await this.UsersService.update(+id, data);
      return {
        status: '200',
        succes: true,
        message: 'User updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: '500',
        succes: false,
        message: `Internal server error`,
        data: error.message,
      };
    }
  }

  @Patch(':id')
  async partialUpdate(@Param('id') id: string, @Body() data: updateUsersDto) {
    try {
      const result = await this.UsersService.update(+id, data);
      return {
        status: '200',
        succes: true,
        message: 'User partially updated successfully',
        data: result,
      };
    } catch (error) {
      return {
        status: '500',
        succes: false,
        message: `Internal server error`,
        data: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const user = await this.UsersService.findOne(+id);

      if (user) {
        return {
          status: '200',
          success: true,
          message: `User data found with name ${user.name}`,
          data: user,
        };
      } else {
        return {
          status: '404',
          success: false,
          message: `User not found`,
          data: null,
        };
      }
    } catch (error) {
      return {
        status: '500',
        success: false,
        message: `Internal server error`,
        data: null,
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      const result = await this.UsersService.delete(+id);
      return {
        status: '200',
        succes: true,
        message: 'User deleted successfully',
        data: result,
      };
    } catch (error) {
      if (error.message.includes('No record was found for a delete')) {
        return {
          status: '404',
          success: false,
          message: `User not found`,
          data: null,
        };
      }
      return {
        status: '500',
        succes: false,
        message: `Internal server error`,
        data: error.message,
      };
    }
  }
}
