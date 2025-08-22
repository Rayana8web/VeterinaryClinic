import { Container, Box, Typography } from '@mui/material';
import { CreateRecordForm } from '../components/records/CreateRecordForm';

export const CreateRecordPage: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom align="center">
                    Запись на прием
                </Typography>
                <CreateRecordForm />
            </Box>
        </Container>
    );
};