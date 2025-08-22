import { apiClient } from './apiClient';

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
}

export interface AuthResponse {
    access: string;
    refresh: string;
    user: {
        id: number;
        email: string;
        username: string;
    };
}

export const authAPI = {
    // Вход пользователя
    login: async (loginData: LoginData): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/login/', loginData);
        return response.data;
    },

    // Регистрация пользователя
    register: async (registerData: RegisterData): Promise<AuthResponse> => {
        const response = await apiClient.post('/api/auth/register/', registerData);
        return response.data;
    },

    // Обновление токена
    refreshToken: async (refreshToken: string): Promise<{ access: string }> => {
        const response = await apiClient.post('/auth/token/refresh/', {
            refresh: refreshToken
        });
        return response.data;
    },

    // Выход пользователя
    logout: async (): Promise<void> => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
            await apiClient.post('/auth/logout/', { refresh: refreshToken });
        }
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userData');
    }
};