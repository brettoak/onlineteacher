import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Course, Prisma, Video } from '@prisma/client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CourseCreateInput): Promise<Course> {
    return this.prisma.course.create({
      data,
    });
  }

  async update(id: number, data: Prisma.CourseUpdateInput): Promise<Course> {
    return this.prisma.course.update({
      where: { id },
      data,
    });
  }

  async addVideo(courseId: number, data: Prisma.VideoCreateWithoutCourseInput): Promise<Video> {
    return this.prisma.video.create({
      data: {
        ...data,
        course: {
          connect: { id: courseId },
        },
      },
    });
  }
}
