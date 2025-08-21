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

const Header: React.FC = () => {
    return (
        <AppBar position="static" elevation={4}>
            <Toolbar>
                {/* Иконка и название */}
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                    <PetsIcon sx={{ mr: 2 }} />
                    <Typography variant="h6" component="div">
                        Ветеринарная клиника
                    </Typography>
                </Box>

                {/* Навигация */}
                <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
                    <Button color="inherit">Главная</Button>
                    <Button color="inherit">Услуги</Button>
                    <Button color="inherit">Врачи</Button>
                    <Button color="inherit">Контакты</Button>
                </Box>

                {/* Кнопка входа */}
                <Button
                    color="inherit"
                    variant="outlined"
                    sx={{ ml: 2, borderColor: 'white', color: 'white' }}
                >
                    Войти
                </Button>

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