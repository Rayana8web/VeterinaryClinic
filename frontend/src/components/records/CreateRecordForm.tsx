import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    MenuItem
} from '@mui/material';

interface CreateRecordData {
    date: string;
    time: string;
    service: string;
    animal_type: string;
    doctor: string;
}

export const CreateRecordForm: React.FC = () => {
    const [formData, setFormData] = useState<CreateRecordData>({
        date: '',
        time: '',
        service: '',
        animal_type: '',
        doctor: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        setIsLoading(true);

        // Имитация запроса к API
        setTimeout(() => {
            try {
                console.log('Отправка данных на бэкенд:', formData);
                setSuccess(true);
                setFormData({ date: '', time: '', service: '', animal_type: '', doctor: '' });
            } catch {
                // Ошибка ловится без переменной
                setError('Ошибка создания записи. Бэкенд еще не готов.');
            } finally {
                setIsLoading(false);
            }
        }, 1000);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 500, mx: 'auto', p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom align="center">
                Запись на прием
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Запись успешно создана! (в консоли)
                </Alert>
            )}

            <TextField
                fullWidth
                label="Дата"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                fullWidth
                label="Время"
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
                InputLabelProps={{ shrink: true }}
            />

            <TextField
                fullWidth
                label="Услуга"
                name="service"
                value={formData.service}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
            />

            <TextField
                fullWidth
                select
                label="Тип животного"
                name="animal_type"
                value={formData.animal_type}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
            >
                <MenuItem value="cat">Кошка</MenuItem>
                <MenuItem value="dog">Собака</MenuItem>
                <MenuItem value="bird">Птица</MenuItem>
                <MenuItem value="other">Другое</MenuItem>
            </TextField>

            <TextField
                fullWidth
                select
                label="Врач"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
            >
                <MenuItem value="dr_ivanov">Доктор Иванов</MenuItem>
                <MenuItem value="dr_petrov">Доктор Петров</MenuItem>
                <MenuItem value="dr_sidorova">Доктор Сидорова</MenuItem>
            </TextField>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 3 }}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Записаться'}
            </Button>

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                ⚠️ Бэкенд еще не готов. Данные выводятся в консоль.
            </Typography>
        </Box>
    );
};
