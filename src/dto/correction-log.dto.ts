import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';


export class CreateCorrectionLogDto {
  @IsString()
  correctedDoc: string;

  @IsDateString()
  date: string;

  @IsString()
  @MaxLength(500)
  description: string;

}

export class CorrectionLogResponseDto {
  _id: string;
  correctedDoc: string;
  date: string;
  description: string;
}


export class CorrectionLogFilters {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  _id?: string;

  @IsOptional()
  @IsString()
  correctedDoc?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100) // make it longer later if needed(YK)
  descriptionId?: string;

}


