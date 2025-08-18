import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CorrectionLogService } from '../services/correction-log.service'; 
import { CreateCorrectionLogDto, CorrectionLogResponseDto } from '../dto/correction-log.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UserRole } from 'src/schemas/models';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@Roles(UserRole.ADMIN)
@UseGuards(AuthGuard, RolesGuard)
@Controller('api/correction-log')
export class CorrectionLogController {
  constructor(private readonly correctionLogService: CorrectionLogService) {}

  @Get(':id')
  async getCorrectionLog(@Param('id') id: string): Promise<CorrectionLogResponseDto> {
    return this.correctionLogService.getCorrectionLog(id);
  }

  @Get('list')
  async listCorrectionLogs(): Promise<CorrectionLogResponseDto[]> {
    /* remove */
    console.log("correction-log.controller list success");
    return this.correctionLogService.listCorrectionLogs();
  }

  @Post()
  async createCorrectionLog(@Body() dto: CreateCorrectionLogDto): Promise<CorrectionLogResponseDto> {
    return this.correctionLogService.createCorrectionLog(dto);
  }

  @Delete(':id')
  async deleteCorrectionLog(@Param('id') id: string): Promise<void> {
    return this.correctionLogService.deleteCorrectionLog(id);
  }
}
