import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';
import { Response } from 'express';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('firstCourtList')
  async createFirstCourtList(@Res() res: Response): Promise<void> {
    const buf = await this.adminService.createFirstCourtList();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Court List.xlsx"');
    res.end(buf);
  }

  @Get('secondCourtList')
  async createSecondCourtList(@Res() res: Response): Promise<any> {
    const buf = await this.adminService.createSecondCourtList();
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Court List.xlsx"');
    res.end(buf);
  }
}
