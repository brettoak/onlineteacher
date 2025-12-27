import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateCourseDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Description is required' })
    @IsString()
    description: string;

    @IsNotEmpty({ message: 'Price is required' })
    @IsNumber()
    price: number;

    @IsNotEmpty({ message: 'Level is required' })
    @IsString()
    level: string;

    @IsNotEmpty({ message: 'Image is required' })
    @IsString()
    image: string;
}