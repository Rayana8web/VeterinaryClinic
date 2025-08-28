// src/api/recordsAPI.ts
import { apiClient } from './apiClient';

export interface Record {
    id: number;
    date: string;        // YYYY-MM-DD
    time: string;        // HH:MM
    service: string;
    animal_type: string;
    doctor: string;
    status: string;
}

export interface CreateRecordData {
    date: string;
    time: string;
    service: string;
    animal_type: string;
    doctor: string;
}

export const recordsAPI = {
    // Создать новую запись
    createRecord: async (recordData: CreateRecordData): Promise<Record> => {
        const response = await apiClient.post('/api/record/', recordData);
        return response.data;
    },

    // Получить все записи текущего пользователя
    getMyRecords: async (): Promise<Record[]> => {
        const response = await apiClient.get('/api/my-records/');
        return response.data;
    },

    // Отменить запись по ID
    cancelRecord: async (recordId: number): Promise<void> => {
        await apiClient.delete(`/api/record/${recordId}/`);
    }
};
