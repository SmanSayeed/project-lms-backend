import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/common/entities/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) { }

  async create(createCourseDto: CreateCourseDto) {
    const { courseTitle, courseLink } = createCourseDto;
    // console.log('Dto \n', createCourseDto);

    const courseExists = await this.courseRepo.findOne({
      where: [{ courseTitle }, { courseLink }],
    });

    if (courseExists) {
      throw new BadRequestException(
        'Course with same title or link already exists',
      );
    }

    const course = this.courseRepo.create(createCourseDto);
    return this.courseRepo.save(course);
  }

  async findAll() {
    const courses = await this.courseRepo.find();

    return courses;
  }

  async findOne(id: number) {
    const course = await this.courseRepo.findOne({ where: { id } });

    if (!course) {
      throw new BadRequestException('No courses found with this course id');
    }

    return course;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
