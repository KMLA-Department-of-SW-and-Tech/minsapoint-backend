import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  Req,
  UseGuards,
  ForbiddenException
} from '@nestjs/common';
import { AccusationService } from '../services/accusation.service';
import {
  CreateAccusationDto,
  UpdateAccusationDto,
  AccusationResponseDto,
  AccusationFilterDto,
} from '../dto/accusation.dto';
import { create } from 'domain';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/schemas/models';
import { Roles } from 'src/decorators/roles.decorator';
import { MeService } from 'src/services/me.service';


@UseGuards(AuthGuard, RolesGuard)
@Controller('api/accusation')
export class AccusationController {
  constructor(
    private readonly accusationService: AccusationService, 
    private readonly meService: MeService) {}

  @Get('list')
  async listAccusations(@Query() query: AccusationFilterDto): Promise<AccusationResponseDto[]> {
    return this.accusationService.listAccusations(query);
  }

  @Get(':id')
  async getAccusation(@Req() req, @Param('id') id: string): Promise<AccusationResponseDto> {
    const currentUser = await this.meService.getUserFromFirebaseUID(req.firebaseUID);
    const accusation = await this.accusationService.getAccusation(id);
    if(!(req.role == UserRole.ADMIN || req.role === UserRole.ACCUSER && currentUser._id == accusation.accuserId)) throw new ForbiddenException("denied");
    
    return this.accusationService.getAccusation(id);
  }

  @Roles(UserRole.ADMIN, UserRole.ACCUSER)
  @Post()
  async createAccusation(
    @Body() createAccusationDto: CreateAccusationDto,
    @Req() req: any): Promise<void> {
    return this.accusationService.createAccusation(createAccusationDto, req.user);
  }

  @Roles(UserRole.ADMIN, UserRole.ACCUSER)
  @Patch(':id')
  async updateAccusation(
    @Param('id') id: string,
    @Body() updateAccusationDto: UpdateAccusationDto,
  ): Promise<AccusationResponseDto> {
    return this.accusationService.updateAccusation(id, updateAccusationDto);
  }

  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async deleteAccusation(@Param('id') id: string): Promise<void> {
    return this.accusationService.deleteAccusation(id);
  }
}
