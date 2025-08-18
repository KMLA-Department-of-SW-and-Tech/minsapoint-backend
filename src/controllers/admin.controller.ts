import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { AdminService } from '../services/admin.service';

@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Patch('firstCourtList')
  async createFirstCourtList(): Promise<any> {
    return this.adminService.createFirstCourtList();
  }

  @Get('secondCourtList')
  async createSecondCourtList(): Promise<any> {
    return this.adminService.createSecondCourtList();
  }
}
