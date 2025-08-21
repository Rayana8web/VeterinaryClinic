import { createTheme } from '@mui/material/styles';

// Цвета из Figma-макета ветеринарной клиники
export const theme = createTheme({
    palette: {
        primary: {
            main: '#2E86C1',    // Синий (основные кнопки, акценты)
            light: '#5DADE2',
            dark: '#1A5276',
        },
        secondary: {
            main: '#F39C12',    // Оранжевый (второстепенные кнопки, акценты)
            light: '#F8C471',
            dark: '#D35400',
        },
        background: {
            default: '#F8F9FA', // Светло-серый фон
            paper: '#FFFFFF',   // Белый фон для карточек
        },
        text: {
            primary: '#2C3E50',   // Темно-синий текст
            secondary: '#566573', // Серо-синий текст
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 600,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 600,
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 500,
        },
    },
    shape: {
        borderRadius: 8, // Закругление углов для кнопок, карточек
    },
});