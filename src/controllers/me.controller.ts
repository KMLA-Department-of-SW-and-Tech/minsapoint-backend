import {
  Controller,
  Get,
  Patch,
  Req,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { MeService } from '../services/me.service';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';

@Controller('api/me')
export class MeController {
  constructor(private readonly meService: MeService) {}
  
  @Get()
  async getMe(@Req() req): Promise<UserResponseDto> {
    if(!req.user) throw new UnauthorizedException("No user on request");
    return this.meService.getMe(req.user);
  }

  @Patch()
  async updateMe(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if(!req.user) throw new UnauthorizedException("No user on request");
    return this.meService.updateMe(req.user, updateUserDto);
  }
}
