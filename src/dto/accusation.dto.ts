import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsDateString,
  Min,
  MaxLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateAccusationDto {
  @IsString()
  @MaxLength(500)
  article: string;

  @IsNumber()
  @Min(0)
  penaltyPoints: number;

  @IsString()
  @MaxLength(100)
  defendantIds: string[];
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
  @Transform(({value}) => value === 'true')
  valid?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  accuserId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  defendantId?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Transform(({value}) => parseInt(value, 10))
  courtId?: number;
}