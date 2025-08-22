import { Box } from '@mui/material';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
    return (
        <Box sx={{ py: 8 }}>
            <LoginForm />
        </Box>
    );
};