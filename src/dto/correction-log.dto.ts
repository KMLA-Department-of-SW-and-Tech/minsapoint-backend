import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';


export class CreateCorrectionLogDto {
  @IsString()
  @MaxLength(100)
  correctionLogId: string;

  @IsDateString()
  date: string;

  @IsString()
  @MaxLength(500)
  description: string;

}


export class CorrectionLogResponseDto {
  _id: string;
  date: string;
  description: string;
}


export class CorrectionLogFilters {
  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  correctionLogId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100) // make it longer later if needed(YK)
  descriptionId?: string;

}


