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
import { AlertLogService } from '../services/alert-log.service'; 
import { CreateAlertLogDto, AlertLogResponseDto } from '../dto/alert-log.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/schemas/models';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

// @UseGuards(AuthGuard, RolesGuard)
@Controller('api/alert-log')
export class AlertLogController {
  constructor(private readonly AlertLogService: AlertLogService) {}

  @Get('list')
  async listAlertLogs(): Promise<AlertLogResponseDto[]> {
    /* remove */
    console.log("correction-log.controller list success");
    return this.AlertLogService.listAlertLogs();
  }

  @Get(':id')
  async getAlertLog(@Param('id') id: string): Promise<AlertLogResponseDto> {
    return this.AlertLogService.getAlertLog(id);
  }

  // @Roles(UserRole.ADMIN, UserRole.ACCUSER)
  @Post()
  async createAlertLog(@Body() dto: CreateAlertLogDto): Promise<AlertLogResponseDto> {
    return this.AlertLogService.createAlertLog(dto);
  }

  @Patch('read/:id')
  async markAsRead(@Param('id') id: string): Promise<AlertLogResponseDto> {
    return this.AlertLogService.markAsRead(id);
  }

  @Delete(':id')
  async deleteAlertLog(@Param('id') id: string): Promise<void> {
    return this.AlertLogService.deleteAlertLog(id);
  }
}
