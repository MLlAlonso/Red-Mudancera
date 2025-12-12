"use client";

import { useState } from "react";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Button_cta from "@/components/common/Button_cta";
import Link from "next/link";

import "@/styles/pages/usuario/_usuarioLogin.scss";

export default function UsuarioLogin() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            return setError("Completa todos los campos.");
        }

        setError("");
        setLoading(true);

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/usuario/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            const data = await res.json();
            setLoading(false);

            if (!res.ok) {
                setError(data.message || "Credenciales incorrectas");
                return;
            }

            document.cookie = `token_usuario=${data.token}; path=/;`;

            window.location.href = "/usuario/dashboard";
        } catch (err) {
            console.error(err);
            setError("No se pudo conectar al servidor.");
            setLoading(false);
        }
    };

    return (
        <>
            <Header className="header--no-menu" />

            <main className="usuario-login">
                <div className="usuario-login__form">
                    <h1 className="usuario-login__title">Iniciar sesión</h1>

                    {error && <p className="usuario-login__error">{error}</p>}

                    <div className="usuario-login__input-wrapper">
                        <Image
                            src="/icons/mensaje.png"
                            alt="email icon"
                            width={24}
                            height={24}
                        />

                        <input
                            type="email"
                            placeholder="Correo"
                            className="usuario-login__input"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>

                    <div className="usuario-login__input-wrapper">
                        <Image
                            src="/icons/candado.png"
                            alt="password icon"
                            width={24}
                            height={24}
                        />

                        <input
                            type={showPass ? "text" : "password"}
                            placeholder="Contraseña"
                            className="usuario-login__input"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />

                        <span
                            className="usuario-login__showpass"
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? "👁️" : "👁️‍🗨️"}
                        </span>
                    </div>

                    <Button_cta
                        value={loading ? "Iniciando..." : "Iniciar sesión"}
                        onClick={handleSubmit}
                    />

                    <p className="usuario-login__forgot">Olvidé mi contraseña</p>
                </div>
            </main>

            <Footer />
        </>
    );
}