'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';
import CoursesService from '@/services/courses.service';

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Exam Prep'];

export default function CoursesPage() {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedLevel, setSelectedLevel] = useState('All');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await CoursesService.getAll();
                // Transform data to match UI requirements
                const formattedCourses = data.map((course: any) => ({
                    id: course.id,
                    title: course.title,
                    instructor: course.author.email.split('@')[0], // Use part of email as name
                    duration: '10h', // Placeholder as backend doesn't have duration yet
                    lectures: `${course.videos.length} Lessons`,
                    price: `$${course.price}`,
                    level: course.level || 'All Levels',
                    image: course.image || 'bg-stone-200', // Fallback color
                    description: course.description
                }));
                setCourses(formattedCourses);
            } catch (error) {
                console.error('Failed to fetch courses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const filteredCourses = selectedLevel === 'All' 
        ? courses 
        : courses.filter(course => course.level === selectedLevel);

    if (loading) {
        return (
            <div className="min-h-screen bg-white font-sans text-stone-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-stone-800">
            <Navbar transparentOnTop={false} />

            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/5 text-[10rem] font-serif text-berry/5 blur-sm select-none -translate-x-1/2 -translate-y-1/2 rotate-[-10deg]">Aa</div>
                <div className="absolute top-32 right-32 w-24 h-24 bg-berry/5 rounded-full blur-xl" />
                <div className="absolute bottom-32 left-32 w-48 h-48 bg-khaki/10 rounded-full blur-2xl" />
            </div>

            <main className="relative pt-32 pb-24 px-8 z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-16">
                        <h1 className="text-4xl md:text-6xl font-sans font-light tracking-tight text-stone-800 mb-6">
                            Explore Our Courses
                        </h1>
                        <p className="text-xl font-light text-stone-500 tracking-wide max-w-2xl">
                            Unlock your potential with our curated selection of English language programs, designed for every stage of your journey.
                        </p>
                    </div>

                    {/* Filter Section */}
                    <div className="mb-12 flex flex-wrap gap-3">
                        {LEVELS.map((level) => (
                            <button
                                key={level}
                                onClick={() => setSelectedLevel(level)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${
                                    selectedLevel === level
                                        ? 'bg-stone-900 text-white border-stone-900'
                                        : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                                }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredCourses.map((course) => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {filteredCourses.length === 0 && (
                        <div className="text-center py-24">
                            <p className="text-stone-400 text-lg font-light">No courses found matching your criteria.</p>
                            <button 
                                onClick={() => setSelectedLevel('All')}
                                className="mt-4 text-stone-800 underline font-medium"
                            >
                                View all courses
                            </button>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer Minimal */}
            <footer className="py-12 bg-white border-t border-stone-100">
                <div className="container mx-auto px-8 flex flex-col md:flex-row justify-between items-center text-xs text-stone-400 uppercase tracking-widest gap-4">
                    <p>&copy; {new Date().getFullYear()} GlobalEnglish</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-stone-800 transition-colors">Instagram</Link>
                        <Link href="#" className="hover:text-stone-800 transition-colors">Twitter</Link>
                        <Link href="#" className="hover:text-stone-800 transition-colors">Email</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
