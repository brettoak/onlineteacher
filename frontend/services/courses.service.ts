import api from '@/lib/axios';

const CoursesService = {
    getAll: async () => {
        const response = await api.get('/courses');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    }
};

export default CoursesService;
