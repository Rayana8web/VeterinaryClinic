import {
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    Button
} from '@mui/material';
import { MedicalServices, People, ContactPhone } from '@mui/icons-material';

export const HomePage: React.FC = () => {
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
            </Box>

            {/* Cards section */}
            <Grid container spacing={4}>
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
                        <MedicalServices sx={{
                            fontSize: 60,
                            color: 'primary.main',
                            mb: 3
                        }} />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h5" gutterBottom fontWeight={600}>
                                Услуги
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Диагностика, лечение, вакцинация и профилактика заболеваний для ваших питомцев.
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