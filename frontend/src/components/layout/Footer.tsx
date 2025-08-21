import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: 3,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" align="center">
                    © 2024 Ветеринарная клиника. Все права защищены.
                </Typography>
                <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    <Link href="#" color="inherit" sx={{ mx: 1 }}>
                        Контакты
                    </Link>
                    |
                    <Link href="#" color="inherit" sx={{ mx: 1 }}>
                        Политика конфиденциальности
                    </Link>
                    |
                    <Link href="#" color="inherit" sx={{ mx: 1 }}>
                        Условия использования
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;