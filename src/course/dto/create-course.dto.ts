import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  course_title: string;

  @IsString()
  @IsNotEmpty()
  course_instructor: string;

  @IsString()
  @IsNotEmpty()
  course_link: string;
}
