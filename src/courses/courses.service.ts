import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly CourseRepository: Repository<Course>,
  ) {}
  async create({ name, requiredCourseId }: CreateCourseDto) {
    try {
      const requiredCourse = await this.findOne(requiredCourseId);
      const course = this.CourseRepository.create({ name, requiredCourse });
      return await this.CourseRepository.save(course);
    } catch (error) {
      throw error;
    }
  }

  findAll() {
    return `This action returns all courses`;
  }

  async findOne(id: number) {
    try {
      const course = await this.CourseRepository.findOne({ where: { id } });
      return course;
    } catch (error) {
      throw error;
    }
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
