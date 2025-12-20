import { IsNotEmpty, IsString } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    description: string;
}