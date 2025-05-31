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
  Header,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AccusationService } from '../services/accusation.service';
import {
  CreateAccusationDto,
  UpdateAccusationDto,
  AccusationResponseDto,
  AccusationFilters,
} from '../dto/accusation.dto';
import * as Excel from 'exceljs';

@Controller('api/accusation')
export class AccusationController {
  constructor(private readonly accusationService: AccusationService) {}

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

  @Get(':id')
  async getAccusation(@Param('id') id: string): Promise<AccusationResponseDto> {
    return this.accusationService.getAccusation(id);
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

  @Get('courtList/:courtId')
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  async getCourtList(
    @Param('courtId', ParseIntPipe) courtId: number,
    @Res() res: Response,
  ): Promise<void> {
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="Court List${courtId}.xlsx"`,
    );

    // Get accusations using existing service method
    const filters: AccusationFilters = { courtId };
    const accusations = await this.accusationService.listAccusations(filters);

    try {
      // Create workbook and worksheet
      const workbook = new Excel.Workbook();
      const worksheet = workbook.addWorksheet('법정리스트');

      // Add headers
      const columns = [
        { header: 'No', key: 'no', width: 3 },
        { header: 'Grade', key: 'grade', width: 10 },
        { header: 'Name', key: 'name', width: 15 },
        { header: 'Date', key: 'date', width: 15 },
        { header: 'Accused by', key: 'accusedBy', width: 15 },
        { header: 'Violated Article', key: 'article', width: 30 },
        { header: 'Points', key: 'points', width: 10 },
        { header: 'Sum', key: 'sum', width: 10 },
      ];
      worksheet.columns = columns;

      // Group accusations by defendantId and ensure type safety
      const groupedAccusations = accusations.reduce((groups, acc) => {
        const key = acc.defendantId;
        if (!groups.has(key)) {
          groups.set(key, []);
        }
        const group = groups.get(key);
        if (group) {
          group.push(acc);
        }
        return groups;
      }, new Map<string, AccusationResponseDto[]>());

      // Add data rows
      for (const studentAccusations of groupedAccusations.values()) {
        let totalPoints = 0;

        for (const acc of studentAccusations) {
          const points = acc.schoolPoints + acc.dormPoints;
          totalPoints += points;

          const row = {
            date: new Date(acc.date)
              .toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })
              .replace(/\. /g, '.')
              .replace('.', ''),
            accusedBy: 'tr', // This should be replaced with actual accuser name
            article: acc.article,
            points,
            sum: studentAccusations.length > 1 ? totalPoints : '',
          };
          worksheet.addRow(row);
        }
      }

      const excelBuffer = await workbook.xlsx.writeBuffer();
      const buffer = Buffer.from(excelBuffer);
      res.send(buffer);
    } catch (error) {
      console.error('Error generating Excel file:', error);
      throw error;
    }
  }
}
