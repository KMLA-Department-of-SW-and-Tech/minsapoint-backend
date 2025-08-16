import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateAccusationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  courtId?: number;

  @IsString()
  @MaxLength(100)
  accuserId: string;

  @IsString()
  @MaxLength(100)
  defendantId: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsString()
  @MaxLength(500)
  article: string;

  @IsNumber()
  @Min(0)
  penaltyPoints: number;

  @IsOptional()
  @IsBoolean()
  valid?: boolean;
}

export class UpdateAccusationDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  courtId?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accuserId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  defendantId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  article?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  penaltyPoints?: number;

  @IsOptional()
  @IsBoolean()
  valid?: boolean;
}

export class AccusationResponseDto {
  _id: string;
  courtId: number;
  accuserId: string;
  defendantId: string;
  date: string;
  article: string;
  penaltyPoints: number;
  valid: boolean;
}

export class AccusationFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsBoolean()
  valid?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accuserId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  studentId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  courtId?: number;
}