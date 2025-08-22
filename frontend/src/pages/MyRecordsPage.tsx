import { Container, Box, Typography } from '@mui/material';
import { RecordsList } from '../components/records/RecordsList';

export const MyRecordsPage: React.FC = () => {
    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Мои записи
                </Typography>
                <RecordsList />
            </Box>
        </Container>
    );
};