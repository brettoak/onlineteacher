'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';

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
        <main className="min-h-screen bg-stone-50 pt-32 pb-12 px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-stone-800 mb-8">My Profile</h1>
                
                <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 bg-stone-200 rounded-full flex items-center justify-center text-3xl font-bold text-stone-500">
                            {profile?.email?.[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-stone-800">
                                {profile?.name || 'User'}
                            </h2>
                            <p className="text-stone-500">{profile?.email}</p>
                            <span className="inline-block mt-2 px-3 py-1 bg-stone-100 text-xs font-medium uppercase tracking-wider text-stone-600 rounded-full">
                                {profile?.role}
                            </span>
                        </div>
                    </div>

                    <div className="border-t border-stone-100 pt-8">
                        <h3 className="text-lg font-semibold text-stone-800 mb-4">Account Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-stone-500 mb-1">User ID</label>
                                <p className="text-stone-800 font-mono text-sm">{profile?.id}</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-stone-500 mb-1">Email</label>
                                <p className="text-stone-800">{profile?.email}</p>
                            </div>
                            {/* Add more fields as needed */}
                        </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                         <button 
                            onClick={() => { logout(); router.push('/login'); }}
                            className="px-6 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
