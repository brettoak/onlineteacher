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

      {/* Hero Section - Full Screen Image/Video Background */}
      <section className="relative h-[85vh] w-full overflow-hidden bg-stone-900">
        {/* Background Image Placeholder - Using a nice gradient/image placeholder */}
        {/* Ideally this is: <video autoPlay loop muted className="object-cover w-full h-full opacity-60" src="/hero.mp4" /> */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-80" />

        {/* Optional Overlay Gradient for text readability if needed */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

        {/* Hero Text (Minimal) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-light tracking-tight mb-4">
            Learn English Naturally
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90 tracking-wide max-w-2xl">
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
