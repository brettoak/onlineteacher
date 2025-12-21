'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';

// Mock Data for English Video Courses
const VIDEO_COURSES = [
  {
    id: 1,
    title: 'Complete Business English Video Series',
    instructor: 'Sarah Jenkins',
    rating: 4.9,
    durtion: '12 Hours',
    lectures: '45 Lessons',
    price: '$29.99',
    level: 'Advanced',
    image: 'bg-gradient-to-br from-blue-600 to-indigo-700'
  },
  {
    id: 2,
    title: 'IELTS Listening & Speaking Masterclass',
    instructor: 'David Wilson',
    rating: 5.0,
    durtion: '8 Hours',
    lectures: '30 Lessons',
    price: '$34.99',
    level: 'Exam Prep',
    image: 'bg-gradient-to-br from-red-500 to-orange-500'
  },
  {
    id: 3,
    title: 'American Accent Training: The Basics',
    instructor: 'Emma Stone',
    rating: 4.8,
    durtion: '5 Hours',
    lectures: '20 Lessons',
    price: '$19.99',
    level: 'All Levels',
    image: 'bg-gradient-to-br from-emerald-500 to-teal-500'
  }
];

export default function Home() {
  const { token, logout } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">

      {/* Navigation Bar */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link href="/" className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center gap-2">
            🌍 GlobalEnglish
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/courses" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Video Courses</Link>
            <Link href="/resources" className="text-slate-600 hover:text-blue-600 font-medium transition-colors flex items-center gap-1">
              <span>Free Resources</span>
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">Study Tips</Link>
          </div>

          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <Link href="/dashboard" className="hidden md:block text-slate-600 hover:text-blue-600 font-medium">My Library</Link>
                <button
                  onClick={logout}
                  className="px-5 py-2.5 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="px-5 py-2.5 text-slate-600 hover:text-blue-600 font-medium transition-colors">Log in</Link>
                <Link href="/register" className="px-6 py-2.5 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-0.5">
                  Start Watching
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 -mr-40 -mt-20 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] opacity-70 -z-10" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-cyan-50 rounded-full blur-[80px] opacity-70 -z-10" />

        <div className="container mx-auto px-6 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-50 text-blue-600 text-sm font-bold tracking-wide mb-6 border border-blue-100 uppercase animate-fade-in-up">
            🎥 Learn English Visualy & Effectively
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-8">
            Master English with <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Premium Video Lessons
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10 leading-relaxed">
            Unlimited access to structured video courses and carefully curated free content.
            Learn at your own pace, anytime, anywhere.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/courses" className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 text-white text-lg font-bold hover:bg-blue-700 shadow-xl hover:shadow-blue-500/40 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path></svg>
              Explore Courses
            </Link>
            <Link href="/resources" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 text-lg font-bold border border-slate-200 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
              <span className="text-blue-600">▶</span> Free Collections
            </Link>
          </div>

          {/* Trust stats */}
          <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24 border-t border-slate-200/60 pt-10">
            <div className="text-center">
              <p className="text-4xl font-extrabold text-slate-900">500+</p>
              <p className="text-slate-500 font-medium mt-1">Video Lessons</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-slate-900">10k+</p>
              <p className="text-slate-500 font-medium mt-1">Happy Learners</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-extrabold text-slate-900">24/7</p>
              <p className="text-slate-500 font-medium mt-1">Unlimited Access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Why Video Learning?</h2>
            <p className="text-slate-600 text-lg">Stop scheduling appointments. Start learning on your terms.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: 'Structured Learning Paths',
                desc: 'Premium courses follow a proven curriculum to take you from A1 to C1 in a logical order.',
                icon: 'path'
              },
              {
                title: 'Curated Web Content',
                desc: 'We handpick the best free English content from around the web and organize it by topic for you.',
                icon: 'collection'
              },
              {
                title: 'Learn at Your Pace',
                desc: 'Pause, rewind, and rewatch as many times as you need. Perfect for mastering difficult pronunciation.',
                icon: 'clock'
              },
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-slate-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 group">
                <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon === 'path' && <span className="text-3xl">🛣️</span>}
                  {feature.icon === 'collection' && <span className="text-3xl">📚</span>}
                  {feature.icon === 'clock' && <span className="text-3xl">☕</span>}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Video Courses */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trending Video Courses</h2>
              <p className="text-slate-600 text-lg">Binge-watch your way to fluency.</p>
            </div>
            <Link href="/courses" className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors">
              View All Series <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {VIDEO_COURSES.map((course) => (
              <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group border border-slate-100 flex flex-col">
                <div className={`h-48 ${course.image} relative group-hover:opacity-90 transition-opacity`}>
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white group-hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"></path></svg>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur text-white px-3 py-1 rounded-md text-xs font-bold">
                    {course.durtion}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-2">
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{course.level}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors cursor-pointer">{course.title}</h3>
                  <p className="text-slate-500 text-sm mb-4">{course.lectures} • by {course.instructor}</p>

                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-2xl font-bold text-slate-900">{course.price}</span>
                    <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all text-sm">
                      Watch Preview
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Resources Teaser */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 md:p-16 text-white text-center shadow-2xl relative overflow-hidden">
            {/* Absolutes */}
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-block bg-white/20 backdrop-blur px-4 py-1 rounded-full text-sm font-bold mb-6">Explore Our Library</div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Looking for extra practice?</h2>
              <p className="text-blue-100 text-lg md:text-xl mb-10 leading-relaxed">
                We've gathered and organized thousands of the best free English learning videos from across the web.
                Categorized by grammar, vocabulary, and accent for easy access.
              </p>
              <Link href="/resources" className="inline-block px-10 py-5 bg-white text-blue-700 rounded-full font-bold text-lg shadow-xl hover:bg-blue-50 transition-all transform hover:-translate-y-1">
                Browse Free Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 md:col-span-1">
              <Link href="/" className="text-2xl font-bold text-white mb-6 block">GlobalEnglish</Link>
              <p className="text-sm leading-relaxed mb-6">
                Your educational platform for self-paced English video learning.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Series</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Grammar Usage</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Business Talk</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Pronunciation Lab</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-6">Collections</h4>
              <ul className="space-y-3 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Most Popular</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Ted Talks English</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">News English</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-600">
            <p>&copy; {new Date().getFullYear()} GlobalEnglish. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
