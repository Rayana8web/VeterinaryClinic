// src/pages/PricesPage.tsx
import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, CardContent, CircularProgress, Box } from '@mui/material';
import { apiClient } from '../api/apiClient';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    category_name: string;
}

const PricesPage: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiClient.get('/api/services/')
            .then((response) => setServices(response.data))
            .catch((error) => console.error('Ошибка загрузки услуг:', error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', marginTop: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                💰 Цены на услуги
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 3,
                    justifyContent: 'center'
                }}
            >
                {services.map((service) => (
                    <Card
                        key={service.id}
                        sx={{
                            width: 300,
                            borderRadius: 3,
                            boxShadow: 3,
                            p: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}
                    >
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {service.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                {service.description}
                            </Typography>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {service.price} ₽
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Категория: {service.category_name}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default PricesPage;
