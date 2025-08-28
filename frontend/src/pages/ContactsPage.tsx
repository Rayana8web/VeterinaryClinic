// src/pages/ContactsPage.tsx
import React from 'react';
import { Container, Box, Typography, Card, CardContent, Button } from '@mui/material';
import { ContactPhone, LocationOn, Schedule, Email } from '@mui/icons-material';

const ContactsPage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                {/* Заголовок */}
                <Box textAlign="center" mb={4}>
                    <ContactPhone sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                    <Typography variant="h3" component="h1" gutterBottom>
                        Контакты
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Свяжитесь с нами удобным для вас способом
                    </Typography>
                </Box>

                {/* Flex-контейнер для двух карточек */}
                <Box display="flex" flexWrap="wrap" gap={4}>
                    {/* Контактная информация */}
                    <Card sx={{ flex: '1 1 300px', p: 3 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Наши контакты
                            </Typography>

                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <ContactPhone color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">Телефон</Typography>
                                    <Typography variant="body1">+7 (999) 123-45-67</Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <Email color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">Email</Typography>
                                    <Typography variant="body1">info@vetclinic.ru</Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2} mb={3}>
                                <LocationOn color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">Адрес</Typography>
                                    <Typography variant="body1">г. Москва, ул. Ветеринарная, д. 15</Typography>
                                </Box>
                            </Box>

                            <Box display="flex" alignItems="center" gap={2}>
                                <Schedule color="primary" />
                                <Box>
                                    <Typography variant="body1" fontWeight="bold">Часы работы</Typography>
                                    <Typography variant="body1">
                                        Пн-Пт: 9:00 - 21:00<br />
                                        Сб-Вс: 10:00 - 18:00
                                    </Typography>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>

                    {/* Карта и дополнительные контакты */}
                    <Card sx={{ flex: '1 1 300px', p: 3 }}>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Как добраться
                            </Typography>

                            <Box
                                sx={{
                                    height: 200,
                                    backgroundColor: 'grey.100',
                                    borderRadius: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mb: 3
                                }}
                            >
                                <Typography color="text.secondary">🗺️ Здесь будет карта</Typography>
                            </Box>

                            <Typography variant="body2" color="text.secondary" paragraph>
                                Мы находимся в центре города, рядом с метро.
                                Доступна парковка для посетителей.
                            </Typography>

                            <Button variant="contained" fullWidth sx={{ mb: 2 }}>📞 Позвонить</Button>
                            <Button variant="outlined" fullWidth>📧 Написать в WhatsApp</Button>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
};

export default ContactsPage;
