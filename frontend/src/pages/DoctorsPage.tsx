import React from 'react';
import {
    Container,
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Rating
} from '@mui/material';
import { People, MedicalServices, Work } from '@mui/icons-material';

interface Doctor {
    id: number;
    name: string;
    specialty: string;
    experience: number;
    rating: number;
    description: string;
    image?: string;
}

export const DoctorsPage: React.FC = () => {
    const doctors: Doctor[] = [
        {
            id: 1,
            name: 'Доктор Иванов',
            specialty: 'Терапевт',
            experience: 12,
            rating: 4.9,
            description: 'Специалист по общему лечению животных. Опыт работы с различными породами собак и кошек.'
        },
        {
            id: 2,
            name: 'Доктор Сидорова',
            specialty: 'Хирург',
            experience: 8,
            rating: 4.8,
            description: 'Проводит сложные операции любой сложности. Специализация - ортопедическая хирургия.'
        },
        {
            id: 3,
            name: 'Доктор Петров',
            specialty: 'Дерматолог',
            experience: 10,
            rating: 4.7,
            description: 'Эксперт по кожным заболеваниям животных. Диагностика и лечение аллергий.'
        },
        {
            id: 4,
            name: 'Доктор Козлова',
            specialty: 'Кардиолог',
            experience: 15,
            rating: 5.0,
            description: 'Специалист по сердечно-сосудистым заболеваниям. Эхокардиография и ЭКГ.'
        }
    ];

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                {/* Заголовок */}
                <Box textAlign="center" mb={4}>
                    <People sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" component="h1" gutterBottom>
                        Наши врачи
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Профессиональная команда ветеринаров с многолетним опытом
                    </Typography>
                </Box>

                {/* Список врачей */}
                <Grid container spacing={4}>
                    {doctors.map((doctor) => (
                        <Grid size={{ xs: 12, md: 6 }} key={doctor.id}>
                            <Card sx={{ height: '100%', p: 3 }}>
                                <CardContent>
                                    <Box display="flex" alignItems="start" gap={3}>
                                        {/* Placeholder для фото */}
                                        <Box
                                            sx={{
                                                width: 100,
                                                height: 100,
                                                borderRadius: '50%',
                                                backgroundColor: 'primary.main',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: 'white',
                                                fontSize: '2rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {doctor.name.split(' ').map(n => n[0]).join('')}
                                        </Box>

                                        <Box flex={1}>
                                            <Typography variant="h6" gutterBottom>
                                                {doctor.name}
                                            </Typography>

                                            <Chip
                                                label={doctor.specialty}
                                                color="primary"
                                                size="small"
                                                sx={{ mb: 1 }}
                                            />

                                            <Box display="flex" alignItems="center" gap={1} mb={1}>
                                                <Work sx={{ fontSize: 16, color: 'text.secondary' }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    Опыт: {doctor.experience} лет
                                                </Typography>
                                            </Box>

                                            <Box display="flex" alignItems="center" gap={1} mb={2}>
                                                <Rating
                                                    value={doctor.rating}
                                                    readOnly
                                                    size="small"
                                                />
                                                <Typography variant="body2">
                                                    ({doctor.rating})
                                                </Typography>
                                            </Box>

                                            <Typography variant="body2" color="text.secondary">
                                                {doctor.description}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};