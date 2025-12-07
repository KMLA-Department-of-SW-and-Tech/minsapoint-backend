import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
  IsBoolean,
} from 'class-validator';


export class CreateAlarmLogDto {
  @IsString()
  recipientId: string;

  @IsString()
  @MaxLength(500)
  description: string;

}

export class AlarmLogResponseDto {
  _id: string;
  recipientId: string;
  date: string;
  description: string;
  isRead: boolean;
}


export class AlarmLogFilters {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  _id?: string;

  @IsOptional()
  @IsString()
  recipientId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100) // make it longer later if needed(YK)
  description?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}


