import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/schemas/models';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(UserRole.ADMIN, UserRole.ACCUSER)
@UseGuards(AuthGuard, RolesGuard)
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('list')
  async listUsers(): Promise<UserResponseDto[]> {
    /* remove */
    console.log("user.controller list success!");
    return this.userService.listUsers();
  }
  
  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserResponseDto> {
    /* remove */
    console.log("user.controller :id success!");
    return this.userService.getUser(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }

  @Roles(UserRole.ADMIN, UserRole.ACCUSER, UserRole.STUDENT)
  @Get('name/:id')
  async getUsername(@Param('id') id: string): Promise<string> {
    return this.userService.getUsername(id);
  }
}
