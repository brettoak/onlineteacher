import api from '../lib/axios';

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
        // Assuming there's a profile endpoint, otherwise we rely on what we have
        // return api.get('/auth/profile');
        return null;
    }
};

export default AuthService;
