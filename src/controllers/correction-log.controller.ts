import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CorrectionLogService } from '../services/correction-log.service'; 
import { CreateCorrectionLogDto, CorrectionLogResponseDto } from '../dto/correction-log.dto';

@Controller('api/correction-log')
export class CorrectionLogController {
  constructor(private readonly correctionLogService: CorrectionLogService) {}

  @Get('list')
  async listCorrectionLogs(): Promise<CorrectionLogResponseDto[]> {
    return this.correctionLogService.listCorrectionLogs();
  }

  @Get(':id')
  async getCorrectionLog(@Param('id') id: string): Promise<CorrectionLogResponseDto> {
    return this.correctionLogService.getCorrectionLog(id);
  }

  @Post()
  async createCorrectionLog(@Body() createCorrectionLogDto: CreateCorrectionLogDto): Promise<CorrectionLogResponseDto> {
    return this.correctionLogService.createCorrectionLog(createCorrectionLogDto);
  }

  @Delete(':id')
  async deleteCorrectionLog(@Param('id') id: string): Promise<void> {
    return this.correctionLogService.deleteCorrectionLog(id);
  }
}
