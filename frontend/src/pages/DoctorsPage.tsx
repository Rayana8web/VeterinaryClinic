// src/pages/DoctorsPage.tsx
import React, { useEffect, useState } from "react";
import { apiClient } from "../api/apiClient";
import { Container, Card, CardContent, Typography, CircularProgress } from "@mui/material";

interface Doctor {
    id: number;
    name: string;
    specialization: string;
    experience: number;
    photo?: string;
}

const DoctorsPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        apiClient
            .get("/api/doctors/")
            .then((response) => setDoctors(response.data))
            .catch((err) => {
                console.error("Ошибка загрузки докторов:", err);
                setError("Не удалось загрузить список докторов");
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <Container style={{ textAlign: "center", marginTop: 40 }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container style={{ textAlign: "center", marginTop: 40 }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container style={{ marginTop: 32 }}>
            <Typography variant="h4" gutterBottom>
                Наши врачи
            </Typography>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                {doctors.map((doctor) => (
                    <Card key={doctor.id} style={{ flex: "1 0 300px", borderRadius: 12, boxShadow: "0 3px 10px rgba(0,0,0,0.1)" }}>
                        {doctor.photo && (
                            <img
                                src={doctor.photo}
                                alt={doctor.name}
                                style={{ width: "100%", height: 200, objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
                            />
                        )}
                        <CardContent>
                            <Typography variant="h6">{doctor.name}</Typography>
                            <Typography color="text.secondary">
                                Специализация: {doctor.specialization}
                            </Typography>
                            <Typography color="text.secondary">
                                Опыт: {doctor.experience} лет
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Container>
    );
};

export default DoctorsPage;
