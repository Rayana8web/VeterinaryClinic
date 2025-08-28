// src/pages/CategoriesPage.tsx
import React, { useEffect, useState } from 'react';
import { apiClient } from '../api/apiClient';
import {
    Container,
    Typography,
    Card,
    CardContent,
    CardMedia,
    TextField,
    Pagination,
    Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
}

const PAGE_SIZE = 6;

const CategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await apiClient.get('/api/index/');
                setCategories(response.data.categories || []);
                setFilteredCategories(response.data.categories || []);
            } catch (error) {
                console.error('Ошибка загрузки категорий:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const filtered = categories.filter((cat) =>
            cat.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredCategories(filtered);
        setPage(1);
    }, [search, categories]);

    const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const paginatedCategories = filteredCategories.slice(
        (page - 1) * PAGE_SIZE,
        page * PAGE_SIZE
    );

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center', mt: 10 }}>
                <Typography variant="h6">Загрузка категорий...</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom textAlign="center">
                Категории животных
            </Typography>

            <Box sx={{ maxWidth: 400, mx: 'auto', mb: 4 }}>
                <TextField
                    fullWidth
                    label="Поиск по категориям"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Box>

            {/* Flex-контейнер вместо Grid */}
            <Box display="flex" flexWrap="wrap" gap={3} justifyContent="center">
                {paginatedCategories.map((category) => (
                    <Card
                        key={category.id}
                        sx={{
                            width: 300,
                            cursor: 'pointer',
                            '&:hover': { boxShadow: 6 }
                        }}
                        onClick={() => navigate(`/category/${category.id}`)}
                    >
                        <CardMedia
                            component="img"
                            height="180"
                            image={category.image}
                            alt={category.name}
                        />
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                {category.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {category.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {filteredCategories.length > PAGE_SIZE && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <Pagination
                        count={Math.ceil(filteredCategories.length / PAGE_SIZE)}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </Box>
            )}
        </Container>
    );
};

export default CategoriesPage;
