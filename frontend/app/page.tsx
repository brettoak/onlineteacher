'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';

// Mock Data for English Video Courses
const VIDEO_COURSES = [
  {
    id: 1,
    title: 'Business English Series',
    instructor: 'Sarah Jenkins',
    durtion: '12h',
    lectures: '45 Lessons',
    price: '$29.99',
    level: 'Advanced',
    image: 'bg-stone-200'
  },
  {
    id: 2,
    title: 'IELTS Masterclass',
    instructor: 'David Wilson',
    durtion: '8h',
    lectures: '30 Lessons',
    price: '$34.99',
    level: 'Exam Prep',
    image: 'bg-stone-300'
  },
  {
    id: 3,
    title: 'American Accent Training',
    instructor: 'Emma Stone',
    durtion: '5h',
    lectures: '20 Lessons',
    price: '$19.99',
    level: 'All Levels',
    image: 'bg-stone-400'
  },
  {
    id: 4,
    title: 'Grammar Bootcamp',
    instructor: 'John Doe',
    durtion: '6h',
    lectures: '15 Lessons',
    price: '$24.99',
    level: 'Beginner',
    image: 'bg-stone-200'
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-stone-800">

      {/* Reusable Navbar */}
      <Navbar />

      {/* Hero Section - Abstract Gradient & Learning Elements */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-beige">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-beige via-white/40 to-vanilla/20" />

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/5 text-[10rem] font-serif text-berry/5 blur-sm select-none -translate-x-1/2 -translate-y-1/2 rotate-[-10deg]">Aa</div>
        <div className="absolute bottom-1/4 right-1/5 text-[12rem] font-serif text-toffee/5 blur-sm select-none translate-x-1/3 -translate-y-1/4 rotate-[10deg]">Bb</div>
        <div className="absolute top-32 right-32 w-24 h-24 bg-berry/5 rounded-full blur-xl" />
        <div className="absolute bottom-32 left-32 w-48 h-48 bg-khaki/10 rounded-full blur-2xl" />

        {/* Hero Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
          <h1 className="text-5xl md:text-7xl font-sans font-light tracking-tight mb-6 text-stone-800">
            Learn English Naturally
          </h1>
          <p className="text-xl md:text-2xl font-light text-stone-600 tracking-wide max-w-2xl">
            Immersive video courses for global learners.
          </p>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-16 bg-white border-t border-stone-50">
        <div className="container mx-auto px-8">

          {/* Section Header */}
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-normal tracking-wide text-stone-900 uppercase">Latest Courses</h2>
            <Link
              href="/courses"
              className="px-6 py-2 rounded-full border border-stone-300 text-sm font-medium hover:border-black hover:bg-stone-50 transition-colors"
            >
              View all
            </Link>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {VIDEO_COURSES.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

        </div>
      </section>

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
