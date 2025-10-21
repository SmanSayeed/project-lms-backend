import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { IUserTypeEnum } from 'src/common/enum/user-type.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'First name of the user',
    example: 'Ralph',
  })
  @IsNotEmpty({ message: 'First name must not be empty' })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the user',
    example: 'Tolle',
  })
  lastName?: string;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'ralph@appdev.com',
  })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;

  @ApiPropertyOptional()
  @IsOptional()
  mobile: string;

  @ApiPropertyOptional()
  @IsOptional()
  password: string;

  @ApiPropertyOptional({
    description: 'Date of birth of the user (YYYY-MM-DD)',
    example: '1990-05-15',
  })
  @IsOptional()
  @IsDateString({}, { message: 'DOB must be a valid date string (YYYY-MM-DD)' })
  dob?: string;

  @ApiPropertyOptional({
    description: 'Gender of the user',
    example: 'male',
    enum: ['male', 'female', 'other'],
  })
  @IsOptional()
  @IsIn(['male', 'female', 'other'], { message: 'Gender must be male, female, or other' })
  gender?: 'male' | 'female' | 'other';

  @ApiPropertyOptional({
    description: 'Type of user',
    example: 'USER',
    enum: IUserTypeEnum,
  })
  @IsOptional()
  @IsEnum(IUserTypeEnum, { message: 'userType must be one of: ADMIN, USER' })
  userType?: IUserTypeEnum;
}
