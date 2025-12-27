'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import Link from 'next/link';

// Mock Data for English Video Courses (Expanded)
const ALL_COURSES = [
  {
    id: 1,
    title: 'Business English Series',
    instructor: 'Sarah Jenkins',
    duration: '12h',
    lectures: '45 Lessons',
    price: '$29.99',
    level: 'Advanced',
    image: 'bg-stone-200'
  },
  {
    id: 2,
    title: 'IELTS Masterclass',
    instructor: 'David Wilson',
    duration: '8h',
    lectures: '30 Lessons',
    price: '$34.99',
    level: 'Exam Prep',
    image: 'bg-stone-300'
  },
  {
    id: 3,
    title: 'American Accent Training',
    instructor: 'Emma Stone',
    duration: '5h',
    lectures: '20 Lessons',
    price: '$19.99',
    level: 'All Levels',
    image: 'bg-stone-400'
  },
  {
    id: 4,
    title: 'Grammar Bootcamp',
    instructor: 'John Doe',
    duration: '6h',
    lectures: '15 Lessons',
    price: '$24.99',
    level: 'Beginner',
    image: 'bg-stone-200'
  },
  {
    id: 5,
    title: 'Conversational English',
    instructor: 'Lucy Liu',
    duration: '10h',
    lectures: '25 Lessons',
    price: '$21.99',
    level: 'Intermediate',
    image: 'bg-stone-300'
  },
  {
    id: 6,
    title: 'TOEFL Preparation',
    instructor: 'Michael Brown',
    duration: '15h',
    lectures: '50 Lessons',
    price: '$39.99',
    level: 'Exam Prep',
    image: 'bg-stone-400'
  },
  {
    id: 7,
    title: 'English for Travel',
    instructor: 'Sophie Turner',
    duration: '4h',
    lectures: '12 Lessons',
    price: '$14.99',
    level: 'Beginner',
    image: 'bg-stone-200'
  },
  {
    id: 8,
    title: 'Creative Writing in English',
    instructor: 'James Bond',
    duration: '7h',
    lectures: '18 Lessons',
    price: '$27.99',
    level: 'Advanced',
    image: 'bg-stone-300'
  }
];

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Exam Prep'];

export default function CoursesPage() {
    const [selectedLevel, setSelectedLevel] = useState('All');

    const filteredCourses = selectedLevel === 'All' 
        ? ALL_COURSES 
        : ALL_COURSES.filter(course => course.level === selectedLevel);

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
