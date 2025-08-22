import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { theme } from './styles/theme';
import './styles/global.css';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { CreateRecordPage } from './pages/CreateRecordPage';
import { MyRecordsPage } from './pages/MyRecordsPage';
import { PricesPage } from './pages/PricesPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { ContactsPage } from './pages/ContactsPage';

function App() {
    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Layout>
                        <Box sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            py: 6
                        }}>
                            <Box sx={{
                                width: '100%',
                                maxWidth: '1200px',
                                px: { xs: 2, sm: 3, md: 4 }
                            }}>
                                <Routes>
                                    <Route path="/" element={<HomePage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />
                                    <Route path="/create-record" element={<CreateRecordPage />} />
                                    <Route path="/my-records" element={<MyRecordsPage />} />
                                    <Route path="/prices" element={<PricesPage />} />
                                    <Route path="/doctors" element={<DoctorsPage />} />
                                    <Route path="/contacts" element={<ContactsPage />} />
                                </Routes>
                            </Box>
                        </Box>
                    </Layout>
                </Router>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;