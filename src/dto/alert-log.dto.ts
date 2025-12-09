import {
  IsString,
  IsOptional,
  IsDateString,
  MaxLength,
  IsBoolean,
} from 'class-validator';


export class CreateAlertLogDto {
  @IsString()
  recipientId: string;

  @IsString()
  @MaxLength(500)
  description: string;

}

export class AlertLogResponseDto {
  _id: string;
  recipientId: string;
  date: string;
  description: string;
  isRead: boolean;
}


export class AlertLogFilterDto {
  @IsOptional()
  @IsString()
  @MaxLength(128)
  _id?: string;

  @IsOptional()
  @IsString()
  recipientId?: string;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean;
}


