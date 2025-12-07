import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AlarmLogService } from '../services/alarm-log.service'; 
import { CreateAlarmLogDto, AlarmLogResponseDto } from '../dto/alarm-log.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/schemas/models';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// @UseGuards(AuthGuard, RolesGuard)
@Controller('api/alarm-log')
export class AlarmLogController {
  constructor(private readonly AlarmLogService: AlarmLogService) {}

  @Get('list')
  async listAlarmLogs(): Promise<AlarmLogResponseDto[]> {
    /* remove */
    console.log("correction-log.controller list success");
    return this.AlarmLogService.listAlarmLogs();
  }

  @Get(':id')
  async getAlarmLog(@Param('id') id: string): Promise<AlarmLogResponseDto> {
    return this.AlarmLogService.getAlarmLog(id);
  }

  // @Roles(UserRole.ADMIN, UserRole.ACCUSER)
  @Post()
  async createAlarmLog(@Body() dto: CreateAlarmLogDto): Promise<AlarmLogResponseDto> {
    return this.AlarmLogService.createAlarmLog(dto);
  }

  @Patch('read/:id')
  async markAsRead(@Param('id') id: string): Promise<AlarmLogResponseDto> {
    return this.AlarmLogService.markAsRead(id);
  }

  @Delete(':id')
  async deleteAlarmLog(@Param('id') id: string): Promise<void> {
    return this.AlarmLogService.deleteAlarmLog(id);
  }
}
