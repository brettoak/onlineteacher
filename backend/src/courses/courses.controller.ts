import { Controller, Post, Body, Put, Param, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Prisma } from '@prisma/client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() data: { title: string; description: string }) {
    return this.coursesService.create({
      ...data,
      author: {
        connect: { id: req.user.userId },
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: Prisma.CourseUpdateInput) {
    return this.coursesService.update(id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/videos')
  addVideo(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: { title: string; url: string; videoDetail?: string },
  ) {
    return this.coursesService.addVideo(id, data);
  }
}
