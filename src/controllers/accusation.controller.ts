import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { AccusationService } from '../services/accusation.service';
import {
  CreateAccusationDto,
  UpdateAccusationDto,
  AccusationResponseDto,
  AccusationFilterDto,
} from '../dto/accusation.dto';

@Controller('api/accusation')
export class AccusationController {
  constructor(private readonly accusationService: AccusationService) {}

  @Get('list')
  async listAccusations(@Query() query: AccusationFilterDto): Promise<AccusationResponseDto[]> {
    return this.accusationService.listAccusations(query);
  }

  @Get(':id')
  async getAccusation(@Param('id') id: string): Promise<AccusationResponseDto> {
    return this.accusationService.getAccusation(id);
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
