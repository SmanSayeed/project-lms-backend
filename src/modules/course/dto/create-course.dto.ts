import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  courseTitle: string;

  @IsString()
  @IsNotEmpty()
  courseInstructor: string;

  @IsString()
  @IsNotEmpty()
  courseLink: string;
}
