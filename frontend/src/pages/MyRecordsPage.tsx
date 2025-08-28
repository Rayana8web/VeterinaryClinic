// src/pages/MyRecordsPage.tsx
import React, { useEffect, useState } from 'react';
import type { Record } from '../api/recordsAPI';
import { recordsAPI } from '../api/recordsAPI';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CircularProgress,
    Button,
    Box,
} from '@mui/material';

const MyRecordsPage: React.FC = () => {
    const [records, setRecords] = useState<Record[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        recordsAPI.getMyRecords()
            .then((data) => setRecords(data))
            .catch((err) => console.error('Ошибка загрузки записей:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 10 }}>
                <CircularProgress />
            </Container>
        );
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Мои записи
            </Typography>

            {records.length === 0 ? (
                <Typography variant="body1">У вас пока нет записей</Typography>
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 3,
                        justifyContent: 'center',
                    }}
                >
                    {records.map((record) => (
                        <Card
                            key={record.id}
                            sx={{
                                width: 300,
                                borderRadius: 3,
                                boxShadow: 3,
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6">{record.service}</Typography>
                                <Typography variant="body2">
                                    Дата: {record.date} <br />
                                    Время: {record.time} <br />
                                    Врач: {record.doctor} <br />
                                    Животное: {record.animal_type} <br />
                                    Статус: {record.status}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    onClick={() => recordsAPI.cancelRecord(record.id)}
                                >
                                    Отменить запись
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default MyRecordsPage;
