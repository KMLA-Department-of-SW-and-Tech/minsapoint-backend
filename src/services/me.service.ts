import { Injectable, NotFoundException } from '@nestjs/common';
import { db } from '../config/firebaseConfig';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { UserRole } from '../schemas/models';

@Injectable()
export class MeService {
  async getMe(user): Promise<UserResponseDto> {
    return;
  }

  async updateMe(user, updateUserDto): Promise<UserResponseDto> {
    return;
  } 
}
