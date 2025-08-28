// src/pages/CreateRecordPage.tsx
import React, { useState } from 'react';
import type { CreateRecordData } from '../api/recordsAPI';
import { recordsAPI } from '../api/recordsAPI';

import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    CircularProgress,
} from '@mui/material';

const CreateRecordPage: React.FC = () => {
    const [formData, setFormData] = useState<CreateRecordData>({
        date: '',
        time: '',
        service: '',
        animal_type: '',
        doctor: '',
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess('');
        setError('');

        recordsAPI
            .createRecord(formData)
            .then(() => setSuccess('Запись успешно создана!'))
            .catch(() => setError('Ошибка создания записи'))
            .finally(() => setLoading(false));
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Создать запись
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 2 }}
            >
                <TextField
                    label="Дата"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Время"
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    label="Услуга"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Тип животного"
                    name="animal_type"
                    value={formData.animal_type}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Врач"
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleChange}
                    required
                />

                {loading ? (
                    <CircularProgress />
                ) : (
                    <Button type="submit" variant="contained">
                        Создать запись
                    </Button>
                )}

                {success && <Typography color="success.main">{success}</Typography>}
                {error && <Typography color="error">{error}</Typography>}
            </Box>
        </Container>
    );
};

export default CreateRecordPage;
