import { UserRole } from '../schemas/models';
import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(100)
  firebase_uid: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  studentNumber?: number;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  studentNumber?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  schoolPoints?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  dormPoints?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rewardPoints?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPoints?: number;

  @IsOptional()
  @IsBoolean()
  hasCourt?: boolean;
}

export class UserResponseDto {
  _id: string;
  firebase_uid: string;
  role: UserRole;
  name: string;
  studentNumber?: number;
  schoolPoints?: number;
  dormPoints?: number;
  rewardPoints?: number;
  totalPoints?: number;
  hasCourt?: boolean;
}
