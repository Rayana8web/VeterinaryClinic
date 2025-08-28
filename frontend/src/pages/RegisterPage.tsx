// src/pages/RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";
import { authAPI } from "../api/authApi.ts";
import type { RegisterData } from "../api/authApi.ts";

const RegisterPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<RegisterData>({
        username: "",
        email: "",
        password: "",
        password_confirm: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (form.password !== form.password_confirm) {
            setError("Пароли не совпадают");
            return;
        }

        setLoading(true);
        try {
            const response = await authAPI.register(form);
            localStorage.setItem("authToken", response.access);
            localStorage.setItem("userData", JSON.stringify(response.user));
            navigate("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else if (typeof err === "object" && err !== null && "response" in err) {
                // @ts-ignore
                setError(err.response?.data?.detail || "Ошибка регистрации");
            } else {
                setError("Ошибка регистрации");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    mt: 8,
                    p: 4,
                    borderRadius: 3,
                    boxShadow: 3,
                    backgroundColor: "background.paper",
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                    Регистрация
                </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Имя пользователя"
                        name="username"
                        fullWidth
                        margin="normal"
                        value={form.username}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Email"
                        name="email"
                        type="email"
                        fullWidth
                        margin="normal"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Пароль"
                        name="password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Подтвердите пароль"
                        name="password_confirm"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={form.password_confirm}
                        onChange={handleChange}
                        required
                    />

                    {error && (
                        <Typography color="error" sx={{ mt: 1 }}>
                            {error}
                        </Typography>
                    )}

                    <Box sx={{ mt: 3, position: "relative" }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                        >
                            Зарегистрироваться
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    marginTop: "-12px",
                                    marginLeft: "-12px",
                                }}
                            />
                        )}
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default RegisterPage;
