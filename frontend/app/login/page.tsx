'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '@/services/auth.service';
import { useAuthStore } from '@/store/useAuthStore';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const setToken = useAuthStore((state) => state.setToken);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await AuthService.login(email, password);
            // specific to the backend response { access_token: ... }
            if (data.access_token) {
                setToken(data.access_token);
                router.push('/'); // Redirect to dashboard/home
            } else {
                setError('Login failed: No access token received');
            }
        } catch (err: any) {
            console.error('Login error:', err);
            // Safely access error message
            const msg = err.response?.data?.message || 'Invalid email or password';
            setError(Array.isArray(msg) ? msg[0] : msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4">
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/20">

                {/* Header */}
                <div className="px-8 pt-10 pb-6 text-center">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="mt-2 text-indigo-100 text-sm">Sign in to continue your learning journey</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 pb-10 space-y-6">

                    {error && (
                        <div className="bg-red-500/20 border border-red-500/50 text-white text-sm rounded-lg p-3 text-center animate-pulse">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-indigo-100 text-sm font-medium mb-1 pl-1" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-indigo-100 text-sm font-medium mb-1 pl-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-white/10 border border-indigo-300/30 rounded-xl text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-indigo-100 hover:text-white cursor-pointer transition-colors">
                            <input type="checkbox" className="mr-2 rounded border-white/30 bg-white/10 checked:bg-indigo-500 focus:ring-0" />
                            Remember me
                        </label>
                        <a href="#" className="text-indigo-200 hover:text-white transition-colors">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-white text-indigo-600 font-bold rounded-xl shadow-lg hover:bg-indigo-50 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-indigo-200">
                            Don't have an account?{' '}
                            <a href="#" className="text-white font-medium hover:underline">
                                Register now
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
