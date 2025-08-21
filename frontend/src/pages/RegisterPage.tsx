import { Box } from '@mui/material';
import { RegisterForm } from '../components/auth/RegisterForm';

export const RegisterPage: React.FC = () => {
    return (
        <Box sx={{ py: 8 }}>
            <RegisterForm />
        </Box>
    );
};