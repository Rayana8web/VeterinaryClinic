import { apiClient } from './apiClient';

export interface Record {
    id: number;
    date: string;
    time: string;
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
    // Создать запись
    createRecord: async (recordData: CreateRecordData): Promise<Record> => {
        const response = await apiClient.post('/api/record/', recordData);
        return response.data;
    },

    // Получить все записи пользователя
    getMyRecords: async (): Promise<Record[]> => {
        const response = await apiClient.get('/api/records/');
        return response.data;
    },

    // Отменить запись
    cancelRecord: async (recordId: number): Promise<void> => {
        await apiClient.delete(`/api/records/${recordId}/`);
    }
};