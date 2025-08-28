import { apiClient } from './apiClient';

export interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    services: Service[];
}

export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
}

export const categoriesAPI = {
    // Получить все категории - ЭТОГО ЭНДПОИНТА НЕТ!
    // getCategories: async (): Promise<Category[]> => {
    //     const response = await apiClient.get('/api/categories/');
    //     return response.data;
    // },

    // Получить конкретную категорию
    getCategory: async (id: number): Promise<Category> => {
        const response = await apiClient.get(`/api/category/${id}/`);
        return response.data;
    }
};
