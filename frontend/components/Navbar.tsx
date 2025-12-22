'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';

interface NavbarProps {
    /**
     * If true, the navbar starts transparent and becomes white on scroll.
     * If false, it is always white (useful for pages other than Home).
     * Default: true
     */
    transparentOnTop?: boolean;
}

export default function Navbar({ transparentOnTop = true }: NavbarProps) {
    const { token, logout } = useAuthStore();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine styles based on scroll state and prop
    const isTransparent = transparentOnTop && !isScrolled;

    const navClasses = `fixed w-full z-50 transition-all duration-500 ${isTransparent
            ? 'bg-transparent py-6 text-white'
            : 'bg-white/90 backdrop-blur-md py-4 text-stone-800 shadow-sm'
        }`;

    const registerButtonClasses = `px-5 py-2 rounded-full border transition-all font-semibold ${isTransparent
            ? 'border-white hover:bg-white hover:text-stone-900'
            : 'border-stone-800 hover:bg-stone-800 hover:text-white'
        }`;

    return (
        <nav className={navClasses}>
            <div className="container mx-auto px-8 flex justify-between items-center relative">

                {/* Left: Logo */}
                <Link href="/" className="text-sm font-semibold tracking-widest uppercase hover:opacity-70 transition-opacity z-10">
                    GlobalEnglish
                </Link>

                {/* Center: Links (Absolute Centered) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-bold tracking-wide">
                    <Link href="/" className="hover:opacity-70 transition-opacity">Home</Link>
                    <Link href="/resources" className="hover:opacity-70 transition-opacity">Courses</Link>
                    <Link href="/about" className="hover:opacity-70 transition-opacity">About</Link>
                </div>

                {/* Right: Auth Only */}
                <div className="flex items-center gap-6 text-sm font-medium z-10">
                    {token ? (
                        <div className="flex items-center gap-4">
                            <Link href="/dashboard" className="hover:opacity-70">Dashboard</Link>
                            <button onClick={logout} className="hover:opacity-70">Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-5">
                            <Link href="/login" className="hover:opacity-70 font-semibold">Login</Link>
                            <Link href="/register" className={registerButtonClasses}>
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
