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
        <div className="min-h-screen flex items-center justify-center bg-beige p-6">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-berry/10">

                {/* Header with decorative background */}
                <div className="px-8 pt-12 pb-8 text-center bg-gradient-to-br from-berry to-[#8e3752]">
                    <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
                    <p className="mt-2 text-white/80 text-sm">Sign in with GlobalEnglish Series</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="px-8 py-10 space-y-6">

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg p-3 text-center">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-stone-600 text-sm font-medium mb-1 pl-1" htmlFor="email">Email Address</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-berry/50 focus:border-transparent transition-all duration-200"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label className="block text-stone-600 text-sm font-medium mb-1 pl-1" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-berry/50 focus:border-transparent transition-all duration-200"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center text-stone-600 hover:text-stone-900 cursor-pointer transition-colors">
                            <input type="checkbox" className="mr-2 rounded border-stone-300 text-berry focus:ring-berry" />
                            Remember me
                        </label>
                        <a href="#" className="text-berry hover:underline transition-colors">Forgot Password?</a>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-berry text-white font-bold rounded-xl shadow-lg hover:bg-[#8e3752] hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </span>
                        ) : 'Sign In'}
                    </button>

                    <div className="text-center mt-6">
                        <p className="text-sm text-stone-500">
                            Don't have an account?{' '}
                            <a href="#" className="text-berry font-bold hover:underline">
                                Register now
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
