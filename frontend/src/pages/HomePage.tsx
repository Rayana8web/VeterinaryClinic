// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Card, CardContent, IconButton } from '@mui/material';
import { MedicalServices, People, ContactPhone, Category, ArrowForward } from '@mui/icons-material';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const cards = [
        {
            title: 'Услуги и цены',
            description:
                'Диагностика, лечение, вакцинация и профилактика заболеваний для ваших питомцев.',
            icon: <MedicalServices sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />,
            path: '/prices'
        },
        {
            title: 'Наши врачи',
            description: 'Опытные специалисты, которые любят животных и своё дело.',
            icon: <People sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />,
            path: '/doctors'
        },
        {
            title: 'Контакты',
            description: 'Найдите нас по адресу или свяжитесь по телефону/почте для записи.',
            icon: <ContactPhone sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />,
            path: '/contacts'
        },
        {
            title: 'Категории животных',
            description: 'Выберите категорию вашего питомца, чтобы узнать доступные услуги и врачей.',
            icon: <Category sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />,
            path: '/categories'
        }
    ];

    return (
        <Box sx={{ py: 8, px: { xs: 2, sm: 4, md: 6 } }}>
            {/* Hero section */}
            <Box textAlign="center" mb={8}>
                <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                    Добро пожаловать в ветеринарную клинику!
                </Typography>
                <Typography
                    variant="h5"
                    component="p"
                    color="text.secondary"
                    mb={4}
                    sx={{ maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}
                >
                    Мы заботимся о ваших питомцах. Узнайте больше об услугах, наших врачах, категориях животных и как с нами связаться.
                </Typography>
            </Box>

            {/* Cards section */}
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 4,
                    justifyContent: 'center',
                }}
            >
                {cards.map((card) => (
                    <Card
                        key={card.title}
                        sx={{
                            width: 300,
                            textAlign: 'center',
                            p: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6,
                                backgroundColor: 'action.hover'
                            }
                        }}
                        onClick={() => navigate(card.path)}
                    >
                        {card.icon}
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                {card.title}
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                {card.description}
                            </Typography>
                            <IconButton
                                color="primary"
                                sx={{ mt: 1 }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(card.path);
                                }}
                            >
                                <ArrowForward />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Отступ снизу */}
            <Box sx={{ py: 4 }} />
        </Box>
    );
};

export default HomePage;
