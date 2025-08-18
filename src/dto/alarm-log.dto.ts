import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';


export class CreateAlarmLogDto {
  @IsString()
  recipientId: string;

  @IsString()
  senderId: string;

  @IsDateString()
  date: string;

  @IsString()
  @MaxLength(500)
  description: string;

}

export class AlarmLogResponseDto {
  _id: string;
  recipientId: string;
  senderId: string;
  date: string;
  description: string;
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
  @IsString()
  senderId?: string;

  @IsOptional()
  @IsDateString()
  date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100) // make it longer later if needed(YK)
  description?: string;

}


