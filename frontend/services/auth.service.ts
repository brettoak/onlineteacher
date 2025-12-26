import api from '@/lib/axios';

const AuthService = {
    login: async (email: string, password: string) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    register: async (data: any) => {
        const response = await api.post('/auth/register', data);
        return response.data;
    },

    // Helper to fetch current user profile if needed
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    }
};

export default AuthService;
