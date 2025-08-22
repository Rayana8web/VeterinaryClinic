import React from 'react';
import {
    Container,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from '@mui/material';
import { MedicalServices } from '@mui/icons-material';

interface Service {
    id: number;
    name: string;
    price: number;
    category: string;
}

export const PricesPage: React.FC = () => {
    // Mock данные прайс-листа
    const services: Service[] = [
        { id: 1, name: 'Прием терапевта', price: 900, category: 'Консультации' },
        { id: 2, name: 'Повторный прием терапевта', price: 550, category: 'Консультации' },
        { id: 3, name: 'Прием герпетолога (специалист по рептилиям)', price: 1500, category: 'Консультации' },
        { id: 4, name: 'Первичный прием дерматолога', price: 1500, category: 'Консультации' },
        { id: 5, name: 'Повторный прием дерматолога', price: 900, category: 'Консультации' },
        { id: 6, name: 'Первичный прием кардиолога', price: 1500, category: 'Консультации' },
        { id: 7, name: 'Повторный прием кардиолога', price: 900, category: 'Консультации' },
        { id: 8, name: 'Первичный прием ортопеда', price: 1500, category: 'Консультации' },
        { id: 9, name: 'Первичный прием онколога', price: 1500, category: 'Консультации' },
        { id: 10, name: 'Вакцинация', price: 1200, category: 'Процедуры' },
        { id: 11, name: 'Чипирование', price: 2000, category: 'Процедуры' },
        { id: 12, name: 'Стерилизация кошки', price: 5000, category: 'Операции' },
        { id: 13, name: 'Кастрация кота', price: 4000, category: 'Операции' },
    ];

    // Группируем услуги по категориям
    const groupedServices = services.reduce((acc, service) => {
        if (!acc[service.category]) {
            acc[service.category] = [];
        }
        acc[service.category].push(service);
        return acc;
    }, {} as Record<string, Service[]>);

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                {/* Заголовок */}
                <Box textAlign="center" mb={4}>
                    <MedicalServices sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />

                    <Typography variant="h3" component="h1" gutterBottom>
                        Услуги и цены
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Актуальные цены на услуги нашей ветеринарной клиники
                    </Typography>
                </Box>

                {/* Таблица цен */}
                {Object.entries(groupedServices).map(([category, categoryServices]) => (
                    <Box key={category} mb={4}>
                        <Typography variant="h5" component="h2" gutterBottom sx={{
                            color: 'primary.main',
                            borderBottom: '2px solid',
                            borderColor: 'primary.main',
                            pb: 1,
                            mb: 2
                        }}>
                            {category}
                        </Typography>

                        <TableContainer component={Paper} elevation={3}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                                            Услуга
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ fontWeight: 'bold', fontSize: '1.1rem', width: '200px' }}
                                        >
                                            Цена, руб.
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {categoryServices.map((service) => (
                                        <TableRow key={service.id}>
                                            <TableCell>
                                                <Typography variant="body1">
                                                    {service.name}
                                                </Typography>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Chip
                                                    label={`${service.price} руб.`}
                                                    color="primary"
                                                    variant="outlined"
                                                    sx={{
                                                        fontSize: '1rem',
                                                        fontWeight: 'bold',
                                                        minWidth: '100px'
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                ))}

                {/* Примечание */}
                <Box sx={{
                    backgroundColor: 'grey.100',
                    p: 3,
                    borderRadius: 2,
                    mt: 4
                }}>
                    <Typography variant="body2" color="text.secondary">
                        💡 Цены указаны справочно. Точную стоимость услуги уточняйте у администратора.
                        Возможны противопоказания, необходима консультация специалиста.
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};