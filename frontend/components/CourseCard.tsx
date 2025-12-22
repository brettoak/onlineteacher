'use client';

interface Course {
    id: number;
    title: string;
    image: string;
    price: string;
    level: string;
    // Optional stats for future expansion
    instructor?: string;
    duration?: string;
    lectures?: string;
}

interface CourseCardProps {
    course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="group cursor-pointer">
            {/* Image Container */}
            <div className={`aspect-[4/5] w-full ${course.image} rounded-lg relative overflow-hidden mb-4 bg-stone-100`}>
                {/* Promo Badge - Optional logic could be added here */}
                <div className="absolute top-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                    Promo Available
                </div>

                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div>
                <h3 className="text-base font-medium text-stone-900 group-hover:text-berry transition-colors mb-1">
                    {course.title}
                </h3>
                <div className="flex justify-between items-center text-sm text-stone-500">
                    <span>{course.price}</span>
                    <span className="text-xs border border-stone-200 px-1.5 py-0.5 rounded">{course.level}</span>
                </div>
            </div>
        </div>
    );
}
