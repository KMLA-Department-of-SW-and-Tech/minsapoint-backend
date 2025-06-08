import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccusationService } from '../services/accusation.service';
import { 
  CreateAccusationDto,
  UpdateAccusationDto,
  AccusationResponseDto,
  AccusationFilters,
} from '../dto/accusation.dto';

@Controller('api/accusation')
export class AccusationController {
  constructor(private readonly accusationService: AccusationService) {}

  @Get(':id')
  async getAccusation(
    @Param('id') id: string,
  ): Promise<AccusationResponseDto> {
    return this.accusationService.getAccusation(id);
  }

  @Get('list')
  async listAccusations(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('valid') valid?: boolean,
    @Query('accuserId') accuserId?: string,
    @Query('studentId') studentId?: string,
  ): Promise<AccusationResponseDto[]> {
    const filters: AccusationFilters = {
      startDate,
      endDate,
      valid,
      accuserId,
      studentId,
    };
    return this.accusationService.listAccusations(filters);
  }

  @Post('form')
  async createAccusationFromForm(
    @Body() createAccusationDto: CreateAccusationDto,
  ): Promise<AccusationResponseDto> {
    return this.accusationService.createAccusationFromForm(createAccusationDto);
  }

  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async createAccusationsFromFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AccusationResponseDto[]> {
    return this.accusationService.createAccusationsFromFile(file);
  }

  @Patch(':id')
  async updateAccusation(
    @Param('id') id: string,
    @Body() updateAccusationDto: UpdateAccusationDto,
  ): Promise<AccusationResponseDto> {
    return this.accusationService.updateAccusation(id, updateAccusationDto);
  }

  @Delete(':id')
  async deleteAccusation(@Param('id') id: string): Promise<void> {
    return this.accusationService.deleteAccusation(id);
  }
}
