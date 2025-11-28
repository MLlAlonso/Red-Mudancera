"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";
import Button_cta from "@/components/common/Button_cta";

export default function Login() {
    const router = useRouter();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/empresa/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || "Credenciales incorrectas.");
                setLoading(false);
                return;
            }

            // Guardar token
            localStorage.setItem("token", data.token);

            // Redirigir al dashboard
            router.push("/dashboard");

        } catch (error) {
            setErrorMsg("Error de conexión con el servidor.");
        }

        setLoading(false);
    };

    return (
        <>
            <Header />

            <main
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px 20px",
                    background: "#F4F7F6",
                    minHeight: "80vh",
                }}
            >
                <form
                    onSubmit={handleSubmit}
                    style={{
                        background: "#FFFFFF",
                        padding: "30px",
                        borderRadius: "12px",
                        width: "100%",
                        maxWidth: "600px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    }}
                >
                    <h2 style={{ marginBottom: "20px", color: "#09233E" }}>
                        Iniciar Sesión
                    </h2>

                    <Input
                        label="Correo"
                        name="email"
                        type="email"
                        placeholder="correo@empresa.com"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Contraseña"
                        name="password"
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={form.password}
                        onChange={handleChange}
                    />

                    {errorMsg && (
                        <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>
                    )}

                    <Button_cta
                        type="submit"
                        value={loading ? "Entrando..." : "Entrar"}
                    />

                    <p
                        onClick={() => router.push("/register")}
                        style={{
                            marginTop: "15px",
                            textAlign: "center",
                            color: "#09233E",
                            cursor: "pointer",
                        }}
                    >
                        ¿No tienes cuenta? <strong>Regístrate aquí</strong>
                    </p>
                </form>
            </main>

            <Footer />
        </>
    );
}
