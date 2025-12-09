import {
  Controller,
  Get,
  Patch,
  Req,
  Body,
  UnauthorizedException,
  UseGuards
} from '@nestjs/common';
import { MeService } from '../services/me.service';
import { UpdateUserDto, UserResponseDto } from '../dto/user.dto';
import { AlertLogResponseDto } from 'src/dto/alert-log.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { AccusationResponseDto } from 'src/dto/accusation.dto';

@UseGuards(AuthGuard)
@Controller('api/me')
export class MeController {
  constructor(private readonly meService: MeService) {}
  
  @Get()
  async getMe(@Req() req): Promise<UserResponseDto> {
    if(!req.firebaseUID) throw new UnauthorizedException("No user on request");
    return this.meService.getUserFromFirebaseUID(req.firebaseUID);
  }

  @Get('accusations')
  async getMyAccusations(@Req() req): Promise<AccusationResponseDto[]> {
    return this.meService.getMyAccusations(req.firebaseUID);
  }

  @Get('alert-log')
  async getMyAlertLogs(@Req() req): Promise<AlertLogResponseDto[]> {
    return this.meService.getMyAlertLogs(req.firebaseUID);
  }

  @Patch()
  async updateMe(
    @Req() req,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if(!req.user) throw new UnauthorizedException("No user on request");
    return this.meService.updateMe(req.firebaseUID, updateUserDto);
  }
}
