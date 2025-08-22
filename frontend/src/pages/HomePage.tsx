import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button,
    IconButton // Добавим иконку стрелки
} from '@mui/material';
import { MedicalServices, People, ContactPhone, ArrowForward } from '@mui/icons-material';

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* Hero section */}
            <Box textAlign="center" mb={8}>
                <Typography
                    variant="h2"
                    component="h1"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                >
                    Добро пожаловать в ветеринарную клинику!
                </Typography>
                <Typography
                    variant="h5"
                    component="p"
                    color="text.secondary"
                    mb={4}
                    sx={{
                        maxWidth: 800,
                        mx: 'auto',
                        lineHeight: 1.6
                    }}
                >
                    Мы заботимся о ваших питомцах. Узнайте больше об услугах, наших врачах и как с нами связаться.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        sx={{
                            fontSize: '1.1rem',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2
                        }}
                    >
                        Записаться на приём
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={() => navigate('/prices')}
                        sx={{
                            fontSize: '1.1rem',
                            px: 4,
                            py: 1.5,
                            borderRadius: 2
                        }}
                    >
                        Посмотреть цены
                    </Button>
                </Box>
            </Box>

            {/* Cards section */}
            <Grid container spacing={4}>
                {/* КАРТОЧКА УСЛУГ - ТЕПЕРЬ КЛИКАБЕЛЬНАЯ */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                        sx={{
                            textAlign: 'center',
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            cursor: 'pointer', // Меняем курсор
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6,
                                backgroundColor: 'action.hover' // Легкий эффект при наведении
                            }
                        }}
                        onClick={() => navigate('/prices')} // Навигация при клике
                    >
                        <MedicalServices sx={{
                            fontSize: 60,
                            color: 'primary.main',
                            mb: 3
                        }} />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                Услуги и цены
                            </Typography>
                            <Typography variant="body1" color="text.secondary" paragraph>
                                Диагностика, лечение, вакцинация и профилактика заболеваний для ваших питомцев.
                            </Typography>
                            {/* Добавляем иконку стрелки */}
                            <IconButton
                                color="primary"
                                sx={{ mt: 1 }}
                                onClick={(e) => {
                                    e.stopPropagation(); // Чтобы не срабатывал клик по карточке
                                    navigate('/prices');
                                }}
                            >
                                <ArrowForward />
                            </IconButton>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Остальные карточки без изменений */}
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                        sx={{
                            textAlign: 'center',
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}
                    >
                        <People sx={{
                            fontSize: 60,
                            color: 'primary.main',
                            mb: 3
                        }} />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                Наши врачи
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Опытные специалисты, которые любят животных и своё дело.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                    <Card
                        sx={{
                            textAlign: 'center',
                            p: 3,
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 6
                            }
                        }}
                    >
                        <ContactPhone sx={{
                            fontSize: 60,
                            color: 'primary.main',
                            mb: 3
                        }} />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                Контакты
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Найдите нас по адресу или свяжитесь по телефону/почте для записи.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Отступ снизу */}
            <Box sx={{ py: 4 }} />
        </>
    );
};