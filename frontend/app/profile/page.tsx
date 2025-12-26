'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';
import Navbar from '@/components/Navbar';

interface UserProfile {
    id: number;
    email: string;
    role: string;
    name?: string;
    createdAt?: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const { token, logout } = useAuthStore();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            router.push('/login');
            return;
        }

        const fetchProfile = async () => {
            try {
                const data = await AuthService.getProfile();
                setProfile(data);
            } catch (err: any) {
                console.error('Failed to fetch profile:', err);
                setError('Failed to load profile. Please login again.');
                if (err.response?.status === 401) {
                    logout();
                    router.push('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [token, router, logout]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-stone-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-stone-800"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 gap-4">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => router.push('/login')}
                    className="px-4 py-2 bg-stone-800 text-white rounded hover:bg-stone-700 transition-colors"
                >
                    Back to Login
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans text-stone-800">
            <Navbar transparentOnTop={false} />

            {/* Background Decor (Same as Home) */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/5 text-[10rem] font-serif text-berry/5 blur-sm select-none -translate-x-1/2 -translate-y-1/2 rotate-[-10deg]">Aa</div>
                <div className="absolute top-32 right-32 w-24 h-24 bg-berry/5 rounded-full blur-xl" />
                <div className="absolute bottom-32 left-32 w-48 h-48 bg-khaki/10 rounded-full blur-2xl" />
            </div>

            <main className="relative pt-32 pb-24 px-8 z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-12">
                        <h1 className="text-4xl md:text-5xl font-sans font-light tracking-tight text-stone-800 mb-4">
                            My Profile
                        </h1>
                        <p className="text-lg font-light text-stone-500 tracking-wide">
                            Manage your account and learning preferences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Left Column: Avatar & Quick Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-beige/40 backdrop-blur-sm rounded-3xl p-8 border border-stone-100 flex flex-col items-center text-center">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl font-light text-stone-400 shadow-sm mb-6 border border-stone-100">
                                    {profile?.email?.[0].toUpperCase()}
                                </div>
                                <h2 className="text-xl font-normal text-stone-800 mb-1 leading-tight">
                                    {profile?.name || 'User'}
                                </h2>
                                <p className="text-sm font-light text-stone-500 mb-4">{profile?.email}</p>
                                <span className="px-3 py-1 bg-white border border-stone-200 text-[10px] font-semibold uppercase tracking-widest text-stone-500 rounded-full">
                                    {profile?.role}
                                </span>
                                
                                <div className="mt-8 w-full border-t border-stone-200/50 pt-8">
                                    <button 
                                        onClick={() => { logout(); router.push('/login'); }}
                                        className="w-full px-6 py-3 rounded-full border border-stone-300 text-sm font-medium hover:border-berry hover:text-berry hover:bg-stone-50 transition-all"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Detailed Stats/Info */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Account Details */}
                            <div className="bg-white rounded-3xl p-8 border border-stone-100 shadow-sm">
                                <h3 className="text-xs font-semibold tracking-widest uppercase text-stone-400 mb-8">Account Details</h3>
                                
                                <div className="space-y-6">
                                    <div className="flex justify-between items-center py-2 border-b border-stone-50">
                                        <span className="text-sm font-light text-stone-500">User ID</span>
                                        <span className="text-sm font-mono text-stone-800">{profile?.id}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-stone-50">
                                        <span className="text-sm font-light text-stone-500">Email Address</span>
                                        <span className="text-sm font-normal text-stone-800">{profile?.email}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-stone-50">
                                        <span className="text-sm font-light text-stone-500">Language Level</span>
                                        <span className="text-sm font-normal text-stone-800">Advanced Learner</span>
                                    </div>
                                </div>
                            </div>

                            {/* Learning Progress - Redesigned to be lighter and minimalist */}
                            <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-stone-100 shadow-sm relative overflow-hidden group">
                                {/* Subtle Background Shape */}
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-beige/30 rounded-full blur-3xl group-hover:bg-berry/5 transition-colors duration-700" />
                                
                                <h3 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-stone-400 mb-8 relative z-10">Learning Journey</h3>
                                
                                <div className="relative z-10">
                                    <div className="mb-8">
                                        <div className="flex justify-between items-end mb-3">
                                            <div>
                                                <p className="text-xs font-medium text-berry mb-1">Current Focus</p>
                                                <p className="text-2xl font-light tracking-tight text-stone-800">
                                                    IELTS Masterclass
                                                </p>
                                            </div>
                                            <span className="text-sm font-light text-stone-400 pb-1">45% Complete</span>
                                        </div>
                                        <div className="h-[2px] w-full bg-stone-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-stone-800 w-[45%] transition-all duration-1000 ease-out" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-5 bg-white/40 rounded-2xl border border-stone-50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
                                            <p className="text-[10px] font-medium text-stone-400 uppercase tracking-widest mb-1">Total Learning</p>
                                            <p className="text-xl font-light text-stone-800">12.5h</p>
                                        </div>
                                        <div className="p-5 bg-white/40 rounded-2xl border border-stone-50 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] transition-transform hover:-translate-y-1">
                                            <p className="text-[10px] font-medium text-stone-400 uppercase tracking-widest mb-1">Achievement</p>
                                            <p className="text-xl font-light text-stone-800">8 Badges</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer Minimal (Same as Home) */}
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
