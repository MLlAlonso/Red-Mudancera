"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Input from "@/components/common/Input";

export default function Register() {
    const router = useRouter();

    const [form, setForm] = useState({
        empresa: "",
        representante: "",
        rfc: "",
        tel: "",
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

    // 🔐 Validación de contraseña segura
    const isValidPassword = (pwd) => {
        const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return regex.test(pwd);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        // ⚠ Validaciones frontend
        if (!isValidPassword(form.password)) {
            setErrorMsg(
                "La contraseña debe tener mínimo 8 caracteres, 1 mayúscula y 1 número."
            );
            return;
        }

        try {
            setLoading(true);

            // 🌐 Petición al backend
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/empresa/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });


            const data = await res.json();

            if (!res.ok) {
                setErrorMsg(data.message || "Error al registrar la empresa.");
                setLoading(false);
                return;
            }

            // Guardar token
            localStorage.setItem("token", data.token);

            // Redirigir
            router.push("/login");
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
                    padding: "40px 20px",
                    background: "#F4F7F6",
                    minHeight: "100vh",
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
                        Registro de Empresa
                    </h2>

                    <Input
                        label="Nombre"
                        name="empresa"
                        placeholder="Nombre de la empresa"
                        value={form.empresa}
                        onChange={handleChange}
                    />

                    <Input
                        label="Correo"
                        name="email"
                        type="email"
                        placeholder="Correo de la empresa"
                        value={form.email}
                        onChange={handleChange}
                    />

                    <Input
                        label="Contraseña"
                        name="password"
                        type="password"
                        placeholder="La contraseña debe incluiral menos 8 caracteres, 1 mayúscula y 1 número"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <Input
                        label="Representante"
                        name="representante"
                        placeholder="Persona de contacto"
                        value={form.representante}
                        onChange={handleChange}
                    />

                    <Input
                        label="Teléfono"
                        name="tel"
                        placeholder="Telefono del representante"
                        value={form.tel}
                        onChange={handleChange}
                    />

                    {errorMsg && (
                        <p style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</p>
                    )}

                    <button type="submit" className="btn_cta" disabled={loading}>
                        {loading ? "Registrando..." : "Registrarse"}
                    </button>

                    <p
                        onClick={() => router.push("/login")}
                        style={{
                            marginTop: "15px",
                            textAlign: "center",
                            color: "#09233E",
                            cursor: "pointer",
                        }}
                    >
                        ¿Ya tienes cuenta? <strong>Inicia sesión</strong>
                    </p>
                </form>
            </main>

            <Footer />
        </>
    );
}