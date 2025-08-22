import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    IconButton
} from '@mui/material';
import { Menu as MenuIcon, Pets as PetsIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <AppBar position="static" elevation={4}>
            <Toolbar>
                {/* Логотип и название */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <PetsIcon sx={{ mr: 2 }} />
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'inherit',
                            fontWeight: 600
                        }}
                    >
                        Ветеринарная клиника
                    </Typography>
                </Box>

                {/* Навигация */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Button
                        color="inherit"
                        component={RouterLink}
                        to="/"
                    >
                        Главная
                    </Button>

                    {user ? (
                        <>
                            <Button color="inherit">Профиль</Button>
                            <Button
                                color="inherit"
                                onClick={logout}
                                sx={{ ml: 2 }}
                            >
                                Выйти
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                color="inherit"
                                component={RouterLink}
                                to="/login"
                            >
                                Войти
                            </Button>
                            <Button
                                color="inherit"
                                variant="outlined"
                                component={RouterLink}
                                to="/register"
                                sx={{ ml: 2, borderColor: 'white', color: 'white' }}
                            >
                                Регистрация
                            </Button>
                        </>
                    )}
                </Box>

                {/* Кнопка меню для мобильных */}
                <IconButton
                    color="inherit"
                    aria-label="open menu"
                    sx={{ display: { xs: 'flex', md: 'none' }, ml: 1 }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Header;