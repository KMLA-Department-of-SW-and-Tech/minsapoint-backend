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
  firebaseUID: string;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  studentNumber?: number;

  @IsString()
  @MaxLength(100)
  name: string;

  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  @IsNumber()
  penaltyPoints?: number;

  @IsOptional()
  @IsNumber()
  rewardPoints?: number;

  @IsOptional()
  @IsNumber()
  totalPoints?: number;

  @IsOptional()
  @IsBoolean()
  hasCourt?: boolean;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  firebaseUID?: string;

  @IsOptional()
  @IsNumber()
  @Min(1000)
  studentNumber?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @IsOptional()
  @IsNumber()
  penaltyPoints?: number;

  @IsOptional()
  @IsNumber()
  rewardPoints?: number;

  @IsOptional()
  @IsNumber()
  totalPoints?: number;

  @IsOptional()
  @IsBoolean()
  hasCourt?: boolean;
}

export class UserResponseDto {
  _id: string;
  firebaseUID: string;
  role: UserRole;
  name: string;
  studentNumber?: number;
  penaltyPoints?: number;
  rewardPoints?: number;
  totalPoints?: number;
  hasCourt?: boolean;
}
