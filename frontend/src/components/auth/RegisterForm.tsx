import React, { useState } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Alert,
    CircularProgress,
    Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export const RegisterForm: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { register } = useAuth();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.passwordConfirm) {
            setError('Пароли не совпадают');
            return;
        }

        setIsLoading(true);

        try {
            await register(formData.username, formData.email, formData.password, formData.passwordConfirm);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка регистрации');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', p: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Регистрация
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth
                label="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
            />

            <TextField
                fullWidth
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
            />

            <TextField
                fullWidth
                label="Пароль"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
            />

            <TextField
                fullWidth
                label="Подтверждение пароля"
                type="password"
                name="passwordConfirm"
                value={formData.passwordConfirm}
                onChange={handleChange}
                margin="normal"
                required
                disabled={isLoading}
            />

            <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 3 }}
            >
                {isLoading ? <CircularProgress size={24} /> : 'Зарегистрироваться'}
            </Button>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                    Уже есть аккаунт?{' '}
                    <Link component={RouterLink} to="/login">
                        Войти
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};