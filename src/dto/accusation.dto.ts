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
  @IsString()
  @MaxLength(100)
  accuserId: string;

  @IsString()
  @MaxLength(100)
  defendantId: string;

  @IsDateString()
  date: string;

  @IsString()
  @MaxLength(500)
  article: string;

  @IsNumber()
  @Min(0)
  schoolPoints: number;

  @IsNumber()
  @Min(0)
  dormPoints: number;
}

export class UpdateAccusationDto {
  @IsOptional()
  @IsBoolean()
  valid?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  schoolPoints?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dormPoints?: number;
}

export class AccusationResponseDto {
  _id: string;
  accuserId: string;
  defendantId: string;
  date: string;
  article: string;
  schoolPoints: number;
  dormPoints: number;
  valid: boolean;
}

export class AccusationFilters {
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
}

export class FileUploadDto {
  file: Express.Multer.File;
}
