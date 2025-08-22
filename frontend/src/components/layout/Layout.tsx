import React from 'react';
import { Box } from '@mui/material';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            width: '100%',
            maxWidth: '100vw'
        }}>
            <Header />
            <Box component="main" sx={{
                flexGrow: 1,
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;