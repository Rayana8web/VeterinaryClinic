import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    Grid
} from '@mui/material';
import { Pets, MedicalServices, Person } from '@mui/icons-material';

interface Record {
    id: number;
    date: string;
    time: string;
    service: string;
    animal_type: string;
    doctor: string;
    status: string;
}

export const RecordsList: React.FC = () => {
    // Mock данные - потом заменим на реальные с API
    const mockRecords: Record[] = [
        {
            id: 1,
            date: '2024-08-25',
            time: '10:00',
            service: 'Вакцинация',
            animal_type: 'dog',
            doctor: 'Доктор Иванов',
            status: 'confirmed'
        },
        {
            id: 2,
            date: '2024-08-26',
            time: '15:30',
            service: 'Осмотр',
            animal_type: 'cat',
            doctor: 'Доктор Сидорova',
            status: 'pending'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed': return 'success';
            case 'pending': return 'warning';
            case 'cancelled': return 'error';
            default: return 'default';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'confirmed': return 'Подтверждена';
            case 'pending': return 'Ожидание';
            case 'cancelled': return 'Отменена';
            default: return status;
        }
    };

    const getAnimalIcon = (animalType: string) => {
        switch (animalType) {
            case 'dog': return '🐕';
            case 'cat': return '🐈';
            case 'bird': return '🐦';
            default: return '🐾';
        }
    };

    return (
        <Box>
            <Typography variant="h5" component="h2" gutterBottom>
                Мои записи
            </Typography>

            {mockRecords.length === 0 ? (
                <Box textAlign="center" py={4}>
                    <Typography variant="h6" color="text.secondary">
                        У вас пока нет записей
                    </Typography>
                    <Button
                        variant="contained"
                        sx={{ mt: 2 }}
                        onClick={() => console.log('Навигация к созданию записи')}
                    >
                        Создать первую запись
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {mockRecords.map((record) => (
                        // ИСПРАВЛЕННАЯ СТРОКА - используем size вместо item
                        <Grid size={{ xs: 12, md: 6 }} key={record.id}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent>
                                    <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
                                        <Typography variant="h6">
                                            {getAnimalIcon(record.animal_type)} {record.service}
                                        </Typography>
                                        <Chip
                                            label={getStatusText(record.status)}
                                            color={getStatusColor(record.status) as any}
                                            size="small"
                                        />
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={1}>
                                        <MedicalServices sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {record.service}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Pets sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {record.animal_type === 'dog' ? 'Собака' :
                                                record.animal_type === 'cat' ? 'Кошка' :
                                                    record.animal_type}
                                        </Typography>
                                    </Box>

                                    <Box display="flex" alignItems="center" mb={1}>
                                        <Person sx={{ mr: 1, color: 'text.secondary' }} />
                                        <Typography variant="body2">
                                            {record.doctor}
                                        </Typography>
                                    </Box>

                                    <Typography variant="body2" color="primary" fontWeight="bold">
                                        📅 {record.date} в {record.time}
                                    </Typography>

                                    <Box display="flex" gap={1} mt={2}>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => console.log('Отмена записи:', record.id)}
                                        >
                                            Отменить
                                        </Button>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => console.log('Перенос записи:', record.id)}
                                        >
                                            Перенести
                                        </Button>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                ⚠️ Данные из mock-источника. Бэкенд еще не готов.
            </Typography>
        </Box>
    );
};